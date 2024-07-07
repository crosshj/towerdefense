import { colorize } from '../assets/assets.js';
import { flipCanvasHorizontal } from '/utils/flipCanvasHorizontal.js';

const imageToCanvas = (base_image) => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = base_image.width;
	canvas.height = base_image.height;
	ctx.drawImage(base_image, 0, 0);
	return canvas;
};

const cropCanvas = (
	canvas,
	{ x = -5, y = -23, width = 128, height = 128 } = {}
) => {
	const newCanvas = document.createElement('canvas');
	newCanvas.width = width;
	newCanvas.height = height;
	newCanvas
		.getContext('2d')
		.drawImage(canvas, x, y, width, height, 0, 0, width, height);
	return newCanvas;
};

export const getThumbnail = (unit, state) => {
	if (unit.image) {
		const newCanvas = document.createElement('canvas');
		newCanvas.width = 128;
		newCanvas.height = 128;
		const newCanvasCtx = newCanvas.getContext('2d');
		newCanvasCtx.drawImage(unit.image, 0, 20, 128, 128);
		return newCanvas.toDataURL();
	}
	const blueDefaultColor = '#24b';
	// todo: read unit and act correctly
	const { teeAttackPlain } = state.assets.images;
	const thumbnailCanvas = imageToCanvas(teeAttackPlain[0]);
	const thumbnailCropped = cropCanvas(thumbnailCanvas, {
		x: 5,
		y: -5,
		width: 32,
		height: 32
	});
	colorize(unit?.color || blueDefaultColor)(
		thumbnailCropped,
		thumbnailCropped.getContext('2d')
	);
	return thumbnailCropped.toDataURL();
};

export const getCharRenderer = ({
	center,
	bottom,
	state,
	ctx,
	SCALAR,
	shadow,
	healthBar
}) => {
	const {
		teeRunBlue,
		teeAttackBlue,
		teeRunPlain,
		teeAttackPlain,
		teeRunRed,
		teeAttackRed
		//
	} = state.assets.images;

	const attacking = {
		default: teeAttackBlue
	};
	const running = {
		default: teeRunBlue
	};
	const { teams } = state.towers[0];

	if (teams) {
		for (const unit of [...teams[0].a, ...teams[0].b]) {
			running[unit.unit] = [];
			for (const frame of teeRunPlain) {
				const canvas = imageToCanvas(frame);
				colorize(unit?.color || blueDefaultColor)(
					canvas,
					canvas.getContext('2d')
				);
				running[unit.unit].push(canvas);
			}
			attacking[unit.unit] = [];
			for (const frame of teeAttackPlain) {
				const canvas = imageToCanvas(frame);
				colorize(unit?.color || blueDefaultColor)(
					canvas,
					canvas.getContext('2d')
				);
				attacking[unit.unit].push(canvas);
			}
		}
	}

	const getFrame = (unit) => {
		const { target, tick, type } = unit;
		if (type === 'defender') {
			return target ? teeAttackRed[tick % 6] : teeRunRed[tick % 6];
		}
		const attackingFrames = attacking[unit?.unit] || attacking.default;
		const runningFrames = running[unit?.unit] || running.default;
		const frame = target
			? attackingFrames[tick % 6]
			: runningFrames[tick % 6];
		return frame;
	};

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
			img: frame
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
				width: 20
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
		const frame = getFrame(unit);
		const scale = 0.88;
		const sprite = {
			x: center(centerX, SCALAR(frame.width * scale)),
			y: bottom(SCALAR(frame.height * scale)) + SCALAR(10),
			width: SCALAR(frame.width * scale),
			height: SCALAR(frame.height * scale),
			img: frame
		};
		const shadowX =
			type === 'attacker'
				? target
					? sprite.x + 40
					: sprite.x - 20
				: sprite.x;
		shadow({ ...sprite, width: 120, x: shadowX, y: sprite.y - 8 });
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
				width: 20
			});
	};
};
