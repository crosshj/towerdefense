import { scrollable } from '../utils/scrollable.js';

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
