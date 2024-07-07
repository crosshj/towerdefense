import { getAnimateable } from '/vendor/DragonBones/Animateable.js';

export const characterAnimationGetter = async (character) => {
	const skeleton = '/assets/character/FighterBase/FighterBase_ske.json';
	const atlas = '/assets/character/FighterBase/FighterBase_tex.json';
	let texture = '/assets/character/FighterBase/Elements/Normal_tex.png';
	if (character.unit === 'blue-1') {
		texture = '/assets/character/FighterBase/Elements/Fighting_tex.png';
	}
	if (character.unit === 'blue-2') {
		texture = '/assets/character/FighterBase/Elements/Rock_tex.png';
	}
	if (character.unit === 'blue-3') {
		texture = '/assets/character/FighterBase/Elements/Fairy_tex.png';
	}
	if (character.unit === 'blue-4') {
		texture = '/assets/character/FighterBase/Elements/Air_tex.png';
	}
	if (character.unit === 'blue-5') {
		texture = '/assets/character/FighterBase/Elements/Dragon_tex.png';
	}
	if (character.type === 'defender') {
		texture = '/assets/character/FighterBase/Elements/Poison_tex.png';
	}
	if (character.element) {
		texture = `/assets/character/FighterBase/Elements/${character.element}_tex.png`;
	}
	const width = 128;
	const height = 140;
	const framerate = 8;
	const animation = await getAnimateable({
		width,
		height,
		framerate,
		skeleton,
		atlas,
		texture
	});
	animation.setAnimation('jumping');
	// TODO: should get thumbnails and animateable character here
	/*
		animation.thumbnail; //is a cropped canvas
		animation.canvas;
		animation.setAnimation("run");
		animation.advanceTime();
	*/
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
		{ r: 148, g: 0, b: 211 }
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
	const elements = [
		'Air',
		'Bug',
		'Dark',
		'Dragon',
		'Earth',
		'Electric',
		'Fairy',
		'Fighting',
		'Fire',
		'Ghost',
		'Ice',
		'Normal',
		'Plant',
		'Poison',
		'Psychic',
		'Rock',
		'Steel',
		'Water'
	];
	for (const element of elements) {
		const animation = await characterAnimationGetter({ element });
		allImages[element] = animation.canvas.toDataURL();
	}
};

export const characterImageGetter = async () => {
	//const allImages = await getAllImages();
	const allImages = {};
	for (const letter of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
		allImages[letter] = await new Promise((resolve) => {
			const img = new Image();
			img.src = '/assets/teamDragImage.png';
			img.onload = () => {
				resolve(getLetterDataURI(img, letter));
			};
		});
	}
	await addBoned(allImages);

	return (character) => {
		console.log({ character });
		if (character.element) {
			return allImages[character.element];
		}
		return allImages[character.displayName[0].toLowerCase()];
	};
};
