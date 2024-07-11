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

const withLevelInfo = (unit, totalExp) => {
	const { currentLevel, expToNext, levelExpPercent } = getLevelInfo({
		totalExp,
		a: 5 * unit.rank
	});
	return {
		...unit,
		stars: unit.rank,
		level: currentLevel,
		levelNext: expToNext,
		levelNextPercent: levelExpPercent
	};
};

const charMapper = {
	'019079cf-cb56-7f47-f03-7ef27d': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7f47-f03-7ef27d',
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
	'019079cf-cb56-7f2b-f72-56f0fd': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7f2b-f72-56f0fd',
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
	'019079cf-cb56-74e4-310-d79f9e': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-74e4-310-d79f9e',
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
	'019079cf-cb56-7d7b-469-3b4bb5': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7d7b-469-3b4bb5',
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
	'019079cf-cb56-7211-2f3-2bc714': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7211-2f3-2bc714',
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
	'019079cf-cb56-76cd-ff8-6d0542': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-76cd-ff8-6d0542',
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
	'019079cf-cb56-76c6-e56-7459e0': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-76c6-e56-7459e0',
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
	'019079cf-cb56-7b0b-ad4-36b3eb': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7b0b-ad4-36b3eb',
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
	'019079cf-cb56-7020-725-206b2f': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7020-725-206b2f',
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
	'019079cf-cb56-7ea0-337-0ad0de': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7ea0-337-0ad0de',
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
	'019079cf-cb56-7777-53f-64e88d': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7777-53f-64e88d',
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
	'019079cf-cb56-7a7f-741-8f5588': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7a7f-741-8f5588',
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
	'019079cf-cb56-7004-2bb-144d0e': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7004-2bb-144d0e',
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
	'019079cf-cb56-71dd-1d6-d8a311': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-71dd-1d6-d8a311',
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
	'019079cf-cb56-7358-a31-edf4b2': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7358-a31-edf4b2',
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
	'019079cf-cb56-7661-466-8868c6': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7661-466-8868c6',
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
	'019079cf-cb56-71e2-738-b6d9c2': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-71e2-738-b6d9c2',
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
	'019079cf-cb56-7b4d-652-890dd9': ({ experience }) => {
		const unit = {
			id: '019079cf-cb56-7b4d-652-890dd9',
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
		const mapper = charMapper[char?.id];
		if (typeof mapper !== 'function') continue;
		hydrated.push(mapper(char));
	}
	return hydrated;
};
