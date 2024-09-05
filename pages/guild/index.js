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

const attachButtons = async () => {
	const swapShopButton = document.querySelector('.swapShop');
	swapShopButton.addEventListener('pointerdown', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/swapShop/index.html?selectedTab=guild&back=/pages/guild/index.html',
		});
	});
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });
	await attachButtons();
	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
