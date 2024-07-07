import { getLocationMap } from '../../../utils/locations.js';

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const locationMap = await getLocationMap();
	const location = locationMap[params.zone];
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

	const nextButton = document.querySelector('button.next-button');
	nextButton.addEventListener('mousedown', () => {
		const newParams = {
			...params
			//TODO: friend
		};
		const queryString = new URLSearchParams(newParams).toString();
		const src = `/pages/game/standard.html?${queryString}`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	window.parent.postMessage({ _: 'loaded' });
});
