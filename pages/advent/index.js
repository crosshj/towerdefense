const pageTitle = 'ADVENT';

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

	document.body.innerHTML = `
		<div>WIP: ${pageTitle}</div>
	`;
	document.title = 'TD: ' + pageTitle;

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
