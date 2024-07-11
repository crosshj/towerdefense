export function getExpForLevel({ level, a, b, c }) {
	// quadratic progression common in many games
	// Coefficients
	// a, Quadratic coefficient (late levels)
	// b, Linear coefficient (mid levels)
	// c, Constant term (early levels)
	return a * (level * level) + b * level + c;
}

export function getLevelFromTotalExperience({ totalExp, a, b, c }) {
	// Using the quadratic formula to solve for level:
	// totalExp = a * level^2 + b * level + c
	// 0 = a * level^2 + b * level + (c - totalExp)
	// level = (-b + sqrt(b^2 - 4ac)) / 2a
	const discriminant = Math.sqrt(b * b - 4 * a * (c - totalExp));
	const level = Math.floor((-b + discriminant) / (2 * a));
	return level;
}

export function getLevelInfo({ totalExp, a = 5, b = 0, c = 0 }) {
	const level = getLevelFromTotalExperience({ totalExp, a, b, c });
	const expForCurrentLevel = getExpForLevel({ level, a, b, c });
	const expForNextLevel = getExpForLevel({ level: level + 1, a, b, c });

	const remainderExp = totalExp - expForCurrentLevel;
	const expNeededForNextLevel = expForNextLevel - expForCurrentLevel;
	const percentageToNextLevel = (remainderExp / expNeededForNextLevel) * 100;

	return {
		currentLevel: level,
		expToNext: expNeededForNextLevel - remainderExp,
		levelExpPercent: percentageToNextLevel.toFixed(2)
	};
}
