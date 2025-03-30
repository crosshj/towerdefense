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

const getFactory = async () => {
	if (!window.dragonBones) {
		await import('./dragonBones.js');
	}
	return import('./POJFactory.js');
};

const range = (start, end, step) =>
	Array.from(
		{ length: (end - start) / step + 1 },
		(_, i) => start + i * step
	);

export const getAnimateable = async (args) => {
	const { POJFactory, POJArmatureDisplay } = await getFactory();
	const {
		canvas: canvasSrc,
		width,
		height,
		framerate = 24,
		skeleton,
		atlas,
		texture,
		//
	} = args;

	let canvas;
	if (canvasSrc) {
		canvas = canvasSrc;
	} else {
		canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
	}
	const em = new POJArmatureDisplay(null);
	const dbInstance = new dragonBones.DragonBones(em);
	const factory = new POJFactory(dbInstance, canvas);

	await factory.loadData({ skeleton, atlas, texture });
	const armature = factory.buildArmatureDisplay('Armature');

	const setAnimation = (newAnim) => {
		return armature.animation.play(newAnim);
	};
	const advanceTime = (time) => {
		if (!time) {
			return factory.advanceTime(1 / framerate);
		}
		return factory.advanceTime(time);
	};

	const idleFrames = async () => {
		await armature.animation.play('idle');

		let frames = [];
		for (const time of range(1, 30, 1)) {
			advanceTime();
			const img = await new Promise((resolve) => {
				const img = new Image();
				img.src = canvas.toDataURL();
				img.onload = resolve(img);
			});
			if (time > 10 && time % 4 === 0) {
				frames.push(img);
			}
		}
		return frames;
	};

	const thumbnail = cropCanvas(canvas);

	return {
		canvas,
		armature,
		factory,
		//
		setAnimation,
		advanceTime,
		//
		thumbnail,
		idleFrames,
	};
};
