/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/
import { clone, generateUUID } from '../utils/utils.js';
import { hydrateCharacters } from '../characters/index.js';

const LS_NAME = 'USER_CHARACTERS';

const LEGACY_DEPRECATE = [
	{
		id: '019079cf-cb56-7e71-cbf-8c0a55',
		displayName: 'Tiana',
		level: 140,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7ca8-dc0-78fc46',
		displayName: 'Snow White',
		level: 100,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7eea-718-19f719',
		displayName: 'Jasmine',
		level: 150,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7af9-efc-82ab47',
		displayName: 'Aladdin',
		level: 155,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-7000-b9b-4b1e11',
		displayName: 'Hercules',
		level: 145,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7d59-7f8-84eaeb',
		displayName: 'Mickey',
		level: 130,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7804-d4f-74ff2c',
		displayName: 'Minnie',
		level: 125,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7af5-b6a-95cf69',
		displayName: 'Goofy',
		level: 120,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-77d7-db9-efc3da',
		displayName: 'Donald',
		level: 135,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7709-71b-069644',
		displayName: 'Daisy',
		level: 130,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-76b3-f2c-e9dcdb',
		displayName: 'Pluto',
		level: 115,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7408-7e0-687c66',
		displayName: 'Simba',
		level: 145,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7971-d65-dd7c8c',
		displayName: 'Nala',
		level: 140,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7f3e-c00-2b20b7',
		displayName: 'Scar',
		level: 150,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7ee1-f65-88f817',
		displayName: 'Mufasa',
		level: 155,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-76b2-688-c6f515',
		displayName: 'Timon',
		level: 120,
		mineralCost: 500,
		stars: 1
	},
	{
		id: '019079cf-cb56-7373-cbf-3801bd',
		displayName: 'Pumbaa',
		level: 125,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-73cc-b0d-4f4921',
		displayName: 'Zazu',
		level: 110,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7507-e29-a44e77',
		displayName: 'Rafiki',
		level: 140,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7c0e-46d-40746b',
		displayName: 'Shenzi',
		level: 130,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7ee9-fc7-e75641',
		displayName: 'Banzai',
		level: 125,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7e80-856-904532',
		displayName: 'Ed',
		level: 115,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7ded-b44-3f4bef',
		displayName: 'Woody',
		level: 150,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-735b-647-6b1970',
		displayName: 'Buzz',
		level: 155,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-78f8-dbd-003a17',
		displayName: 'Jessie',
		level: 145,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-744f-5cb-31d3e2',
		displayName: 'Bullseye',
		level: 130,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7ebe-b51-14846b',
		displayName: 'Rex',
		level: 125,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7589-c23-ebf63f',
		displayName: 'Hamm',
		level: 120,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-72de-35b-bfe138',
		displayName: 'Slinky',
		level: 135,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-79c7-e50-8086dc',
		displayName: 'Bo Peep',
		level: 130,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7553-1e0-7b869e',
		displayName: 'Forky',
		level: 115,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7160-e28-fbd149',
		displayName: 'Lotso',
		level: 160,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7b2a-4ed-d6a815',
		displayName: 'Mr. Potato Head',
		level: 145,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7182-111-6e10f5',
		displayName: 'Mrs. Potato Head',
		level: 140,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7071-5d7-ac6dd0',
		displayName: 'Andy',
		level: 150,
		mineralCost: 1000,
		stars: 3
	}
];

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
	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
};

// player sells characters
export const sellCharacters = async (chars) => {};

// individual character is UPGRADED (with inputs like: other chars, materials, etc)
export const upgradeCharacter = async (char, inputs) => {};

// individual character is EVOLVED (with inputs like: materials, etc)
export const evolveCharacter = async (char, inputs) => {};
