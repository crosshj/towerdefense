import { getLocationMap } from '../../../utils/locations.js';
import { getTeam } from '../../_utils/getTeam.js';
import { getEffects } from '../../../user/effects.js';

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

const updateEffects = async () => {
	const effects = await getEffects();
	for (const [k, v] of Object.entries(effects)) {
		const { selected, count } = v;

		const checkBox = document.querySelector(
			`.effects .${k} input[type=checkbox]`
		);
		checkBox.checked = selected;

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

	const selector = document.querySelector('.team-selector custom-select');
	selector.addEventListener('change', updateTeamIcons);
	await updateTeamIcons();

	const locationMap = await getLocationMap();
	const location = locationMap[params.zone];

	await updateEffects();

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: location?.title || 'TD: Select Team',
		visibility: 'visible',
		back: '/pages/mainStage/index.html'
	});

	const levelNameEl = document.querySelector('.level-name');
	levelNameEl.innerHTML = location?.name || '';

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
		const src = `/pages/game/selectHelp/index.html?${queryString}`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	window.parent.postMessage({ _: 'loaded' });
});
