const pageTitle = 'GUILD';
const pageDone = () => {
	document.title = `TD: ${pageTitle}`;
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

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });
	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
