import { scrollable } from '../utils/scrollable.js';

export const canvasHorizontal = async (args) => {
	const { parent, image, height } = args;
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
			ctx
		});
	}
	return { canvas, ctx };
};

export const canvasVertical = async (args) => {
	const { parent, image, width, scrollBottom } = args;
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
			ctx
		});
	}
	return { canvas, ctx };
};
