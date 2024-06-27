import { canvasHorizontal } from '../../visuals/canvas.js';

const pageTitle = 'SPECIAL STAGE';

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const bg = await canvasHorizontal({
		parent: document.body,
		image: '/pages/specialStage/background.png',
		height: 500
	});

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: 'Special Stage',
		visibility: 'visible'
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
