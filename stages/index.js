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

	//special stage
	event1: './special/event1.js',
	crimson1: './special/crimson1.js',
	evolution1: './special/evolution1.js',
	verdant1: './special/verdant1.js',
	moving1: './special/moving1.js',
	wizard1: './special/wizard1.js',
	immortal1: './special/immortal1.js',
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

	//special stage
	event1: 1,
	crimson1: 1,
	evolution1: 1,
	verdant1: 1,
	moving1: 1,
	wizard1: 1,
	immortal1: 1,
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
	if (!stagePath) {
		console.log('no stagePath', { params });
		return;
	}

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
