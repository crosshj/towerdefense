import { getCurrentCharCache } from '../../../utils/cache.js';

const pageTitle = 'SWITCH';

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });
	const currentChar = getCurrentCharCache();
	const selectedUnitName = currentChar
		? `${currentChar.displayName} (${currentChar.id})`
		: '';
	document.body.innerHTML = `
		<div>WIP: ${pageTitle}</div>
		${selectedUnitName ? `<div>Unit: ${selectedUnitName}</div>` : ''}
	`;
	document.title = 'TD: ' + pageTitle;

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible'
	});

	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
