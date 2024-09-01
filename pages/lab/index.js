import { canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'LAB';

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const bg = await canvasVertical({
		parent: document.body,
		image: '/pages/lab/background.png',
		width: 950,
	});
	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: 'LAB',
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
