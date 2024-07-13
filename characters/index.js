/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/

import { getLevelInfo } from '../utils/experience.js';

/*
Example: https://rangers.lerico.net/en/ranger/u003u-bella

HP:           17,568 - 169,092 - 388,692

ATK per sec:  547 - 5,267 - 12,107

ATK:          1,368 - 13,167 - 30,267
Physical ATK: 1,368 - 13,167 - 30,267
Magical ATK:  0 - 0 - 0

DEF:          500 - 4,847 - 11,147
Physical DEF: 196 - 1,921 - 4,421
Magical DEF:  304 - 2,926 - 6,726

changes with level:
HP, Attack Speed, Attack, Defense

*/

const withLevelInfo = (unit, totalExp = 0) => {
	const { currentLevel, expToNext, levelExpPercent } = getLevelInfo({
		totalExp,
		a: 5 * unit.rank,
		b: 6000
	});
	return {
		...unit,
		stars: unit.rank,
		level: currentLevel || 1,
		levelNext: expToNext,
		levelNextPercent: levelExpPercent
	};
};

const charMapper = {
	'u0001-1-macho': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-1-macho',
			displayName: 'Macho',
			element: 'Fighting',
			rank: 1,
			mineralCost: 100,
			hp: 3000,
			attack: 20,
			range: 450
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-2-toto': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-2-toto',
			displayName: 'Toto Bato',
			element: 'Rock',
			rank: 2,
			mineralCost: 150,
			hp: 20000,
			attack: 15,
			range: 350
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-3-twinkle': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-3-twinkle',
			displayName: 'Twinkle',
			element: 'Fairy',
			rank: 3,
			mineralCost: 250,
			hp: 4000,
			attack: 40,
			range: 800
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-4-vispi': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-4-vispi',
			displayName: 'Vispi',
			element: 'Air',
			rank: 4,
			mineralCost: 350,
			hp: 6000,
			attack: 60,
			range: 600
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-drat': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-drat',
			displayName: 'Drat',
			element: 'Dragon',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-4-antonio': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-4-antonio',
			displayName: 'Antonio',
			element: 'Bug',
			rank: 4,
			mineralCost: 500,
			hp: 6000,
			attack: 60,
			range: 600
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-4-bumpier': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-4-bumpier',
			displayName: 'Bumpier',
			element: 'Dark',
			rank: 4,
			mineralCost: 550,
			hp: 6000,
			attack: 60,
			range: 600
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-4-tabi': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-4-tabi',
			displayName: 'Tabi-Tabi Po',
			element: 'Earth',
			rank: 4,
			mineralCost: 600,
			hp: 6000,
			attack: 60,
			range: 600
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-electopus': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-electopus',
			displayName: 'Electopus',
			element: 'Electric',
			rank: 5,
			mineralCost: 700,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-santelmo': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-santelmo',
			displayName: 'Santelmo',
			element: 'Fire',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-multo': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-multo',
			displayName: 'Multo',
			element: 'Ghost',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-kelvin': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-kelvin',
			displayName: 'Kelvin',
			element: 'Ice',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-blanko': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-blanko',
			displayName: 'Blanko',
			element: 'Normal',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-prickles': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-prickles',
			displayName: 'Prickles',
			element: 'Plant',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-crack9': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-crack9',
			displayName: 'Crack9',
			element: 'Poison',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-robia': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-robia',
			displayName: 'Robia',
			element: 'Psychic',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-barbell': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-barbell',
			displayName: 'Barbell',
			element: 'Steel',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	},
	'u0001-5-wap': ({ experience, id }) => {
		const unit = {
			id,
			code: 'u0001-5-wap',
			displayName: 'Wap Wap',
			element: 'Water',
			rank: 5,
			mineralCost: 450,
			hp: 7000,
			attack: 80,
			range: 1000
		};
		return withLevelInfo(unit, experience);
	}
};

export const hydrateCharacters = async (playerCharacters) => {
	const hydrated = [];
	for (const char of playerCharacters) {
		const mapper = charMapper[char?.code];
		if (typeof mapper !== 'function') continue;
		hydrated.push(mapper(char));
	}
	return hydrated;
};
