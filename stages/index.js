const stageMap = {
	openField1: './main/field1.js',
	forest1: './main/forest1.js',
	water1: './main/water1.js',
	sakura1: './main/sakura1.js',
	highlands1: './main/highlands1.js',
	tropical1: './main/tropical1.js',
	oasis1: './main/oasis1.js',
	tundra1: './main/tundra1.js',
	industrial1: './main/industrial1.js',
	pantheon1: './main/pantheon1.js',
	friendBattle1: './pvp/friendBattle1.js',
};

export const featherCost = {
	field1: 1,
	forest1: 1,
	water1: 1,
	sakura1: 2,
	highlands1: 2,
	tropical1: 2,
	oasis1: 3,
	tundra1: 3,
	industrial1: 3,
	pantheon1: 4,
	friendBattle: 1, //TODO: specialFeathers!
};

export const getStage = async (params) => {
	const { zone, name: paramsName } = params;
	const name = zone || paramsName;
	const stagePath = stageMap[name] || stageMap[name + '1'];
	if (!stagePath) return;

	const stage = await import(stagePath);
	return stage.default;
};

export const getStageInfo = async (params) => {
	const { zone, name: paramsName } = params;
	const name = zone || paramsName;
	const stagePath = stageMap[name] || stageMap[name + '1'];
	if (!stagePath) return;

	const stage = await import(stagePath);
	const { state } = await stage.default();
	return {
		featherCost: featherCost[name] || featherCost[name + '1'],
		...state,
	};
};

function pickRandom(items = {}) {
	const randomValue = Math.random();
	const sortedEntries = Object.entries(items).sort(
		(a, b) => a[1].probability - b[1].probability
	);
	let matchingProb;
	for (const [key, value] of sortedEntries) {
		if (randomValue < value.probability) {
			matchingProb = value.probability;
			break;
		}
	}
	const matchingItems = sortedEntries.filter(
		(x) => x[1].probability === matchingProb
	);
	if (matchingItems.length > 0) {
		const randomIndex = Math.floor(Math.random() * matchingItems.length);
		const [key, value] = matchingItems[randomIndex];
		return { key, ...value };
	}
	return;
}

export const getPotentialStageRewards = async (params) => {
	const { zone, name: paramsName } = params;
	const name = zone || paramsName;
	const stagePath = stageMap[name] || stageMap[name + '1'];
	if (!stagePath) return;

	const stage = await import(stagePath);
	const rewards = await stage.getRewards();

	return rewards;
};

export const getStageRewards = async (params) => {
	const rewards = await getPotentialStageRewards(params);
	if (!rewards) return;
	rewards.bonus = pickRandom(rewards.bonus);
	return rewards;
};
