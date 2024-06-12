import { getViewportDimensions } from '../../utils/getViewportDimensions.js';
import { scrollable } from '../../utils/scrollable.js';

const pageTitle = 'LAB';

const initDom = async (state) => {
	const dom = document.querySelector('.container');
	const canvas = dom.querySelector('canvas');
	const viewport = await getViewportDimensions();
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	const ctx = canvas.getContext('2d', {
		antialias: false,
		depth: false,
		desynchronized: true
	});
	ctx.imageSmoothingEnabled = false;
	return { canvas, ctx };
};

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const { canvas, ctx } = await initDom();

	await scrollable({
		image: '/pages/lab/lab_bg.png',
		vertical: true,
		canvas,
		ctx
	});

	canvas.addEventListener('mousedown', () => {
		document.location.href = '/pages/home/index.html';
	});
};

setup();
