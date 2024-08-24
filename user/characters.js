/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/
import { clone, generateUUID } from '../utils/utils.js';
import {
	calculateCombineResults,
	hydrateCharacters
} from '../characters/index.js';
import { getUserFromAPI, updateUserFromAPI } from './user.js';
import {
	compressChars,
	compressTeams,
	decompressChars,
	decompressTeams
} from '../utils/compress.js';
import { getTeams } from './teams.js';
import { flattenTeams } from '../utils/teams.js';

const LS_NAME = 'USER_CHARACTERS';
const LS_NAME_TEAMS = 'USER_TEAMS';

const defaultCharacterList = [
	{
		// 1-star fighting
		id: '0-localid',
		code: 'u0001-1-macho'
	},
	{
		// 2-star rock
		id: '1-localid',
		code: 'u0001-2-toto'
	},
	{
		// 3-star fairy
		id: '2-localid',
		code: 'u0001-3-twinkle'
	},
	{
		// 4-star air/flying
		id: '3-localid',
		code: 'u0001-4-vispi'
	},
	{
		// 5-star dragon
		id: '4-localid',
		code: 'u0001-5-drat'
	},
	{
		// 4-star bug
		id: '5-localid',
		code: 'u0001-4-antonio'
	},
	{
		// 4-star dark
		id: '6-localid',
		code: 'u0001-4-bumpier'
	},
	{
		// 4-star earth
		id: '7-localid',
		code: 'u0001-4-tabi'
	},
	{
		// 5-star electric
		id: '8-localid',
		code: 'u0001-5-electopus'
	},
	{
		// 5-star fire
		id: '9-localid',
		code: 'u0001-5-santelmo'
	},
	{
		// 5-star ghost
		id: '10-localid',
		code: 'u0001-5-multo'
	},
	{
		// 5-star ice
		id: '11-localid',
		code: 'u0001-5-kelvin'
	},
	{
		// 5-star normal
		id: '12-localid',
		code: 'u0001-5-blanko'
	},
	{
		// 5-star plant
		id: '13-localid',
		code: 'u0001-5-prickles'
	},
	{
		// 5-star poison
		id: '14-localid',
		code: 'u0001-5-crack9'
	},
	{
		// 5-star psychic
		id: '15-localid',
		code: 'u0001-5-robia'
	},
	{
		// 5-star steel
		id: '16-localid',
		code: 'u0001-5-barbell'
	},
	{
		// 5-star water
		id: '17-localid',
		code: 'u0001-5-wap'
	}
];

export const getCharactersAndTeams = async (_apiUser) => {
	const apiUser = _apiUser || (await getUserFromAPI());
	let apiChars;
	let apiTeams;
	if (apiUser && apiUser.data.teams && apiUser.data.characters) {
		apiChars = decompressChars(apiUser.data.characters);
		apiTeams = decompressTeams(apiUser.data.teams, apiChars);
	}
	return {
		characters: apiChars,
		teams: apiTeams
	};
};

export const getCharacters = async (hydrate = true) => {
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let characters;
	try {
		characters = JSON.parse(lsValue);
	} catch (e) {
		characters = clone(defaultCharacterList);
	}

	const apiUser = await getUserFromAPI();
	if (apiUser && apiUser.data.characters) {
		const decomp = decompressChars(apiUser.data.characters);
		localStorage.setItem(LS_NAME, JSON.stringify(decomp));
		characters = decomp;
		//console.log({ apiUser, charactersFromApi: decomp });
	}

	if (!hydrate) {
		return characters;
	}
	const hydratedCharacters = await hydrateCharacters(characters);
	return hydratedCharacters;
};

// level is complete, give characters exp
export const addCharactersEXP = async (chars, expAmount) => {
	const prevTeams = await getTeams();
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
		...(apiUser?.data || {}),
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
		...(apiUser?.data || {}),
		characters: compressChars(newChars)
	});

	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
};

// player sells characters
export const sellCharacters = async (chars) => {};

const reIndexTeams = ({ removeIds, prevTeams, prevChars }) => {
	const prevCharsWithUUID = [...prevChars].map((x) => {
		return { ...x, uuid: generateUUID() };
	});
	const newCharsWithUUID = prevCharsWithUUID.filter(
		(char) => !removeIds.includes(char.id)
	);
	const newChars = decompressChars(compressChars(newCharsWithUUID));

	const reIndexedTeams = {};
	const allTeamNames = [
		'Team 1',
		'Team 2',
		'Team 3',
		'Team 4',
		'Team 5',
		'Defense'
	];
	for (const teamName of allTeamNames) {
		reIndexedTeams[teamName] = { a: [], b: [] };
		for (const subteam of ['a', 'b']) {
			for (const index of [0, 1, 2, 3, 4]) {
				const prevTeam = prevTeams[teamName][subteam][index];
				const prevChar = prevCharsWithUUID.find(
					(x) => x.id === prevTeam.id
				);
				const newChar = newChars.find((x) => x.index === prevChar.uuid);
				reIndexedTeams[teamName][subteam][index] = { id: newChar?.id };
			}
		}
	}
	return reIndexedTeams;
};

export const parseUpgradeChange = (args) => {
	//console.log({ args });
	const { currentChar, materials, prevChars, prevTeams } = args;
	const removeIds = materials.filter((x) => x).map((x) => x?.id);

	const teamsString = JSON.stringify(prevTeams);
	const removeError = removeIds.some((x) => teamsString.includes(`"${x}"`));
	if (removeError) {
		return { error: 'cannot use team units for upgrade!' };
	}

	const combineRes = calculateCombineResults({
		currentChar,
		materials
	});

	const newChars = [...prevChars].filter(
		(char) => !removeIds.includes(char.id)
	);
	const updatedChar = newChars.find((x) => x.id === currentChar.id);
	updatedChar.experience = combineRes.newExperience;
	updatedChar.professorPoints = combineRes.newProfessorPoints;
	updatedChar.uncapped = combineRes.newUncapped;
	//MUST re-index teams since character indexs have changed
	const reIndexedTeams = reIndexTeams({
		removeIds,
		prevTeams,
		prevChars
	});
	const newCharsCompressed = compressChars(newChars);
	const newTeamsCompressed = compressTeams(
		reIndexedTeams,
		decompressChars(newCharsCompressed)
	);

	const newTeams = decompressTeams(newTeamsCompressed, newChars);

	return {
		newCharsCompressed,
		newTeamsCompressed,
		newChars,
		newTeams,
		updatedChar
	};
};

// individual character is UPGRADED (with inputs like: other chars, materials, etc)
export const upgradeCharacter = async (currentChar, materials) => {
	const apiUser = await getUserFromAPI();
	const { characters: prevChars, teams: prevTeams } =
		await getCharactersAndTeams(apiUser);
	// const prevChars = await getCharacters(false /*hydrated*/);
	//const prevTeams = await getTeams();

	const {
		newCharsCompressed,
		newTeamsCompressed,
		newChars,
		newTeams,
		updatedChar
	} = parseUpgradeChange({ currentChar, materials, prevChars, prevTeams });

	await updateUserFromAPI({
		...(apiUser?.data || {}),
		characters: newCharsCompressed,
		teams: newTeamsCompressed
	});
	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
	localStorage.setItem(LS_NAME_TEAMS, JSON.stringify(newTeams));
	return {
		currentChar: updatedChar,
		characters: newChars
	};
};

// individual character is EVOLVED (with inputs like: materials, etc)
export const evolveCharacter = async (char, inputs) => {};
