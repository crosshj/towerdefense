import { getCurrentCharCache } from '../../utils/cache.js';

const pageTitle = 'GEAR';

const attachListSelector = async ({ params }) => {
	const el = document.querySelector('.listSelector');
	let selectedTab = 'weapon';
	if (params?.armor) {
		selectedTab = 'armor';
	}
	if (params?.accessory) {
		selectedTab = 'accessory';
	}
	el.innerHTML = `${selectedTab}`;
	return {};
};

const attachUnitInfo = async ({ unit }) => {
	const el = document.querySelector('.unitInfo');
	el.innerHTML = `${unit?.displayName || ''}`;
	return {};
};

const setup = async () => {
	document.title = 'TD: ' + pageTitle;
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const selector = await attachListSelector({ params });

	const unit = getCurrentCharCache();
	const unitInfo = await attachUnitInfo({ unit });

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
