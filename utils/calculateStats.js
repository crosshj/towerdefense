const rankToLevels = {
	1: [1, 20, 40],
	2: [1, 30, 50],
	3: [1, 40, 60],
	4: [1, 50, 70],
	5: [1, 60, 80],
	6: [],
	7: [],
	8: [],
	9: [],
};

const valuesFormat = (v) => {
	if (Array.isArray(v)) return v;
	return v.split('-').map((x) => Number(x.replaceAll(/,/g, '')));
};

export function getStatAtLevel(statString, rank, currentLevel) {
	const [level1, level2, level3] = rankToLevels[rank];
	const [stat1, stat2, stat3] = valuesFormat(statString);

	function linearInterpolation(x1, y1, x2, y2, x) {
		return y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
	}

	const value =
		currentLevel <= level2
			? linearInterpolation(
					level1,
					stat1,
					level2,
					stat2,
					currentLevel || 1
				)
			: linearInterpolation(level2, stat2, level3, stat3, currentLevel);
	return Math.floor(value);
}
