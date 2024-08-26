import { getUserLevelInfo } from '../utils/experience.js';

async function generateExpDataForRank(rank) {
	const expData = [];
	let totalExp = 0;
	while (expData.length < 99) {
		const { level } = getUserLevelInfo(totalExp, rank);
		if (!expData[level - 1]) {
			expData[level - 1] = totalExp;
		}
		totalExp += 100;
	}
	return expData;
}

onmessage = async function (e) {
	const { rank } = e.data;
	const expData = await generateExpDataForRank(rank);
	postMessage({ rank, expData });
};
