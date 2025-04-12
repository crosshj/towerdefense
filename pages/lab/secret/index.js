const labLevel = document.location.pathname.match(/lab\/(.*)\/index.html/)[1];
const pageTitle = `LAB (${labLevel})`;
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
		back: '/pages/lab/index.html',
	});
	window.parent.postMessage({ _: 'loaded' });
};

const setup = async () => {
	document.body.innerHTML = `
        <div class="centered">WIP: Lab (${labLevel})</div>
    `;
	pageDone();
};
document.addEventListener('DOMContentLoaded', setup);
