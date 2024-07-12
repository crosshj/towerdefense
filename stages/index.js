const stageMap = {
	tropicalGraveyard1: './main/tropicalGraveyard1.js',
	sakura1: './main/sakura1.js',
	haunted1: './main/ghost1.js',
	water1: './main/ocean1.js',
	openField1: './main/field1.js'
};

export const getStage = async (params) => {
	const { zone, name: paramsName } = params;
	const name = zone || paramsName;
	const stagePath = stageMap[name] || stageMap[name + '1'];
	if (!stagePath) return;

	const stage = await import(stagePath);
	return stage.default;
};
