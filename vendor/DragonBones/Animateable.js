import { POJFactory, POJArmatureDisplay } from './POJFactory.js';

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

export const getAnimateable = async (args) => {
	const {
		canvas: canvasSrc,
		width,
		height,
		framerate = 24,
		skeleton,
		atlas,
		texture
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
		armature.animation.play(newAnim);
	};
	const advanceTime = (time) => {
		if (!time) {
			factory.advanceTime(1 / framerate);
			return;
		}
		factory.advanceTime(time);
	};
	const thumbnail = cropCanvas(canvas);

	return {
		canvas,
		armature,
		factory,
		//
		setAnimation,
		advanceTime,
		thumbnail
	};
};
