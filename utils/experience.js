const rankToGrade = {
	1: 'normal',
	2: 'master',
	3: 'smaster',
	4: 'umaster',
	5: 'legend'
};
const friendlyGradName = {
	normal: 'Normal',
	master: 'Master',
	smaster: 'Super Master',
	umaster: 'Ultra Master',
	legend: 'Legend'
};

export function getGrowth({ base, level, linear, quadratic }) {
	if (!base || base === 0) {
		return 0;
	}
	return Math.floor(
		base + //
			linear * level +
			quadratic * level * level
	);
	// return Math.floor(base * Math.exp(growthRate * level));
}

export function getExpForLevel({ level, a, b, c }) {
	// quadratic progression common in many games
	// Coefficients
	// a, Quadratic coefficient (late levels)
	// b, Linear coefficient (mid levels)
	// c, Constant term (early levels)
	return a * (level * level) + b * level + c;
}

export function getLevelFromTotalExperience({ totalExp, a, b, c }) {
	if (totalExp <= c) {
		return 0;
	}
	// Using the quadratic formula to solve for level:
	// totalExp = a * level^2 + b * level + c
	// 0 = a * level^2 + b * level + (c - totalExp)
	// level = (-b + sqrt(b^2 - 4ac)) / 2a
	const discriminant = Math.sqrt(b * b - 4 * a * (c - totalExp));
	const level = Math.floor((-b + discriminant) / (2 * a));
	return level;
}

export function getLevelInfo({ totalExp, maxLevel, a = 5, b = 0, c = 0 }) {
	const level = getLevelFromTotalExperience({ totalExp, a, b, c });
	const expForCurrentLevel =
		level === 0 ? 0 : getExpForLevel({ level, a, b, c });
	const expForNextLevel = getExpForLevel({ level: level + 1, a, b, c });

	const remainderExp = totalExp - expForCurrentLevel;
	const expNeededForNextLevel = expForNextLevel - expForCurrentLevel;
	const percentageToNextLevel = (remainderExp / expNeededForNextLevel) * 100;

	if (maxLevel && level + 1 >= maxLevel) {
		return {
			level: maxLevel,
			expToNext: 0,
			expForNextLevel: getExpForLevel({ level: maxLevel - 1, a, b, c }),
			levelExpPercent: '0.00',
			levelExpPercent10: '0'
		};
	}

	return {
		totalExp,
		level: level + 1,
		currentLevel: level, //0 based
		expToNext: expNeededForNextLevel - remainderExp,
		expForNextLevel,
		levelExpPercent: percentageToNextLevel.toFixed(2),
		levelExpPercent10: Math.floor(percentageToNextLevel / 10) * 10
	};
}

/*
	to reach level 99:
	normal  ->   505,851,823
	master  -> 1,011,703,646
	smaster -> 1,517,555,469
	umaster -> 2,023,407,292    LR: 2,023,546,132
	legend  -> 2,529,259,115

	to reach level 2:
	normal  -> 160,753
	master  -> 321,506
	smaster -> 482,259
	umaster -> 643,012
	legend  -> 803,765
*/
export function getUserLevelInfo(totalExp, rank) {
	const levelInfo = getLevelInfo({
		totalExp,
		maxLevel: 99,
		a: 52111 * rank,
		b: 54321 * rank,
		c: 54321 * rank
	});
	const grade = rankToGrade[rank];
	return {
		grade,
		gradeFriendly: friendlyGradName[grade],
		...levelInfo
	};
}
