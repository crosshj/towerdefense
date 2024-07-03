import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_TEAMS';

/* prettier-ignore */
const defaultValue = {
	'Team 1': {
		a: [],
		b: []
	},
	'Team 2': {
		a: [],
		b: []
	},
	'Team 3': {
		a: [],
		b: []
	},
	'Team 4': {
		a: [],
		b: []
	},
	'Team 5': {
		a: [],
		b: []
	},
	'Defense': {
		a: [],
		b: []
	}
};

export const getTeams = async () => {
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

export const setTeams = async (newValue) => {
	const lsValue = localStorage.getItem(LS_NAME);
	let value = clone(defaultValue);
	try {
		value = JSON.parse(lsValue);
		value = {
			...value,
			...newValue
		};
	} catch (e) {}
	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
