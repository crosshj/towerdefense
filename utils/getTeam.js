import { getCharacters } from '../user/characters.js';
import { getTeams } from '../user/teams.js';
import {
	characterImageFromDef,
	characterImageGetter,
	getCharacterIdleFrames,
} from '../visuals/assets/character.js';

const flipImage = async (img) => {
	return new Promise((resolve) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;

		ctx.translate(canvas.width, 0);
		ctx.scale(-1, 1);
		ctx.drawImage(img, 0, 0);

		const flippedImage = new Image();
		flippedImage.src = canvas.toDataURL();
		flippedImage.onload = () => resolve(flippedImage);
	});
};

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
	const raidTeam = teams[teamName];
	for (const [k, v] of Object.entries(raidTeam.a)) {
		raidTeam.a[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.a[k]) {
			raidTeam.a[k] = { ...v };
		}
		const imageUri = await characterImageFromDef(raidTeam.a[k]);
		raidTeam.a[k].image = await loadImage(imageUri);
		raidTeam.a[k].imageUri = imageUri;
	}
	for (const [k, v] of Object.entries(raidTeam.b)) {
		raidTeam.b[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.b[k]) {
			raidTeam.b[k] = { ...v };
		}
		const imageUri = await characterImageFromDef(raidTeam.b[k]);
		raidTeam.b[k].image = await loadImage(imageUri, flipBTeam);
		raidTeam.b[k].imageUri = imageUri;
	}
	return raidTeam;
};

export const getTeamFromNumber = async (teamNumber, flipBTeam = false) => {
	const teamName = 'Team ' + teamNumber;
	const team = await getTeam(teamName, flipBTeam);
	return team;
};

export const getTeamWithIdle = async (
	teamName = 'Team 1',
	flipBTeam = true
) => {
	const characters = await getCharacters();
	const teams = await getTeams();
	const raidTeam = teams[teamName];

	for (const [k, v] of Object.entries(raidTeam.a)) {
		raidTeam.a[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.a[k]) {
			raidTeam.a[k] = { ...v };
		}
		const idle = await getCharacterIdleFrames(raidTeam.a[k]);
		raidTeam.a[k].idle = idle;
	}

	for (const [k, v] of Object.entries(raidTeam.b)) {
		raidTeam.b[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.b[k]) {
			raidTeam.b[k] = { ...v };
		}
		const idle = await getCharacterIdleFrames(raidTeam.b[k]);
		if (flipBTeam) {
			const flipped = [];
			for (const frame of idle) {
				const flippedImage = await flipImage(frame);
				flipped.push(flippedImage);
			}
			raidTeam.b[k].idle = flipped;
			continue;
		}
		raidTeam.b[k].idle = idle;
	}

	return raidTeam;
};
