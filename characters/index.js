/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/

const charMapper = {
	'019079cf-cb56-7f47-f03-7ef27d': ({ experience }) => {
		return {
			id: '019079cf-cb56-7f47-f03-7ef27d',
			displayName: 'Macho',
			element: 'Fighting',
			level: 150,
			stars: 1,
			rank: 1,
			mineralCost: 100,
			hp: 3000,
			attack: 20,
			range: 450
		};
	},
	'019079cf-cb56-7f2b-f72-56f0fd': ({ experience }) => {
		return {
			id: '019079cf-cb56-7f2b-f72-56f0fd',
			displayName: 'Toto Bato',
			element: 'Rock',
			level: 120,
			stars: 2,
			rank: 2,
			mineralCost: 150,
			hp: 20000,
			attack: 15,
			range: 350
		};
	},
	'019079cf-cb56-74e4-310-d79f9e': ({ experience }) => {
		return {
			id: '019079cf-cb56-74e4-310-d79f9e',
			displayName: 'Twinkle',
			element: 'Fairy',
			level: 100,
			stars: 3,
			rank: 3,
			mineralCost: 250,
			hp: 4000,
			attack: 40,
			range: 800
		};
	},
	'019079cf-cb56-7d7b-469-3b4bb5': ({ experience }) => {
		return {
			id: '019079cf-cb56-7d7b-469-3b4bb5',
			displayName: 'Vispi',
			element: 'Air',
			level: 130,
			stars: 4,
			rank: 4,
			mineralCost: 350,
			hp: 6000,
			attack: 60,
			range: 600
		};
	},
	'019079cf-cb56-7211-2f3-2bc714': ({ experience }) => {
		return {
			id: '019079cf-cb56-7211-2f3-2bc714',
			displayName: 'Drat',
			element: 'Dragon',
			level: 135,
			stars: 5,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-76cd-ff8-6d0542': ({ experience }) => {
		return {
			id: '019079cf-cb56-76cd-ff8-6d0542',
			displayName: 'Antonio',
			element: 'Bug',
			level: 140,
			stars: 4,
			rank: 4,
			mineralCost: 500,
			hp: 6000,
			attack: 60,
			range: 600
		};
	},
	'019079cf-cb56-76c6-e56-7459e0': ({ experience }) => {
		return {
			id: '019079cf-cb56-76c6-e56-7459e0',
			displayName: 'Bumpier',
			element: 'Dark',
			level: 130,
			stars: 4,
			rank: 4,
			mineralCost: 550,
			hp: 6000,
			attack: 60,
			range: 600
		};
	},
	'019079cf-cb56-7b0b-ad4-36b3eb': ({ experience }) => {
		return {
			id: '019079cf-cb56-7b0b-ad4-36b3eb',
			displayName: 'Tabi-Tabi Po',
			element: 'Earth',
			level: 110,
			stars: 4,
			rank: 4,
			mineralCost: 600,
			hp: 6000,
			attack: 60,
			range: 600
		};
	},
	'019079cf-cb56-7020-725-206b2f': ({ experience }) => {
		return {
			id: '019079cf-cb56-7020-725-206b2f',
			displayName: 'Electopus',
			element: 'Electric',
			level: 160,
			stars: 5,
			rank: 5,
			mineralCost: 700,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7ea0-337-0ad0de': ({ experience }) => {
		return {
			id: '019079cf-cb56-7ea0-337-0ad0de',
			displayName: 'Santelmo',
			element: 'Fire',
			level: 170,
			stars: 5,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7777-53f-64e88d': ({ experience }) => {
		return {
			id: '019079cf-cb56-7777-53f-64e88d',
			displayName: 'Multo',
			element: 'Ghost',
			level: 180,
			stars: 5,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7a7f-741-8f5588': ({ experience }) => {
		return {
			id: '019079cf-cb56-7a7f-741-8f5588',
			displayName: 'Kelvin',
			element: 'Ice',
			level: 150,
			stars: 3,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7004-2bb-144d0e': ({ experience }) => {
		return {
			id: '019079cf-cb56-7004-2bb-144d0e',
			displayName: 'Blanko',
			element: 'Normal',
			level: 155,
			stars: 4,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-71dd-1d6-d8a311': ({ experience }) => {
		return {
			id: '019079cf-cb56-71dd-1d6-d8a311',
			displayName: 'Prickles',
			element: 'Plant',
			level: 140,
			stars: 2,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7358-a31-edf4b2': ({ experience }) => {
		return {
			id: '019079cf-cb56-7358-a31-edf4b2',
			displayName: 'Crack9',
			element: 'Poison',
			level: 145,
			stars: 2,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7661-466-8868c6': ({ experience }) => {
		return {
			id: '019079cf-cb56-7661-466-8868c6',
			displayName: 'Robia',
			element: 'Psychic',
			level: 150,
			stars: 5,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-71e2-738-b6d9c2': ({ experience }) => {
		return {
			id: '019079cf-cb56-71e2-738-b6d9c2',
			displayName: 'Barbell',
			element: 'Steel',
			level: 125,
			stars: 3,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	},
	'019079cf-cb56-7b4d-652-890dd9': ({ experience }) => {
		return {
			id: '019079cf-cb56-7b4d-652-890dd9',
			displayName: 'Wap Wap',
			element: 'Water',
			level: 160,
			stars: 4,
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
	}
};

export const hydrateCharacters = async (playerCharacters) => {
	const hydrated = [];
	for (const char of playerCharacters) {
		const mapper = charMapper[char?.id];
		if (typeof mapper !== 'function') continue;
		hydrated.push(mapper(char));
	}
	return hydrated;
};
