import { getLocationMap, getZoneFromNumber } from '../../../utils/locations.js';
import { getTeam } from '/utils/getTeam.js';
import { getEffects, updateEffectsSelect } from '../../../user/effects.js';
import { SVGIcons } from '../../../assets/icons.svg.js';
import { getPotentialStageRewards } from '../../../stages/index.js';
import { getCollection } from '../../../user/getCollection.js';

const updateTeamIcons = async () => {
	const teamIcons = Array.from(
		document.querySelectorAll('.bottom-row > div')
	);
	const currentTeamName = document.querySelector(
		'.team-selector custom-select'
	)?.value;
	const flipBTeam = false;
	const currentTeam = await getTeam(currentTeamName, flipBTeam);
	const teamAll = [...currentTeam.a, ...currentTeam.b];
	for (const [index, element] of Object.entries(teamIcons)) {
		const { image, stars, level } = teamAll?.[index] || {};
		element.classList.remove('empty');
		element.classList.remove('filled');

		if (!image) {
			element.classList.add('empty');
			continue;
		}
		element.classList.add('filled');
		element.innerHTML = `
			<div class="stars">${'★'.repeat(stars)}</div>
			<div class="level">Lv.${level}</div>
		`;
		element.insertAdjacentElement('beforeend', image);
	}
};

const effectsIcons = {
	meteor: SVGIcons.meteor(),
	ice: SVGIcons.iceStorm(),
	tornado: SVGIcons.tornado(),
	invincible: SVGIcons.invincibility(),
};

const attachEffects = async () => {
	const effects = await getEffects();
	for (const [k, v] of Object.entries(effects)) {
		const { selected, count } = v;
		const el = document.querySelector(`.effects .${k}`);

		const checkBox = el.querySelector(`input[type=checkbox]`);
		checkBox.checked = selected;

		const icon = el.querySelector(`.icon`);
		icon.innerHTML = effectsIcons[k];

		const costEl = el.querySelector(`.cost`);
		costEl.innerHTML = count > 0 ? 'Free' : 'cost?';

		const countBadgeEl = el.querySelector(`.countBadge`);
		countBadgeEl.innerHTML = count;

		el.addEventListener('pointerdown', () => {
			const newValue = !checkBox.checked;
			checkBox.checked = newValue;
			console.log({ newValue });
			updateEffectsSelect({ [k]: newValue });
		});
	}
};

const getEffectsValues = () => {
	return {
		fxMeteor: document.querySelector(
			`.effects .meteor input[type=checkbox]`
		).checked,
		fxIce: document.querySelector(`.effects .ice input[type=checkbox]`)
			.checked,
		fxTornado: document.querySelector(
			`.effects .tornado input[type=checkbox]`
		).checked,
		fxInvincible: document.querySelector(
			`.effects .invincible input[type=checkbox]`
		).checked,
	};
};

const levelAndRewards = async ({ params, location, collection }) => {
	const rewards = await getPotentialStageRewards({ ...params, location });
	const rewardUnits = [];
	for (const [code, value] of Object.entries(rewards.bonus)) {
		if (value.type !== 'char') continue;
		const character = collection.find((x) => x.code === code);
		rewardUnits.push({ ...value, code, character });
	}
	const isDoubleRow = rewardUnits.length > 3;
	return `
		<div class="level-name">${location?.name || ''}</div>
		<div class="flex-spacer"></div>
		<div class="rewards">
			<div class="label">Possible Rewards</div>
			<div class="reward-container${isDoubleRow ? ' doubleRow' : ''}">
				${rewardUnits
					.map(
						(x) => `
					<div data-code="${x.code}">
						<img src="${x.character.image}" />
					</div>	
				`
					)
					.join('\n')}
			</div>
			<div class="reward-more">▸</div>
		</div>
	`;
};

const attachOptions = (options) => {
	const auto = document.querySelector('.options .auto');
	if (options.auto) {
		auto.classList.add('selected');
	}
	auto.addEventListener('pointerup', () => {
		auto.classList.toggle('selected');
		options.auto = !options.auto;
	});
	const speedDouble = document.querySelector('.options .speedDouble');
	if (options.speedDouble) {
		speedDouble.classList.add('selected');
	}
	speedDouble.addEventListener('pointerup', () => {
		speedDouble.classList.toggle('selected');
		options.speedDouble = !options.speedDouble;
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	if (!params.zone && typeof params.number !== 'undefined') {
		params.zone = getZoneFromNumber(params.number);
	}

	const collection = await getCollection();

	const options = {};
	attachOptions(options);

	const selector = document.querySelector('.team-selector custom-select');
	selector.addEventListener('change', updateTeamIcons);
	await updateTeamIcons();

	const locationMap = await getLocationMap();
	const location = locationMap[params.zone];

	if (params?.number) {
		location.title = 'STAGE ' + params.number;
	}

	await attachEffects();

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});

	const titleConfig = {
		_: 'title',
		title: location?.title || 'Select Team',
		visibility: 'visible',
		back: '/pages/mainStage/index.html',
	};
	if (params?.zone === 'friendBattle') {
		titleConfig.title = 'FRIEND BATTLE';
		titleConfig.back = '/pages/game/friendBattle/index.html';
	}
	window.parent.postMessage(titleConfig);

	const subHeader = document.querySelector('.sub-header');
	if (params?.zone === 'friendBattle') {
		subHeader.innerHTML = `
			<div class="level-message">
				Select the team and items you wish to use for the battle.
			</div>
		`;
	} else {
		subHeader.innerHTML = await levelAndRewards({
			params,
			location,
			collection,
		});
	}

	const nextButton = document.querySelector('button.next-button');
	nextButton.addEventListener('mousedown', () => {
		const team = selector.value.replaceAll('Team ', '');
		const effects = getEffectsValues();
		const newParams = {
			...params,
			...options,
			team,
			...effects,
		};
		const queryString = new URLSearchParams(newParams).toString();
		let nextPage = '/pages/game/selectHelp/index.html';
		if (params.zone === 'friendBattle') {
			nextPage = '/pages/game/selectGuardian/index.html';
		}
		const src = `${nextPage}?${queryString}`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	window.parent.postMessage({ _: 'loaded' });
});
