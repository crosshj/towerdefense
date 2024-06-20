import { scrollable } from '../utils/scrollable.js';
import { domLoaded } from '../utils/utils.js';

export const canvasHorizontal = async (args) => {
	document.body.style.background = '#000';
	await domLoaded();
	const { parent, image, height, offsetX, clickMap, clickHandle } = args;
	const canvas = document.createElement('canvas');
	canvas.width = parent.clientWidth;
	canvas.height = height;
	const ctx = canvas.getContext('2d', {
		antialias: false,
		depth: false,
		desynchronized: true
	});
	ctx.imageSmoothingEnabled = false;
	parent.insertAdjacentElement('afterbegin', canvas);
	if (image) {
		await scrollable({
			image,
			horizontal: true,
			canvas,
			ctx,
			offsetX,
			clickMap,
			clickHandle
		});
	}
	return { canvas, ctx };
};

export const canvasVertical = async (args) => {
	document.body.style.background = '#000';
	await domLoaded();
	const { parent, image, width, scrollBottom, clickMap, clickHandle } = args;
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = parent.clientHeight;
	const ctx = canvas.getContext('2d', {
		antialias: false,
		depth: false,
		desynchronized: true
	});
	ctx.imageSmoothingEnabled = false;
	parent.insertAdjacentElement('afterbegin', canvas);
	if (image) {
		await scrollable({
			image,
			vertical: true,
			scrollBottom,
			canvas,
			ctx,
			clickMap,
			clickHandle
		});
	}
	return { canvas, ctx };
};
