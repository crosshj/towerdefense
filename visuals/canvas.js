import { scrollable } from '../utils/scrollable.js';
import { domLoaded } from '../utils/utils.js';

export const canvasHorizontal = async (args) => {
	document.body.style.background = '#000';
	await domLoaded();
	const { parent, image, height, offsetX, clickMap, clickHandle, onDraw } =
		args;
	const canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d', {
		antialias: true,
		depth: false,
		desynchronized: true,
	});
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';
	parent.insertAdjacentElement('afterbegin', canvas);
	if (image) {
		await scrollable({
			...args,
			image,
			horizontal: true,
			canvas,
			ctx,
			offsetX,
			clickMap,
			clickHandle,
			onDraw,
			onScroll: args.onScroll,
		});
	}
	return { canvas, ctx };
};

export const canvasVertical = async (args) => {
	document.body.style.background = '#000';
	await domLoaded();
	const {
		parent,
		image,
		width,
		offsetY,
		scrollBottom,
		clickMap,
		clickHandle,
		onDraw,
	} = args;
	const canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d', {
		antialias: true,
		depth: false,
		desynchronized: true,
	});
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';
	parent.insertAdjacentElement('afterbegin', canvas);
	if (image) {
		await scrollable({
			image,
			vertical: true,
			scrollBottom,
			canvas,
			ctx,
			clickMap,
			clickHandle,
			onDraw,
			offsetY,
			onScroll: args.onScroll,
		});
	}
	return { canvas, ctx };
};
