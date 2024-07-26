const animations = [
	{ code: 'idle', displayName: 'Idle' },
	{ code: 'jumping', displayName: 'Jumping' },
	{ code: 'sprite_swap', displayName: 'Swapping 1' },
	{ code: 'sprite_swap2', displayName: 'Swapping 2' }
];

const allUnits = {
	'u0001-1-macho': {
		displayName: 'Macho',
		element: 'Fighting',
		type: 'Agility',
		rank: 1,
		mineralCost: 100,
		hp: 3000,
		attack: 20,
		range: 1000
	},
	'u0001-2-toto': {
		displayName: 'Toto Bato',
		element: 'Rock',
		type: 'Strength',
		rank: 2,
		mineralCost: 150,
		hp: 20000,
		attack: 15,
		range: 350
	},
	'u0001-3-twinkle': {
		displayName: 'Twinkle',
		element: 'Fairy',
		type: 'Intelligence',
		rank: 3,
		mineralCost: 250,
		hp: 4000,
		attack: 40,
		range: 800
	},
	'u0001-4-vispi': {
		displayName: 'Vispi',
		element: 'Air',
		type: 'Agility',
		rank: 4,
		mineralCost: 350,
		hp: 6000,
		attack: 100,
		range: 500
	},
	'u0001-5-drat': {
		displayName: 'Drat',
		element: 'Dragon',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-4-antonio': {
		displayName: 'Antonio',
		element: 'Bug',
		type: 'Agility',
		rank: 4,
		mineralCost: 500,
		hp: 6000,
		attack: 60,
		range: 600
	},
	'u0001-4-bumpier': {
		displayName: 'Bumpier',
		element: 'Dark',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 550,
		hp: 6000,
		attack: 60,
		range: 600
	},
	'u0001-4-tabi': {
		displayName: 'Tabi-Tabi Po',
		element: 'Earth',
		type: 'Agility',
		rank: 4,
		mineralCost: 600,
		hp: 6000,
		attack: 60,
		range: 600
	},
	'u0001-5-electopus': {
		displayName: 'Electopus',
		element: 'Electric',
		type: 'Agility',
		rank: 5,
		mineralCost: 700,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-santelmo': {
		displayName: 'Santelmo',
		element: 'Fire',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-multo': {
		displayName: 'Multo',
		element: 'Ghost',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-kelvin': {
		displayName: 'Kelvin',
		element: 'Ice',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-blanko': {
		displayName: 'Blanko',
		element: 'Normal',
		type: 'Strength',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-prickles': {
		displayName: 'Prickles',
		element: 'Plant',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-crack9': {
		displayName: 'Bumba',
		element: 'Poison',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-robia': {
		displayName: 'Robia',
		element: 'Psychic',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-barbell': {
		displayName: 'Barbell',
		element: 'Steel',
		type: 'Strength',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-5-wap': {
		displayName: 'Wap Wap',
		element: 'Water',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	'u0001-4-watashi': {
		displayName: 'Openhyman',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		hp: 20000,
		attack: 15,
		range: 400
	},
	'u0001-1-benny': {
		displayName: 'Benny Lava',
		element: 'Fire',
		type: 'Agility',
		rank: 1,
		mineralCost: 100,
		hp: 20000,
		attack: 100,
		range: 700
	},
	'u0001-4-slabb': {
		displayName: 'Slabb',
		element: 'Poison',
		type: 'Strength',
		rank: 4,
		mineralCost: 200,
		hp: 30000,
		attack: 100,
		range: 625
	},
	'u0001-4-crimson': {
		displayName: 'Crimson',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		hp: 40000,
		attack: 300,
		range: 425
	},
	'u0001-4-violet': {
		displayName: 'Violet',
		element: 'Psychic',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 150,
		hp: 20000,
		attack: 200,
		range: 1000
	},
	'u0001-3-rose': {
		displayName: 'Rose',
		element: 'Plant',
		type: 'Agility',
		rank: 3,
		mineralCost: 150,
		hp: 25000,
		attack: 250,
		range: 800
	}
};

export const listAvailableUnits = () => {
	return Object.entries(allUnits).map(([code, v]) => ({ code, ...v }));
};

export const listAvailableAnimations = () => {
	return animations;
};

export const unitsMapper = ({ withLevelInfo }) => {
	const mapped = {};
	for (const [key, value] of Object.entries(allUnits)) {
		mapped[key] = ({ experience, id }) => {
			const withId = {
				id,
				code: key,
				...value
			};
			return withLevelInfo(withId, experience);
		};
	}
	return mapped;
};
