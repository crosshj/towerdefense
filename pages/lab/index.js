import { scrollable } from '../../utils/scrollable.js';

const pageTitle = 'LAB';

const initDom = (state) => {
	const dom = document.querySelector('.container');
	const canvas = dom.querySelector('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
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
	const { canvas, ctx } = initDom();
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
