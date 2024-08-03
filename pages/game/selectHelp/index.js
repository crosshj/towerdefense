import { animateOrb } from '/visuals/objects/orb.js';
import { getLocationMap } from '../../../utils/locations.js';

const attachNextButton = async ({ location, params }) => {
	const stage = params?.number;
	const nextButton = document.querySelector('button.next-button');

	const featherCost = 1; //TODO: get this
	console.log({ location, stage });

	nextButton.innerHTML = `
		<div class="featherIcon"></div>
		<span class="featherAmount">X${featherCost}</span>
		<span>START</span>
	`;
	nextButton.addEventListener('mousedown', async () => {
		window.parent.postMessage({
			_: 'action',
			minusFeathers: featherCost
		});
		await animateOrb(
			window.innerWidth / 2 + 60,
			10,
			window.innerWidth / 2,
			window.innerHeight - 50
		);

		const newParams = {
			...params
			//TODO: friend
		};
		const queryString = new URLSearchParams(newParams).toString();
		const src = `/pages/game/standard.html?${queryString}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const locationMap = await getLocationMap();
	const location = locationMap[params.zone];
	if (params?.number) {
		location.title = 'STAGE ' + params.number;
	}
	await attachNextButton({ location, params });

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: location.title,
		visibility: 'visible',
		back: `/pages/game/selectTeam/index.html?${new URLSearchParams(
			params
		).toString()}`
	});

	window.parent.postMessage({ _: 'loaded' });
});
