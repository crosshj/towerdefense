/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/
import { clone, generateUUID } from '../utils/utils.js';
import { hydrateCharacters } from '../characters/index.js';
import { getUserFromAPI, updateUserFromAPI } from './user.js';
import { compressChars, decompressChars } from '../utils/compress.js';

const LS_NAME = 'USER_CHARACTERS';

const defaultCharacterList = [
	{
		// 1-star fighting
		id: '019079cf-cb56-7f47-f03-7ef27d',
		code: 'u0001-1-macho'
	},
	{
		// 2-star rock
		id: '019079cf-cb56-7f2b-f72-56f0fd',
		code: 'u0001-2-toto'
	},
	{
		// 3-star fairy
		id: '019079cf-cb56-74e4-310-d79f9e',
		code: 'u0001-3-twinkle'
	},
	{
		// 4-star air/flying
		id: '019079cf-cb56-7d7b-469-3b4bb5',
		code: 'u0001-4-vispi'
	},
	{
		// 5-star dragon
		id: '019079cf-cb56-7211-2f3-2bc714',
		code: 'u0001-5-drat'
	},
	{
		// 4-star bug
		id: '019079cf-cb56-76cd-ff8-6d0542',
		code: 'u0001-4-antonio'
	},
	{
		// 4-star dark
		id: '019079cf-cb56-76c6-e56-7459e0',
		code: 'u0001-4-bumpier'
	},
	{
		// 4-star earth
		id: '019079cf-cb56-7b0b-ad4-36b3eb',
		code: 'u0001-4-tabi'
	},
	{
		// 5-star electric
		id: '019079cf-cb56-7020-725-206b2f',
		code: 'u0001-5-electopus'
	},
	{
		// 5-star fire
		id: '019079cf-cb56-7ea0-337-0ad0de',
		code: 'u0001-5-santelmo'
	},
	{
		// 5-star ghost
		id: '019079cf-cb56-7777-53f-64e88d',
		code: 'u0001-5-multo'
	},
	{
		// 5-star ice
		id: '019079cf-cb56-7a7f-741-8f5588',
		code: 'u0001-5-kelvin'
	},
	{
		// 5-star normal
		id: '019079cf-cb56-7004-2bb-144d0e',
		code: 'u0001-5-blanko'
	},
	{
		// 5-star plant
		id: '019079cf-cb56-71dd-1d6-d8a311',
		code: 'u0001-5-prickles'
	},
	{
		// 5-star poison
		id: '019079cf-cb56-7358-a31-edf4b2',
		code: 'u0001-5-crack9'
	},
	{
		// 5-star psychic
		id: '019079cf-cb56-7661-466-8868c6',
		code: 'u0001-5-robia'
	},
	{
		// 5-star steel
		id: '019079cf-cb56-71e2-738-b6d9c2',
		code: 'u0001-5-barbell'
	},
	{
		// 5-star water
		id: '019079cf-cb56-7b4d-652-890dd9',
		code: 'u0001-5-wap'
	}
];

export const getCharacters = async (hydrate = true) => {
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let characters;
	try {
		characters = JSON.parse(lsValue);
	} catch (e) {
		characters = clone(defaultCharacterList);
	}

	// const apiUser = await getUserFromAPI();
	// if (apiUser && apiUser.data.characters) {
	// 	const decomp = decompressChars(apiUser.data.characters);
	// 	localStorage.setItem(LS_NAME, JSON.stringify(decomp));
	// 	characters = decomp;
	// }

	if (!hydrate) {
		return characters;
	}
	const hydratedCharacters = await hydrateCharacters(characters);
	return hydratedCharacters;
};

// level is complete, give characters exp
export const addCharactersEXP = async (chars, expAmount) => {
	const hydrated = false;
	const allChars = await getCharacters(hydrated);
	for (const { id } of chars) {
		const thisChar = allChars.find((x) => x.id === id);
		if (!thisChar) {
			debugger;
		}
		thisChar.experience = thisChar.experience || 0;
		thisChar.experience += expAmount;
		//TODO: note when this causes a char to level up?
		//TODO: cap experience based on stars
	}

	const apiUser = await getUserFromAPI();
	await updateUserFromAPI({
		...(apiUser.data || {}),
		characters: compressChars(allChars)
	});

	localStorage.setItem(LS_NAME, JSON.stringify(allChars));
};

// player gets a character as a reward
export const addNewCharacter = async (char) => {
	const hydrated = false;
	const allChars = await getCharacters(hydrated);
	const newChars = [
		...allChars,
		{
			id: generateUUID(),
			code: char.code,
			experience: 0
		}
	];

	const apiUser = await getUserFromAPI();
	await updateUserFromAPI({
		...(apiUser.data || {}),
		characters: compressChars(newChars)
	});

	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
};

// player sells characters
export const sellCharacters = async (chars) => {};

// individual character is UPGRADED (with inputs like: other chars, materials, etc)
export const upgradeCharacter = async (char, inputs) => {};

// individual character is EVOLVED (with inputs like: materials, etc)
export const evolveCharacter = async (char, inputs) => {};
