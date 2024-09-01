import { getViewportDimensions } from '../../utils/getViewportDimensions.js';
import { scrollable } from '../../utils/scrollable.js';

const pageTitle = 'TOWER';

const initDom = async (state) => {
	const dom = document.querySelector('.container');
	const canvas = dom.querySelector('canvas');
	const viewport = await getViewportDimensions();
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	const ctx = canvas.getContext('2d', {
		antialias: false,
		depth: false,
		desynchronized: true,
	});
	ctx.imageSmoothingEnabled = false;
	return { canvas, ctx };
};

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const { canvas, ctx } = await initDom();

	ctx.fillStyle = '#999';
	ctx.font = '30px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(pageTitle, canvas.width / 2, canvas.height / 2);

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: 'TOWER',
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
