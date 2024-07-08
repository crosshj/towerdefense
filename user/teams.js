import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_TEAMS';

/* prettier-ignore */
const defaultValue = {
	'Team 1': {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-74e4-310-d79f9e' },
			{ id: '019079cf-cb56-7d7b-469-3b4bb5' },
			{ id: '019079cf-cb56-7211-2f3-2bc714' },
		],
		b: [
			{ id: '019079cf-cb56-76cd-ff8-6d0542' },
			{ id: '019079cf-cb56-76c6-e56-7459e0' },
			{ id: '019079cf-cb56-7b0b-ad4-36b3eb' },
			{ id: '019079cf-cb56-7020-725-206b2f' },
			{ id: '019079cf-cb56-7ea0-337-0ad0de' },
		]
	},
	'Team 2': {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-74e4-310-d79f9e' },
			{ id: '019079cf-cb56-7d7b-469-3b4bb5' },
			{ id: '019079cf-cb56-7211-2f3-2bc714' },
		],
		b: [
			{ id: '019079cf-cb56-76cd-ff8-6d0542' },
			{ id: '019079cf-cb56-76c6-e56-7459e0' },
			{ id: '019079cf-cb56-7b0b-ad4-36b3eb' },
			{ id: '019079cf-cb56-7020-725-206b2f' },
			{ id: '019079cf-cb56-7ea0-337-0ad0de' },
		]
	},
	'Team 3': {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-74e4-310-d79f9e' },
			{ id: '019079cf-cb56-7d7b-469-3b4bb5' },
			{ id: '019079cf-cb56-7211-2f3-2bc714' },
		],
		b: [
			{ id: '019079cf-cb56-76cd-ff8-6d0542' },
			{ id: '019079cf-cb56-76c6-e56-7459e0' },
			{ id: '019079cf-cb56-7b0b-ad4-36b3eb' },
			{ id: '019079cf-cb56-7020-725-206b2f' },
			{ id: '019079cf-cb56-7ea0-337-0ad0de' },
		]
	},
	'Team 4': {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-74e4-310-d79f9e' },
			{ id: '019079cf-cb56-7d7b-469-3b4bb5' },
			{ id: '019079cf-cb56-7211-2f3-2bc714' },
		],
		b: [
			{ id: '019079cf-cb56-76cd-ff8-6d0542' },
			{ id: '019079cf-cb56-76c6-e56-7459e0' },
			{ id: '019079cf-cb56-7b0b-ad4-36b3eb' },
			{ id: '019079cf-cb56-7020-725-206b2f' },
			{ id: '019079cf-cb56-7ea0-337-0ad0de' },
		]
	},
	'Team 5': {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-74e4-310-d79f9e' },
			{ id: '019079cf-cb56-7d7b-469-3b4bb5' },
			{ id: '019079cf-cb56-7211-2f3-2bc714' },
		],
		b: [
			{ id: '019079cf-cb56-76cd-ff8-6d0542' },
			{ id: '019079cf-cb56-76c6-e56-7459e0' },
			{ id: '019079cf-cb56-7b0b-ad4-36b3eb' },
			{ id: '019079cf-cb56-7020-725-206b2f' },
			{ id: '019079cf-cb56-7ea0-337-0ad0de' },
		]
	},
	Defense: {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-74e4-310-d79f9e' },
			{ id: '019079cf-cb56-7d7b-469-3b4bb5' },
			{ id: '019079cf-cb56-7211-2f3-2bc714' },
		],
		b: [
			{ id: '019079cf-cb56-76cd-ff8-6d0542' },
			{ id: '019079cf-cb56-76c6-e56-7459e0' },
			{ id: '019079cf-cb56-7b0b-ad4-36b3eb' },
			{ id: '019079cf-cb56-7020-725-206b2f' },
			{ id: '019079cf-cb56-7ea0-337-0ad0de' },
		]
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
		value = {
			...clone(defaultValue),
			...JSON.parse(lsValue),
			...newValue
		};
	} catch (e) {}
	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
