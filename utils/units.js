import { calculateCoefficients } from './calculateStats.js';
import { getExpForLevel, getGrowth, getLevelInfo } from './experience.js';
import { unitsAll } from '/$data/unitsAll.js';

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
		level: currentLevel,
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
		level: currentLevel,
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
		level: currentLevel,
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

export const withLevelInfo = (unit, totalExp = 0) => {
	let { currentLevel, expToNext, levelExpPercent } = getLevelInfo({
		totalExp,
		a: 5 * unit.rank,
		b: 6000,
	});
	const uncappedLevel = Math.min(4, unit.uncappedLevel || 0); //TODO, this should be saved when combining units
	const maxLevel = getMaxLevel(unit);

	if (currentLevel > maxLevel) {
		currentLevel = maxLevel;
		expToNext = 0;
		levelExpPercent = 0;
	}

	const levelExp = getExpForLevel({
		level: currentLevel,
		a: 5 * unit.rank,
		b: 6000,
		c: 0,
	});

	const _withLevel = {
		...unit,
		stars: unit.rank,

		maxLevel,
		uncappedLevel,
		level: currentLevel || 1,
		levelNext: expToNext,
		levelNextPercent: levelExpPercent,
		levelExp,

		professorPoints: Math.max(unit.professorPoints || 0, 1),

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
		unit: unit.id,
	};
	const somethingNotRight = ['hp', 'attack', 'defense'].some(
		(prop) => _withLevel[prop] < 0
	);
	if (somethingNotRight) {
		console.warn({ _: 'somethingNotRight', _withLevel });
	}
	return _withLevel;
};

export const unitsMapper = () => {
	const mapped = {};
	for (const [key, value] of Object.entries(unitsAll)) {
		mapped[key] = (thisUnit) => {
			const { experience, uncappedLevel = 0, id } = thisUnit;
			const withId = {
				...thisUnit,
				id,
				code: key,
				uncappedLevel,
				...value,
			};
			return withLevelInfo(withId, experience);
		};
	}
	return mapped;
};

const charMapper = unitsMapper();

export const hydrateCharacters = async (playerCharacters) => {
	const hydrated = [];
	for (const char of playerCharacters) {
		const mapper = charMapper[char?.code];
		if (typeof mapper !== 'function') continue;
		hydrated.push(mapper(char));
	}
	return hydrated;
};

const getExperienceFromLevel = (unit) => {
	return getExpForLevel({
		level: unit.level,
		a: 5 * unit.rank,
		b: 6000,
		c: 0,
	});
};

export const extractCharacter = (unit) => {
	const levelExp = getExperienceFromLevel(unit);
	const experience = Math.floor(0.1 * levelExp + 4000 * (unit.rank || 1));
	return {
		experience,
	};
};

export const calculateCombineResults = ({ currentChar, materials }) => {
	const result = { level: '?', levelNextPercent: '?', professorPoints: '?' };
	if (!materials.length) {
		return result;
	}
	let { levelExp } = withLevelInfo(currentChar, currentChar.experience);
	let currentProfPoints = currentChar.professorPoints || 1;
	let currentUncapped = currentChar.uncappedLevel;
	let currentExperience =
		(currentChar.levelNext === 0 ? levelExp : currentChar.experience) || 0;

	for (const mat of materials) {
		if (!mat) continue;
		if (mat.code === currentChar.code) {
			currentProfPoints += mat?.professorPoints || 1;
			result.professorPoints = currentProfPoints;
			currentUncapped++;
		}
		const extracted = extractCharacter(mat);
		currentExperience += extracted.experience;
	}
	if (currentUncapped > 4) {
		currentUncapped = 4;
	}
	const isHyperUltra = false; //TODO: how to detrmine if H/U ?
	if (currentProfPoints > 10 && !isHyperUltra) {
		currentProfPoints = 10;
		result.professorPoints = 10;
	}
	const newChar = withLevelInfo(
		{
			...currentChar,
			uncappedLevel: currentUncapped,
		},
		currentExperience
	);

	result.level = newChar.level;
	result.levelNextPercent = newChar.levelNextPercent;

	result.newExperience = currentExperience;
	result.newProfessorPoints = currentProfPoints;
	result.newUncapped = currentUncapped;

	return result;
};

export const calculateSellValue = async (unitIds) => {
	//TODO: this calculation is a basic and wrong placeholder!
	return unitIds.length * 200;
};

const animations = [
	{ code: 'idle', displayName: 'Idle' },
	{ code: 'jumping', displayName: 'Jumping' },
	{ code: 'sprite_swap', displayName: 'Swapping 1' },
	{ code: 'sprite_swap2', displayName: 'Swapping 2' },
];

export const listAvailableUnits = () => {
	return Object.entries(unitsAll)
		.map(([code, v]) => ({ code, ...v }))
		.filter((x) => x.isInGame !== false);
};

export const listAvailableAnimations = () => {
	return animations;
};
