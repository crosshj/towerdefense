import { clone } from '../utils/utils.js';
import {
	decompressTeams,
	decompressChars,
	compressTeams,
	compressChars
} from '../utils/compress.js';
import { getUserFromAPI, updateUserFromAPI } from './user.js';
import { getCharacters } from './characters.js';

const LS_NAME = 'USER_TEAMS';

/* prettier-ignore */
const defaultValue = {
	'Team 1': {
		a: [
			{ id: '0-localid' },
			{ id: '1-localid' },
			{ id: '2-localid' },
			{ id: '3-localid' },
			{ id: '4-localid' },
		],
		b: [
			{ id: '5-localid' },
			{ id: '6-localid' },
			{ id: '7-localid' },
			{ id: '8-localid' },
			{ id: '9-localid' },
		]
	},
	'Team 2': {
		a: [
			{ id: '10-localid' },
			{ id: '11-localid' },
			{ id: '12-localid' },
			{ id: '13-localid' },
			{ id: '14-localid' },
		],
		b: [
			{ id: '15-localid' },
			{ id: '16-localid' },
			{ id: '17-localid' },
			{ id: '0-localid' },
			{ id: '1-localid' },
		]
	},
	'Team 3': {
		a: [
			{ id: '2-localid' },
			{ id: '3-localid' },
			{ id: '4-localid' },
			{ id: '5-localid' },
			{ id: '6-localid' },
		],
		b: [
			{ id: '7-localid' },
			{ id: '8-localid' },
			{ id: '9-localid' },
			{ id: '10-localid' },
			{ id: '11-localid' },
		]
	},
	'Team 4': {
		a: [
			{ id: '12-localid' },
			{ id: '13-localid' },
			{ id: '14-localid' },
			{ id: '15-localid' },
			{ id: '16-localid' },
		],
		b: [
			{ id: '17-localid' },
			{ id: '0-localid' },
			{ id: '1-localid' },
			{ id: '2-localid' },
			{ id: '3-localid' },
		]
	},
	'Team 5': {
		a: [
			{ id: '4-localid' },
			{ id: '5-localid' },
			{ id: '6-localid' },
			{ id: '7-localid' },
			{ id: '8-localid' },
		],
		b: [
			{ id: '9-localid' },
			{ id: '10-localid' },
			{ id: '11-localid' },
			{ id: '12-localid' },
			{ id: '13-localid' },
		]
	},
	Defense: {
		a: [
			{ id: '0-localid' },
			{ id: '1-localid' },
			{ id: '2-localid' },
			{ id: '3-localid' },
			{ id: '4-localid' },
		],
		b: [
			{ id: '13-localid' },
			{ id: '14-localid' },
			{ id: '15-localid' },
			{ id: '16-localid' },
			{ id: '17-localid' },

		]
	}
};

const getValue = () => {
	const lsValue = localStorage.getItem(LS_NAME);
	if (!lsValue) {
		return clone(defaultValue);
	}
	try {
		return {
			...clone(defaultValue),
			...JSON.parse(lsValue)
		};
	} catch (e) {
		return clone(defaultValue);
	}
};

export const getTeams = async () => {
	let value = getValue();
	const apiUser = await getUserFromAPI();
	if (apiUser && apiUser.data.teams && apiUser.data.characters) {
		const apiChars = decompressChars(apiUser.data.characters);
		const decomp = decompressTeams(apiUser.data.teams, apiChars);
		localStorage.setItem(LS_NAME, JSON.stringify(decomp));
		value = decomp;
		//console.log({ apiUser, teamsFromApi: decomp });
	}
	return value;
};

export const setTeams = async (newValue) => {
	const lsValue = localStorage.getItem(LS_NAME);
	let value = clone(defaultValue);
	try {
		value = {
			...clone(defaultValue),
			...JSON.parse(lsValue),
			...newValue
		};
	} catch (e) {}

	const apiUser = await getUserFromAPI();
	const characters = await getCharacters();
	await updateUserFromAPI({
		...(apiUser?.data || {}),
		teams: compressTeams(value, characters)
		//characters: compressChars(characters)
	});

	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
