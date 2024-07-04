import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_TEAMS';

/* prettier-ignore */
const defaultValue = {
	'Team 1': {
		a: [
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-7777-53f-64e88d' },
			{ id: '019079cf-cb56-71dd-1d6-d8a311' },
			{ id: '019079cf-cb56-7000-b9b-4b1e11' },
		],
		b: [
			{ id: "019079cf-cb56-7e80-856-904532" },
			{ id: "019079cf-cb56-7589-c23-ebf63f" },
			{ id: "019079cf-cb56-7ee1-f65-88f817" },
			{ id: "019079cf-cb56-77d7-db9-efc3da" },
			{ id: "019079cf-cb56-7ea0-337-0ad0de" },
		]
	},
	'Team 2': {
		a: [
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7777-53f-64e88d' },
			{ id: '019079cf-cb56-71dd-1d6-d8a311' },
			{ id: '019079cf-cb56-7000-b9b-4b1e11' },
		],
		b: [
			{ id: "019079cf-cb56-7589-c23-ebf63f" },
			{ id: "019079cf-cb56-7e80-856-904532" },
			{ id: "019079cf-cb56-7ee1-f65-88f817" },
			{ id: "019079cf-cb56-77d7-db9-efc3da" },
			{ id: "019079cf-cb56-7ea0-337-0ad0de" },
		]
	},
	'Team 3': {
		a: [
			{ id: '019079cf-cb56-7777-53f-64e88d' },
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-71dd-1d6-d8a311' },
			{ id: '019079cf-cb56-7000-b9b-4b1e11' },
		],
		b: [
			{ id: "019079cf-cb56-7ee1-f65-88f817" },
			{ id: "019079cf-cb56-7e80-856-904532" },
			{ id: "019079cf-cb56-7589-c23-ebf63f" },
			{ id: "019079cf-cb56-77d7-db9-efc3da" },
			{ id: "019079cf-cb56-7ea0-337-0ad0de" },
		]
	},
	'Team 4': {
		a: [
			{ id: '019079cf-cb56-71dd-1d6-d8a311' },
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-7777-53f-64e88d' },
			{ id: '019079cf-cb56-7000-b9b-4b1e11' },
		],
		b: [
			{ id: "019079cf-cb56-77d7-db9-efc3da" },
			{ id: "019079cf-cb56-7e80-856-904532" },
			{ id: "019079cf-cb56-7589-c23-ebf63f" },
			{ id: "019079cf-cb56-7ee1-f65-88f817" },
			{ id: "019079cf-cb56-7ea0-337-0ad0de" },
		]
	},
	'Team 5': {
		a: [
			{ id: '019079cf-cb56-7000-b9b-4b1e11' },
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
			{ id: '019079cf-cb56-7777-53f-64e88d' },
			{ id: '019079cf-cb56-71dd-1d6-d8a311' },
		],
		b: [
			{ id: "019079cf-cb56-7ea0-337-0ad0de" },
			{ id: "019079cf-cb56-7e80-856-904532" },
			{ id: "019079cf-cb56-7589-c23-ebf63f" },
			{ id: "019079cf-cb56-7ee1-f65-88f817" },
			{ id: "019079cf-cb56-77d7-db9-efc3da" },
		]
	},
	Defense: {
		a: [
			{ id: '019079cf-cb56-7000-b9b-4b1e11' },
			{ id: '019079cf-cb56-7777-53f-64e88d' },
			{ id: '019079cf-cb56-71dd-1d6-d8a311' },
			{ id: '019079cf-cb56-7f47-f03-7ef27d' },
			{ id: '019079cf-cb56-7f2b-f72-56f0fd' },
		],
		b: [
			{ id: "019079cf-cb56-77d7-db9-efc3da" },
			{ id: "019079cf-cb56-7e80-856-904532" },
			{ id: "019079cf-cb56-7ea0-337-0ad0de" },
			{ id: "019079cf-cb56-7ee1-f65-88f817" },
			{ id: "019079cf-cb56-7589-c23-ebf63f" },
		]
	}
};
[
	{
		id: '019079cf-cb56-7e80-856-904532'
	},
	{
		id: '019079cf-cb56-7589-c23-ebf63f'
	},
	{
		id: '019079cf-cb56-7ee1-f65-88f817'
	},
	{
		id: '019079cf-cb56-77d7-db9-efc3da'
	},
	{
		id: '019079cf-cb56-7ea0-337-0ad0de'
	}
];

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
