import { getCharacters } from '../../user/characters.js';
import { getTeams } from '../../user/teams.js';
import { characterImageGetter } from '../../visuals/assets/character.js';

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

export const getTeam = async (teamName = 'Team 1', flipBTeam = true) => {
	const characters = await getCharacters();
	const teams = await getTeams();
	const getCharImage = await characterImageGetter();
	const raidTeam = teams[teamName];
	for (const [k, v] of Object.entries(raidTeam.a)) {
		raidTeam.a[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.a[k]) {
			raidTeam.a[k] = { ...v };
		}
		raidTeam.a[k].image = await loadImage(getCharImage(raidTeam.a[k]));
	}
	for (const [k, v] of Object.entries(raidTeam.b)) {
		raidTeam.b[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.b[k]) {
			raidTeam.b[k] = { ...v };
		}
		raidTeam.b[k].image = await loadImage(
			getCharImage(raidTeam.b[k]),
			flipBTeam
		);
	}
	return raidTeam;
};
