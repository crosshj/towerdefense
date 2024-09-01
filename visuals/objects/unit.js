import { flipCanvasHorizontal } from '/utils/flipCanvasHorizontal.js';

// const imageToCanvas = (base_image) => {
// 	const canvas = document.createElement('canvas');
// 	const ctx = canvas.getContext('2d');
// 	canvas.width = base_image.width;
// 	canvas.height = base_image.height;
// 	ctx.drawImage(base_image, 0, 0);
// 	return canvas;
// };

// const cropCanvas = (
// 	canvas,
// 	{ x = -5, y = -23, width = 128, height = 128 } = {}
// ) => {
// 	const newCanvas = document.createElement('canvas');
// 	newCanvas.width = width;
// 	newCanvas.height = height;
// 	newCanvas
// 		.getContext('2d')
// 		.drawImage(canvas, x, y, width, height, 0, 0, width, height);
// 	return newCanvas;
// };

export const getThumbnail = (unit, state) => {
	if (unit.image) {
		const newCanvas = document.createElement('canvas');
		newCanvas.width = 128;
		newCanvas.height = 128;
		const newCanvasCtx = newCanvas.getContext('2d');
		newCanvasCtx.drawImage(unit.image, 0, 20, 128, 128);
		return newCanvas.toDataURL();
	}
};

export const getCharRenderer = ({
	center,
	bottom,
	state,
	ctx,
	SCALAR,
	healthBar,
}) => {
	const bonedVisual = ({ state, ctx, unit }) => {
		const { id, x: centerX, hp, hpMax, type, target } = unit;
		const animation = state.assets.animations[id]();
		if (animation === 'pending') return;
		const frame = animation.canvas;
		const scale = 0.35;
		const sprite = {
			x: center(centerX, SCALAR(frame.width * scale)),
			y: bottom(SCALAR(frame.height * scale)) + SCALAR(10),
			width: SCALAR(frame.width * scale),
			height: SCALAR(frame.height * scale),
			img: frame,
		};
		if (type === 'defender') {
			sprite.img = flipCanvasHorizontal(sprite.img);
		}
		ctx.drawImage(
			sprite.img,
			sprite.x,
			sprite.y,
			sprite.width,
			sprite.height
		);
		hp > 0 &&
			healthBar({
				...sprite,
				hp,
				hpMax,
				x: centerX,
				width: 20,
			});
		if (!state.paused) {
			animation.advanceTime();
		}
	};

	return (unit) => {
		const { id, x: centerX, hp, hpMax, type, target } = unit;
		if (typeof state.assets.animations[id] === 'function') {
			return bonedVisual({ state, ctx, unit });
		}
	};
};
