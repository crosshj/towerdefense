import { getCharacters } from '../user/characters.js';
import { getTeams } from '../user/teams.js';
import { characterImageFromDef } from '../visuals/assets/character.js';

const loadImage = async (url, flipHorizontal) => {
	let img = new Image();
	return new Promise((resolve) => {
		img.onload = () => {
			if (flipHorizontal) {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				canvas.width = img.width;
				canvas.height = img.height;

				ctx.translate(canvas.width, 0);
				ctx.scale(-1, 1);
				ctx.drawImage(img, 0, 0);

				const flippedImage = new Image();
				flippedImage.onload = () => resolve(flippedImage);
				flippedImage.src = canvas.toDataURL();
			} else {
				resolve(img);
			}
		};
		img.src = url;
	});
};

export const getCharacterById = async (params) => {
	const { id: charId } = params;
	const characters = await getCharacters();
	const character = characters.find((c) => c.id === charId);
	const charImage = await characterImageFromDef(character);
	character.image = await loadImage(charImage);
	return character;
};

export const getCharacterFromTeam = async (params) => {
	const { id: idParam, sub, slot, team = 1 } = params;
	if (idParam) return await getCharacterById(params);

	const teams = await getTeams();
	const { id } = teams['Team ' + team][sub][Number(slot) - 1];
	return await getCharacterById({ id });
};
