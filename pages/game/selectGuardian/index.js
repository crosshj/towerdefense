import { animateOrb } from '/visuals/objects/orb.js';
import { getLocationMap } from '../../../utils/locations.js';
import { getStageInfo } from '../../../stages/index.js';

const attachNextButton = async ({ location, params }) => {
	//const stage = await getStageInfo(params);
	const nextButton = document.querySelector('button.next-button');

	const featherCost = 1;

	nextButton.innerHTML = `
		<div class="featherIcon"></div>
		<span class="featherAmount">X${featherCost}</span>
		<span>START</span>
	`;
	nextButton.addEventListener('pointerup', async () => {
		if (nextButton.classList.contains('clicked')) return;
		nextButton.classList.add('clicked');
		window.parent.postMessage({
			_: 'action',
			minusFeathers: featherCost,
		});
		await animateOrb(
			window.innerWidth / 2 + 60,
			10,
			window.innerWidth / 2,
			window.innerHeight - 50
		);

		const newParams = {
			...params,
			//TODO: friend
		};
		const queryString = new URLSearchParams(newParams).toString();
		const src = `/pages/game/standard.html?${queryString}`;
		window.parent.postMessage({ _: 'navigate', src });

		//TODO: not sure if this is entirely necessary, was seeing issues with stats flashin, though
		window.parent.postMessage({
			_: 'stats',
			visibility: 'hidden',
		});
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
	await attachNextButton({
		location,
		params,
	});

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});
	const queryString = new URLSearchParams(params).toString();
	window.parent.postMessage({
		_: 'title',
		title: 'FRIEND BATTLE',
		visibility: 'visible',
		back: `/pages/game/selectTeam/index.html?${queryString}`,
	});

	window.parent.postMessage({ _: 'loaded' });
});
