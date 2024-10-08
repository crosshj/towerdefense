import { getStageRewards } from '../../../stages/index.js';
import { addCharactersEXP, addNewCharacter } from '../../../user/characters.js';
import { updateEffectsCount } from '../../../user/effects.js';
import { MaterialsStore } from '../../../user/material.js';
import { addStats } from '../../../user/stats.js';
import { addUserExperience, forceUpdate, getUser } from '../../../user/user.js';
import { waitForElementById } from '../../../utils/htmlToElement.js';
import { clearBonusSVG } from './clearBonus.svg.js';
import { getTeamFromNumber } from '/utils/getTeam.js';
import { getTeam } from '/utils/getTeam.js';

const RewardsPopoverContent = ({ rewards }) => {
	let rewardKeyDiv = `<div>${rewards.bonus.key}</div>`;
	if (rewards.bonus.type === 'coin') {
		rewardKeyDiv = ``;
	}
	if (rewards.bonus.type === 'material') {
		// reward.bonus.image
		return `
			<div class="title">
				${clearBonusSVG()}
			</div>
			<div class="indicator">
				<div>~%:: imagine spin animation ::%~</div>
				<div style="height: 10px"></div>
				<img src="${rewards.bonus.image}" />
				<div>${rewards.bonus.name}</div>
			</div>
		`;
	}
	return `
		<div class="title">
			${clearBonusSVG()}
		</div>
		<div class="indicator">
			<div>~%:: imagine spin animation ::%~</div>
			<div style="height: 10px"></div>
			<div>${rewards.bonus.type}</div>
			${rewardKeyDiv}
			<div>amount: ${rewards.bonus.amount || '1'}</div>
		</div>
	`;
};

const updateRewards = async ({ svgDoc, rewards }) => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	const { bonus, exp, coins } = rewards;

	const coinAmount = await waitForElementById(svgDoc, 'coinAmount');
	coinAmount.textContent = `+${coins}`;

	// update coins
	const totalCoins =
		bonus.type === 'coin' && bonus.amount
			? coins + bonus.amount //
			: coins;
	await addStats({
		coins: totalCoins,
		exp: exp.player,
	});

	// update characters
	if (bonus.type === 'char') {
		await addNewCharacter({
			code: bonus.key,
		});
	}

	// update effects
	if (bonus.type === 'effect') {
		await updateEffectsCount({
			[bonus.key]: 1,
		});
	}

	// update effects
	if (bonus.type === 'material') {
		MaterialsStore.lsAdd(bonus.key);
	}

	// update team EXP
	const team = await getTeamFromNumber(params.team);
	await addCharactersEXP([...team.a, ...team.b], exp.unit);

	// update player EXP
	await addUserExperience(rewards.exp.player);

	//finalize by pushing to DB
	await forceUpdate();
};

const updateTeamIcons = async ({ teamName }) => {
	const teamIcons = Array.from(document.querySelectorAll('.team > div'));
	const currentTeamName = teamName;
	const flipBTeam = false;
	const currentTeam = await getTeam(currentTeamName, flipBTeam);
	const teamAll = [...currentTeam.a, ...currentTeam.b].reverse();
	for (const [i, element] of Object.entries(teamIcons)) {
		const index = teamIcons.length - Number(i) - 1;
		const { image, stars, level } = teamAll?.[index] || {};
		element.classList.remove('empty');
		element.classList.remove('filled');

		if (!image) {
			element.classList.add('empty');
			continue;
		}
		element.innerHTML = `
			<div class="levelUp hidden">LEVEL UP!</div>
		`;
		const levelUpEl = element.querySelector('.levelUp');
		const didLevelUp = false;
		if (didLevelUp) {
			levelUpEl.classList.remove('hidden');
		}
		element.insertAdjacentElement('beforeend', image);
	}
	console.log(
		'TODO: determine if each unit did level up + animate experience recieved (if needed)'
	);
};

async function animateProgressBar(
	svgDoc,
	fromPercent,
	toPercent,
	duration = 1000
) {
	const progressBar = await waitForElementById(svgDoc, 'progressBar');
	const progressText = await waitForElementById(svgDoc, 'progressText');
	if (!progressBar) return;

	const startWidth = Math.max(30, (fromPercent * 287.828) / 100);
	if (!toPercent) {
		progressBar.setAttribute('width', startWidth);
		progressText.textContent = `${fromPercent}%`;
		return;
	}
	const endWidth = Math.max(30, (toPercent * 287.828) / 100);

	const startTime = performance.now();

	return new Promise((resolve) => {
		function animate(time) {
			const elapsedTime = time - startTime;
			const progress = Math.min(elapsedTime / duration, 1);
			const currentWidth =
				startWidth + (endWidth - startWidth) * progress;
			progressBar.setAttribute('width', currentWidth);
			progressText.textContent =
				Math.round(
					toPercent * progress + fromPercent * (1 - progress)
				) + '%';
			if (progress < 1) {
				setTimeout(() => requestAnimationFrame(animate), 15);
			} else {
				resolve();
			}
		}
		requestAnimationFrame(animate);
	});
}

const updateUserLevelInfo = async ({ svgDoc, user }) => {
	const userIcon = await waitForElementById(svgDoc, 'userIcon');
	userIcon.setAttribute('xlink:href', user.image);

	const userLevelAmount = await waitForElementById(svgDoc, 'userLevelAmount');
	userLevelAmount.textContent = user.levelInfo.level;

	if (user.grade === 'normal') {
		const userGrade = await waitForElementById(svgDoc, 'userGrade');
		const userGradeText = userGrade.querySelector('text');
		userGradeText.textContent = '';
		const userGradePath = userGrade.querySelector('path');
		userGradePath.style.fill = 'yellow';
	}
};

const showUserLevelUp = async ({ user }) => {
	const levelUpEl = document.querySelector('.userLevelUp');
	levelUpEl.classList.remove('hidden');
	return new Promise((resolve) => {
		levelUpEl.querySelector('button').addEventListener('pointerup', () => {
			levelUpEl.classList.add('hidden');
			resolve();
		});
	});
};

const showClearBonus = async (rewards) => {
	const contentEl = document.querySelector(
		'.rewardsPopover .rewardsPopoverMessage .rewardsPopoverContent'
	);
	contentEl.innerHTML = RewardsPopoverContent({ rewards });
	const el = document.querySelector('.rewardsPopover ');
	el.classList.remove('hidden');
	return new Promise((resolve) => {
		el.querySelector('.retryButton').addEventListener(
			'pointerdown',
			(e) => {
				e.stopPropagation();
				e.preventDefault();
				el.classList.add('hidden');
				resolve('retry');
			}
		);
		el.querySelector('.okayButton').addEventListener('pointerdown', (e) => {
			e.stopPropagation();
			e.preventDefault();
			el.classList.add('hidden');
			resolve('okay');
		});
		el.querySelector('.nextButton').addEventListener('pointerdown', (e) => {
			e.stopPropagation();
			e.preventDefault();
			el.classList.add('hidden');
			resolve('next');
		});
	});
};

const goBack = ({ params }) => {
	const stage = params?.stage || 'main';
	let src = `/pages/stage/${stage}/index.html`;
	if (params.zone === 'friendBattle') {
		src = '/pages/pvp/';
	}
	if (stage === 'special') {
		src = '/pages/specialStage/index.html';
	}
	window.parent.postMessage({
		_: 'navigate',
		src,
	});
};

const url = '/pages/game/selectTeam/index.html?number=';
const goNext = ({ params }) => {
	if (params.number + '' === '100') {
		return goBack({ params });
	}
	let number = Number(params.number) + 1;
	if (params.zone === 'friendBattle') {
		src = '/pages/pvp/';
	}
	window.parent.postMessage({
		_: 'navigate',
		src: url + number,
	});
};
const goRetry = ({ params }) => {
	let number = Number(params.number);
	if (params.zone === 'friendBattle') {
		src = '/pages/pvp/';
	}
	window.parent.postMessage({
		_: 'navigate',
		src: url + number,
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const user = await getUser();
	const svgDoc = () => {
		const objectEl = document.getElementById('backgroundSVG');
		return objectEl?.contentDocument;
	};

	await updateUserLevelInfo({ svgDoc, user });
	const expStartPercent = Math.floor(Number(user.levelInfo.levelExpPercent));
	await animateProgressBar(svgDoc, expStartPercent);

	const rewards = await getStageRewards(params);
	await updateRewards({ svgDoc, rewards });
	const expEndPercent =
		(100 * (rewards.exp.player + user.levelInfo.remainderExp)) /
		user.levelInfo.expNeededForNextLevel;

	await updateTeamIcons({ team: params.team, rewards });

	window.parent.postMessage({
		_: 'stats',
		visibility: 'hidden',
	});
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden',
	});
	window.parent.postMessage({ _: 'loaded' });

	await animateProgressBar(
		svgDoc,
		Math.max(0, expStartPercent),
		Math.min(expEndPercent, 100)
	);
	const didLevelUp = expEndPercent >= 100;
	if (didLevelUp) {
		await showUserLevelUp({ user });
	}

	const nextStep = await showClearBonus(rewards);

	if (nextStep === 'retry') {
		goRetry({ params });
		return;
	}
	if (nextStep === 'next') {
		goNext({ params });
		return;
	}

	document.querySelector('.tapToContinue').classList.remove('hidden');

	requestAnimationFrame(() => {
		document.body.addEventListener('pointerdown', () => {
			goBack({ params });
		});
	});
});
