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
	{ flipBTeam = true, randomStart = false } = {}
) => {
	//console.time('getTeamWithIdle');

	const characters = await getCharacters();
	const teams = await getTeams();
	const raidTeam = teams[teamName];

	const modifyIdleFrames = (frames) => {
		if (randomStart) {
			const randomIndex = Math.floor(Math.random() * frames.length);
			const modifiedFrames = [
				...frames.slice(randomIndex),
				...frames.slice(0, randomIndex),
			];
			return modifiedFrames;
		}
		return frames;
	};

	//console.time('getTeamWithIdle:TeamA');
	for (const [k, v] of Object.entries(raidTeam.a)) {
		raidTeam.a[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.a[k]) {
			raidTeam.a[k] = { ...v };
		}
		const idle = await getCharacterIdleFrames(raidTeam.a[k]);
		raidTeam.a[k].idle = modifyIdleFrames(idle);
	}
	//console.timeEnd('getTeamWithIdle:TeamA');

	//console.time('getTeamWithIdle:TeamB');
	for (const [k, v] of Object.entries(raidTeam.b)) {
		raidTeam.b[k] = characters.find((c) => c.id === v.id);
		if (!raidTeam.b[k]) {
			raidTeam.b[k] = { ...v };
		}
		let idle = await getCharacterIdleFrames(raidTeam.b[k]);
		idle = modifyIdleFrames(idle);
		if (flipBTeam) {
			const flipped = idle.map((frame) => {
				const canvas = new OffscreenCanvas(frame.width, frame.height);
				const ctx = canvas.getContext('2d');
				ctx.translate(frame.width, 0);
				ctx.scale(-1, 1);
				ctx.drawImage(frame, 0, 0);
				return canvas.transferToImageBitmap();
			});
			raidTeam.b[k].idle = await Promise.all(flipped);
			continue;
		}
		raidTeam.b[k].idle = idle;
	}
	//console.timeEnd('getTeamWithIdle:TeamB');

	//console.timeEnd('getTeamWithIdle');

	return raidTeam;
};
