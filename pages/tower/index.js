import { canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'TOWER';

const setup = async () => {
	document.title = `TD: ${pageTitle}`;

	const bg = await canvasVertical({
		parent: document.body,
		image: '/pages/tower/towerBackground.png',
		width: 950,
		scrollBottom: 0,
	});

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
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
