import { IDBStorage } from '../../utils/IDBStorage.js';
import { listAvailableUnits } from '../../utils/units.js';
import { getAnimateable } from '/vendor/DragonBones/Animateable.js';

const unitImageStore = new IDBStorage('ImageDB', 'UnitStore');

const getCharacterTexture = (character) => {
	let texture = '/assets/character/FighterBase/Elements/Normal_tex.png';
	if (character?.type === 'defender' && !character?.code) {
		texture = '/assets/character/FighterBase/skins/0-enemy_tex.png';
	}
	if (character?.element && !character?.code) {
		texture = `/assets/character/FighterBase/Elements/${character.element}_tex.png`;
	}
	if (!character?.code && character?.id + '' === 'undefined') {
		texture = '/assets/character/FighterBase/_transparent_tex.png';
	}
	if (character?.code) {
		texture = `/assets/character/FighterBase/skins/${character.code.replace(
			'u0001-',
			''
		)}_tex.png`;
	}
	if (texture === '/assets/character/FighterBase/Elements/Normal_tex.png') {
		debugger;
	}
	return texture;
};

export const characterAnimationGetter = async (
	character,
	{ width = 128, height = 140, still } = {}
) => {
	if (still === true) {
		try {
			const image = await unitImageStore.get(character.code);
			if (image) return { image };
		} catch (e) {}
	}
	const skeleton = '/assets/character/FighterBase/FighterBase_ske.json';
	const atlas = '/assets/character/FighterBase/FighterBase_tex.json';
	const texture = getCharacterTexture(character);

	const framerate = 8;
	const animation = await getAnimateable({
		width,
		height,
		framerate,
		skeleton,
		atlas,
		texture,
	});
	animation.setAnimation('jumping');
	// TODO: should get thumbnails and animateable character here
	/*
		animation.thumbnail; //is a cropped canvas
		animation.canvas;
		animation.setAnimation("run");
		animation.advanceTime();
	*/

	try {
		//TODO: not sure why this doesn't work
		// const idleFrames = await animation.idleFrames();
		// await unitImageStore.set(character.code, idleFrames[0].toDataURL());

		await unitImageStore.set(character.code, animation.canvas.toDataURL());
	} catch (e) {
		console.log(e);
	}

	return animation;
};

function getDataURI(image) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0);
	return canvas.toDataURL('image/png');
}

function getColorForLetter(letter) {
	const letters = 'abcdefghijklmnopqrstuvwxyz';
	const index = letters.indexOf(letter.toLowerCase());
	if (index === -1) return 'black';
	const colors = [
		{ r: 255, g: 0, b: 0 },
		{ r: 255, g: 127, b: 0 },
		{ r: 255, g: 255, b: 0 },
		{ r: 0, g: 255, b: 0 },
		{ r: 0, g: 0, b: 255 },
		{ r: 75, g: 0, b: 130 },
		{ r: 148, g: 0, b: 211 },
	];
	const colorRange = (colors.length - 1) * 25;
	const stepSize = colorRange / (letters.length - 1);
	const colorIndex = index * stepSize;
	const startColorIndex = Math.floor(colorIndex / 25);
	const endColorIndex = Math.min(startColorIndex + 1, colors.length - 1);
	const factor = (colorIndex % 25) / 25;
	const startColor = colors[startColorIndex];
	const endColor = colors[endColorIndex];
	const interpolate = (start, end, factor) =>
		Math.round(start + factor * (end - start));
	const r = interpolate(startColor.r, endColor.r, factor);
	const g = interpolate(startColor.g, endColor.g, factor);
	const b = interpolate(startColor.b, endColor.b, factor);
	return `rgb(${r}, ${g}, ${b})`;
}

function getLetterDataURI(image, letter) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0);
	const color = getColorForLetter(letter);
	ctx.globalCompositeOperation = 'source-atop';
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = 'multiply';
	ctx.drawImage(image, 0, 0);
	ctx.globalCompositeOperation = 'source-over';
	ctx.font = '30px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';
	ctx.lineWidth = 4;
	ctx.strokeStyle = 'black';
	ctx.strokeText(letter.toUpperCase(), canvas.width / 2, 20);
	ctx.fillStyle = 'white';
	ctx.fillText(letter.toUpperCase(), canvas.width / 2, 20);
	return canvas.toDataURL('image/png');
}

const addBoned = async (allImages) => {
	const width = 120;
	const height = 128;
	const allUnits = listAvailableUnits();
	for (const unit of allUnits) {
		const animation = await characterAnimationGetter(unit, {
			width,
			height,
			still: true,
		});
		allImages[unit.code] = animation?.image || animation.canvas.toDataURL();
	}
};

export const getAllThumbnails = async () => {
	const allImages = {};
	await addBoned(allImages);
	return allImages;
};

export const characterImageGetter = async () => {
	//const allImages = await getAllImages();
	const allImages = {};
	// const teamDragImage = await new Promise((resolve) => {
	// 	const img = new Image();
	// 	img.src = '/assets/teamDragImage.png';
	// 	img.onload = () => {
	// 		resolve(img);
	// 	};
	// });
	// for (const letter of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
	// 	allImages[letter] = getLetterDataURI(teamDragImage, letter);
	// }
	await addBoned(allImages);

	return (character) => {
		if (character?.code) {
			return allImages[character.code];
		}
		if (character?.element) {
			return allImages[character.element];
		}
		const name = (character?.displayName?.[0] || 'a').toLowerCase();
		return allImages[name];
	};
};

export const characterImageFromDef = async (character) => {
	const width = 120;
	const height = 128;
	const animation = await characterAnimationGetter(character, {
		width,
		height,
		still: true,
	});
	return animation?.image || animation.canvas.toDataURL();
};

export const getCharacterIdleFrames = async (character) => {
	//console.time('getCharacterIdleFrames');
	let idleFrames = [];
	try {
		const skeleton = '/assets/character/FighterBase/FighterBase_ske.json';
		const atlas = '/assets/character/FighterBase/FighterBase_tex.json';
		const texture = getCharacterTexture(character);
		const canvas = new OffscreenCanvas(128, 128);
		const animation = await getAnimateable({
			canvas,
			skeleton,
			atlas,
			texture,
		});
		idleFrames = (await animation.idleFrames()) || [];
	} catch (e) {
		console.log(e);
	}
	//console.timeEnd('getCharacterIdleFrames');
	return idleFrames;
};
