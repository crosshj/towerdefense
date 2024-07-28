/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/

import { getLevelInfo, getGrowth } from '../utils/experience.js';
import { calculateCoefficients } from './units/calculateStats.js';
import { unitsMapper } from './units/units.js';

const getMaxLevel = (unit) => {
	if (unit.rank === 1) {
		return 20 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 2) {
		return 30 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 3) {
		return 40 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 4) {
		return 50 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 5) {
		return 60 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 6) {
		return 80 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 7) {
		return 100 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 8) {
		return 120 + (unit.uncappedLevel || 0) * 5;
	}
	if (unit.rank === 9) {
		return 160 + (unit.uncappedLevel || 0) * 5;
	}
	return 0;
};

// health
const getHealth = (unit, currentLevel) => {
	if (typeof unit.hp === 'number') return unit.hp;
	const rankGrowth = calculateCoefficients(unit.rank, unit.hp);
	const val = getGrowth({
		...rankGrowth,
		level: currentLevel
	});
	return val;
};

// defense
const getDefense = (unit, currentLevel) => {
	if (!unit.defense) return 0;
	if (typeof unit.defense === 'number') return unit.defense;
	const rankGrowth = calculateCoefficients(unit.rank, unit.defense);
	const val = getGrowth({
		...rankGrowth,
		level: currentLevel
	});
	return val;
};
const getPhysicalDefense = (unit, currentLevel) => {
	return unit.defense || 0;
};
const getMagicDefense = (unit, currentLevel) => {
	return unit.defense || 0;
};

// attack
const getAttack = (unit, currentLevel) => {
	if (typeof unit.attack === 'number') return unit.attack;
	const rankGrowth = calculateCoefficients(unit.rank, unit.attack);
	const val = getGrowth({
		...rankGrowth,
		level: currentLevel
	});
	return val;
};
const getPhysicalAttack = (unit, currentLevel) => {
	return unit.attack;
};
const getMagicAttack = (unit, currentLevel) => {
	return unit.attack;
};

// speed
const getAttackSpeedText = (unit, currentLevel) => {
	return 'Normal';
};
const getMoveSpeedText = (unit, currentLevel) => {
	return 'Normal';
};
const getAttackSpeed = (unit, currentLevel) => {
	return 1;
};
const getMoveSpeed = (unit, currentLevel) => {
	return 1;
};

const withLevelInfo = (unit, totalExp = 0) => {
	let { currentLevel, expToNext, levelExpPercent } = getLevelInfo({
		totalExp,
		a: 5 * unit.rank,
		b: 6000
	});
	const uncappedLevel = 0; //TODO, this should be saved when combining units
	const maxLevel = getMaxLevel(unit);

	if (currentLevel > maxLevel) {
		currentLevel = maxLevel;
		expToNext = 0;
		levelExpPercent = 0;
	}

	return {
		...unit,
		stars: unit.rank,

		maxLevel,
		uncappedLevel,
		level: currentLevel || 1,
		levelNext: expToNext,
		levelNextPercent: levelExpPercent,

		professorPoints: 1, //TODO, this should be saved when combining units

		hp: getHealth(unit, currentLevel),
		attack: getAttack(unit, currentLevel),
		defense: getDefense(unit, currentLevel),

		attackSpeedText: getAttackSpeedText(unit, currentLevel),
		moveSpeedText: getMoveSpeedText(unit, currentLevel),

		// TODO: use these in-game
		physicalAttack: getAttack(unit, currentLevel),
		physicalDefense: getDefense(unit, currentLevel),
		magicAttack: getAttack(unit, currentLevel),
		magicDefense: getDefense(unit, currentLevel),
		attackSpeed: getAttackSpeed(unit, currentLevel),
		moveSpeed: getMoveSpeed(unit, currentLevel),

		// TODO: these things are needed by game, but not currently here
		critChance: 0.01,
		critMult: 2,
		move: 60,
		unit: unit.id
	};
};

const charMapper = unitsMapper({ withLevelInfo });

export const hydrateCharacters = async (playerCharacters) => {
	const hydrated = [];
	for (const char of playerCharacters) {
		const mapper = charMapper[char?.code];
		if (typeof mapper !== 'function') continue;
		hydrated.push(mapper(char));
	}
	return hydrated;
};
