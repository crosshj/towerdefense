/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/
import { defaultCharacters } from '/$data/defaultCharacters.js';
import { clone, generateUUID } from '../utils/utils.js';
import { getUserFromAPI, updateUserFromAPI } from './user.js';
import {
	compressChars,
	compressTeams,
	decompressChars,
	decompressTeams,
} from '../utils/compress.js';
import { getTeams } from './teams.js';
import {
	calculateCombineResults,
	calculateSellValue,
	hydrateCharacters,
} from '../utils/units.js';
import { getStats } from './stats.js';

const LS_NAME = 'USER_CHARACTERS';
const LS_NAME_TEAMS = 'USER_TEAMS';
const LS_NAME_STATS = 'USER_STATS';

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
		teams: apiTeams,
	};
};

export const getCharacters = async (hydrate = true) => {
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let characters;
	try {
		characters = JSON.parse(lsValue);
	} catch (e) {
		const defaultCharacterList = defaultCharacters();
		characters = clone(defaultCharacterList);
	}

	const apiUser = await getUserFromAPI();
	if (apiUser && apiUser.data.characters) {
		const decomp = decompressChars(apiUser.data.characters);
		localStorage.setItem(LS_NAME, JSON.stringify(decomp));
		characters = decomp;
		// console.log({ apiUser, charactersFromApi: decomp });
	}

	if (!hydrate) {
		return characters;
	}
	const hydratedCharacters = await hydrateCharacters(characters);
	return hydratedCharacters;
};

export const updateAllChars = async (allChars, _apiUser) => {
	const apiUser = _apiUser || (await getUserFromAPI());
	await updateUserFromAPI({
		...(apiUser?.data || {}),
		characters: compressChars(allChars),
	});
	localStorage.setItem(LS_NAME, JSON.stringify(allChars));
};

// level is complete, give characters exp
export const addCharactersEXP = async (chars, expAmount) => {
	const prevTeams = await getTeams();
	const hydrated = false;
	const allChars = await getCharacters(hydrated);
	for (const { id } of chars) {
		const thisChar = allChars.find((x) => x.id === id);
		if (!thisChar) {
			continue;
		}
		thisChar.experience = thisChar.experience || 0;
		thisChar.experience += expAmount;
		//TODO: note when this causes a char to level up?
		//TODO: cap experience based on stars
	}

	await updateAllChars(allChars);
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
			experience: 0,
		},
	];

	const apiUser = await getUserFromAPI();
	await updateUserFromAPI({
		...(apiUser?.data || {}),
		characters: compressChars(newChars),
	});

	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
};

const getUpdatedCharIndex = ({ removeIds, updatedChar, prevChars }) => {
	let _chars = JSON.parse(JSON.stringify(prevChars));
	const _updatedChar = _chars.find((x) => x.id === updatedChar.id);
	_updatedChar.isBeingUpdated = true;
	_chars = _chars.filter((char) => !removeIds.includes(char.id));
	for (const key of Object.keys(_chars)) {
		_chars[key].id = `${key}-localid`;
	}
	const newId = _chars.find((x) => x.isBeingUpdated).id;
	return newId;
};

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
		'Defense',
	];
	for (const teamName of allTeamNames) {
		reIndexedTeams[teamName] = { a: [], b: [] };
		for (const subteam of ['a', 'b']) {
			for (const index of [0, 1, 2, 3, 4]) {
				const prevTeam = prevTeams[teamName][subteam][index];
				const prevChar = prevCharsWithUUID.find(
					(x) => x.id === prevTeam.id
				);
				const newChar = newChars.find(
					(x) => x.index === prevChar?.uuid
				);
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
		return { error: 'cannot consume team units!' };
	}

	const newChars = [...prevChars].filter(
		(char) => !removeIds.includes(char.id)
	);

	let updatedChar;
	if (currentChar) {
		const combineRes = calculateCombineResults({
			currentChar,
			materials,
		});
		updatedChar = newChars.find((x) => x.id === currentChar.id);
		updatedChar.experience = combineRes.newExperience;
		updatedChar.professorPoints = combineRes.newProfessorPoints;
		updatedChar.uncapped = combineRes.newUncapped;
	}

	//MUST re-index teams since character indexs have changed
	const reIndexedTeams = reIndexTeams({
		removeIds,
		prevTeams,
		prevChars,
	});
	const newCharsCompressed = compressChars(newChars);
	const newTeamsCompressed = compressTeams(
		reIndexedTeams,
		decompressChars(newCharsCompressed)
	);

	const newTeams = decompressTeams(newTeamsCompressed, newChars);

	if (currentChar) {
		updatedChar.id = getUpdatedCharIndex({
			removeIds,
			updatedChar,
			prevChars,
		});
	}

	return {
		newCharsCompressed,
		newTeamsCompressed,
		newChars,
		newTeams,
		updatedChar,
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
		updatedChar,
		error,
	} = parseUpgradeChange({ currentChar, materials, prevChars, prevTeams });
	if (error) {
		return { error };
	}

	await updateUserFromAPI({
		...(apiUser?.data || {}),
		forced: true,
		characters: newCharsCompressed,
		teams: newTeamsCompressed,
	});
	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
	localStorage.setItem(LS_NAME_TEAMS, JSON.stringify(newTeams));
	return {
		currentChar: updatedChar,
		characters: newChars,
	};
};

// individual character is EVOLVED (with inputs like: materials, etc)
export const evolveCharacter = async (char, inputs) => {};

export const toggleCharacterLock = async (char) => {
	const hydrated = false;
	const allChars = await getCharacters(hydrated);
	const thisChar = allChars.find((x) => x.id === char.id);
	thisChar.locked =
		typeof thisChar?.locked !== 'undefined' ? !thisChar.locked : true;
	const apiUser = await getUserFromAPI();
	await updateUserFromAPI({
		...(apiUser?.data || {}),
		characters: compressChars(allChars),
	});
	localStorage.setItem(LS_NAME, JSON.stringify(allChars));
};

// player sells characters
export const sellCharacters = async (units) => {
	const materials = units.map((id) => ({ id }));
	const apiUser = await getUserFromAPI();
	const { characters: prevChars, teams: prevTeams } =
		await getCharactersAndTeams(apiUser);

	const sellValue = await calculateSellValue(units);
	console.log(
		'TODO: credit the user with sell value',
		apiUser.data,
		sellValue
	);

	const { newCharsCompressed, newTeamsCompressed, newChars, newTeams } =
		parseUpgradeChange({ materials, prevChars, prevTeams });

	await updateUserFromAPI({
		...(apiUser?.data || {}),
		characters: newCharsCompressed,
		teams: newTeamsCompressed,
		coins: (apiUser?.data?.coins || 0) + sellValue,
	});
	localStorage.setItem(LS_NAME, JSON.stringify(newChars));
	localStorage.setItem(LS_NAME_TEAMS, JSON.stringify(newTeams));

	const newStats = await getStats();
	newStats.coins += sellValue;
	localStorage.setItem(LS_NAME_STATS, JSON.stringify(newStats));
	return {
		characters: newChars,
	};
};
