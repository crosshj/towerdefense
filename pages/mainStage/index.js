import { getViewportDimensions } from '../../utils/getViewportDimensions.js';
import { scrollable } from '../../utils/scrollable.js';

const pageTitle = 'MAIN STAGE';

const initDom = (state) => {
	const dom = document.querySelector('.container');
	const canvas = dom.querySelector('canvas');
	const viewport = getViewportDimensions();
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

const setup = () => {
	document.title += `: ${pageTitle}`;
	const { canvas, ctx } = initDom();

	ctx.fillStyle = '#999';
	ctx.font = '30px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(pageTitle, canvas.width / 2, canvas.height / 2);

	canvas.addEventListener('mousedown', () => {
		document.location.href = '/pages/home/index.html';
	});
};

setup();
