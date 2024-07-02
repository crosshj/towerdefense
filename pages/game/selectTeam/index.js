import { getLocationMap } from '../../../utils/locations.js';

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
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
		back: '/pages/mainStage/index.html'
	});

	const levelNameEl = document.querySelector('.level-name');
	levelNameEl.innerHTML = location.name;

	const nextButton = document.querySelector('button.next-button');
	nextButton.addEventListener('mousedown', () => {
		const src = `/pages/game/selectHelp/index.html?zone=${params.zone}`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	window.parent.postMessage({ _: 'loaded' });
});
