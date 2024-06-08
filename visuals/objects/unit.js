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
	// todo: read unit and act correctly
	const { teeRunBlue, teeAttackBlue } = state.assets.images;
	const thumbnailCanvas = imageToCanvas(teeAttackBlue[0]);
	const thumbnailDataUri = cropCanvas(thumbnailCanvas, {
		x: 5,
		y: -5,
		width: 32,
		height: 32
	}).toDataURL();
	return thumbnailDataUri;
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
	const { teeRunBlue, teeRunRed, teeAttackBlue, teeAttackRed } =
		state.assets.images;

	return ({ x: centerX, hp, hpMax, color, type, target, tick = 0 }) => {
		const frame = {
			defender: target ? teeAttackRed[tick % 6] : teeRunRed[tick % 6],
			attacker: target ? teeAttackBlue[tick % 6] : teeRunBlue[tick % 6]
		}[type];
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
