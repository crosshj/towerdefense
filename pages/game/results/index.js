import { getStageRewards } from '../../../stages/index.js';
import { addCharactersEXP, addNewCharacter } from '../../../user/characters.js';
import { updateEffectsCount } from '../../../user/effects.js';
import { addStats } from '../../../user/stats.js';
import { addUserExperience } from '../../../user/user.js';
import { getTeamFromNumber } from '/utils/getTeam.js';
import { getTeam } from '/utils/getTeam.js';

const updateRewards = async (rewards) => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	const { bonus, exp, coins } = rewards;

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

	// update team EXP
	const team = await getTeamFromNumber(params.team);
	await addCharactersEXP([...team.a, ...team.b], exp.unit);

	// update player EXP
	await addUserExperience(rewards.exp.player);

	const userCoinDom = document.querySelector('.userCoin');
	const bonusDom = document.querySelector('.bonus');

	userCoinDom.innerHTML = `<p>
		COIN: ${coins}, EXP: ${exp.player}/${exp.unit}</p>
	`;

	/* prettier-ignore */
	bonusDom.innerHTML = `
		<p>BONUS type: ${bonus.type}</p>
		<p>BONUS name: ${bonus.key}</p>
		${bonus.amount
			? `<p>BONUS amount: ${bonus.amount}</p>`
			: ``
		}
	`;
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
		const didLevelUp = 'TODO: determine if level up';
		if (didLevelUp) {
			levelUpEl.classList.remove('hidden');
		}
		element.insertAdjacentElement('beforeend', image);
	}
};

function animateProgressBar(fromPercent, toPercent, duration) {
	const svgObject = document.getElementById('backgroundSVG');
	const svgDoc = svgObject.contentDocument;
	const progressBar = svgDoc.getElementById('progressBar');
	const progressText = svgDoc.getElementById('progressText');
	if (!progressBar) return;

	const startWidth = Math.max(30, (fromPercent * 287.828) / 100);
	const endWidth = Math.max(30, (toPercent * 287.828) / 100);

	const startTime = performance.now();

	function animate(time) {
		const elapsedTime = time - startTime;
		const progress = Math.min(elapsedTime / duration, 1);
		const currentWidth = startWidth + (endWidth - startWidth) * progress;
		progressBar.setAttribute('width', currentWidth);
		progressText.textContent =
			Math.round(toPercent * progress + fromPercent * (1 - progress)) +
			'%';
		if (progress < 1) {
			setTimeout(() => requestAnimationFrame(animate), 15);
		}
	}
	requestAnimationFrame(animate);
}

const attachBackground = () => {
	const svgObject = document.getElementById('backgroundSVG');

	const svgDoc = svgObject.contentDocument;
	// const progressBar = svgDoc.getElementById('progressBar');
	const progressText = svgDoc.getElementById('progressText');

	animateProgressBar(30, 60, 400);
	if (progressText) {
		progressText.textContent = '50%'; // Example text update
	}
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	attachBackground();
	await updateTeamIcons({ team: params.team });

	const rewards = await getStageRewards(params);
	await updateRewards(rewards);

	window.parent.postMessage({
		_: 'stats',
		visibility: 'hidden',
	});
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden',
	});

	document.body.addEventListener('mousedown', () => {
		let src = '/pages/mainStage/index.html';
		if (params.zone === 'friendBattle') {
			src = '/pages/pvp/';
		}
		window.parent.postMessage({
			_: 'navigate',
			src,
		});
	});

	window.parent.postMessage({ _: 'loaded' });
});
