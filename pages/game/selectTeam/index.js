import { getLocationMap } from '../../../utils/locations.js';
import { getTeam } from '../../_utils/getTeam.js';
import { getEffects } from '../../../user/effects.js';
import { SVGIcons } from '../../../assets/icons.svg.js';

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
	invincible: SVGIcons.invincibility()
};

const updateEffects = async () => {
	const effects = await getEffects();
	for (const [k, v] of Object.entries(effects)) {
		const { selected, count } = v;

		const checkBox = document.querySelector(
			`.effects .${k} input[type=checkbox]`
		);
		checkBox.checked = selected;

		const icon = document.querySelector(`.effects .${k} .icon`);
		icon.innerHTML = effectsIcons[k];

		const costEl = document.querySelector(`.effects .${k} .cost`);
		costEl.innerHTML = count > 0 ? 'Free' : 'cost?';

		const countBadgeEl = document.querySelector(
			`.effects .${k} .countBadge`
		);
		countBadgeEl.innerHTML = count;
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
		).checked
	};
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	//TODO: handle params when navigating back from next screen (or store game state & use)

	const selector = document.querySelector('.team-selector custom-select');
	selector.addEventListener('change', updateTeamIcons);
	await updateTeamIcons();

	const locationMap = await getLocationMap();
	const location = locationMap[params.zone];

	if (params?.number) {
		location.title = 'STAGE ' + params.number;
	}

	await updateEffects();

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	});

	const titleConfig = {
		_: 'title',
		title: location?.title || 'Select Team',
		visibility: 'visible',
		back: '/pages/mainStage/index.html'
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
		subHeader.innerHTML = `
			<div class="level-name">${location?.name || ''}</div>
			<div class="rewards">
				<div class="label">Possible Rewards</div>
				<div class="reward-icon"></div>
				<div class="reward-more">▸</div>
			</div>
		`;
	}

	const nextButton = document.querySelector('button.next-button');
	nextButton.addEventListener('mousedown', () => {
		const team = selector.value.replaceAll('Team ', '');
		const effects = getEffectsValues();
		const newParams = {
			...params,
			team,
			...effects
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
