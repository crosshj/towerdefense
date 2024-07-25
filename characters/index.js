/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/

import { getLevelInfo } from '../utils/experience.js';
import { unitsMapper } from './units/units.js';

const getHealth = (unit, totalExp) => {
	return unit.hp;
};

const getMaxLevel = (unit) => {
	//TODO: also look at unit.uncappedLevel
	if (unit.rank === 1) {
		return 20;
	}
	if (unit.rank === 2) {
		return 30;
	}
	if (unit.rank === 3) {
		return 40;
	}
	if (unit.rank === 4) {
		return 50;
	}
	if (unit.rank === 5) {
		return 60;
	}
	if (unit.rank === 6) {
		return 80;
	}
	if (unit.rank === 7) {
		return 100;
	}
	if (unit.rank === 8) {
		return 120;
	}
	if (unit.rank === 9) {
		return 160;
	}
	return 0;
};

// defense
const getDefense = (unit, totalExp) => {
	return unit.defense || 0;
};
const getPhysicalDefense = (unit, totalExp) => {
	return unit.defense || 0;
};
const getMagicDefense = (unit, totalExp) => {
	return unit.defense || 0;
};

// attack
const getAttack = (unit, totalExp) => {
	return unit.attack;
};
const getPhysicalAttack = (unit, totalExp) => {
	return unit.attack;
};
const getMagicAttack = (unit, totalExp) => {
	return unit.attack;
};

// speed
const getAttackSpeedText = (unit, totalExp) => {
	return 'Normal';
};
const getMoveSpeedText = (unit, totalExp) => {
	return 'Normal';
};
const getAttackSpeed = (unit, totalExp) => {
	return 1;
};
const getMoveSpeed = (unit, totalExp) => {
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

		hp: getHealth(unit, totalExp),
		attack: getAttack(unit, totalExp),
		defense: getDefense(unit, totalExp),

		attackSpeedText: getAttackSpeedText(unit, totalExp),
		moveSpeedText: getMoveSpeedText(unit, totalExp),

		// TODO: use these in-game
		physicalAttack: getAttack(unit, totalExp),
		physicalDefense: getDefense(unit, totalExp),
		magicAttack: getAttack(unit, totalExp),
		magicDefense: getDefense(unit, totalExp),
		attackSpeed: getAttackSpeed(unit, totalExp),
		moveSpeed: getMoveSpeed(unit, totalExp),

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
