import { specialStage } from '../$data/stages.js';
import { specialRewards } from '../$data/drops.js';
import { materials as materialsInfo } from '../$data/materials.js';
import { unitsAll as unitsInfo } from '../$data/unitsAll.js';
import { getStageTracking } from '../user/stageTrack.js';

const stageInfoMap = {
	special: specialStage,
};

const stageRewardsMap = {
	special: specialRewards,
};

const MapReward = (InfoDef, type) => (item) => {
	const [id, probability = '1'] = item.split(':').map((x) => x.trim());
	if (!id) return;
	return {
		id,
		type,
		probability: parseFloat(probability),
		...(InfoDef[id] || {}),
	};
};

const getDrops = ({ stage, zone, number }) => {
	const rewardsDef = stageRewardsMap[stage]?.[zone];
	const materials = (rewardsDef?.material?.[Number(number) - 1] || '')
		.split(',')
		.map(MapReward(materialsInfo, 'material'))
		.filter((x) => x);
	const units = (rewardsDef?.unit?.[Number(number) - 1] || '')
		.split(',')
		.map(MapReward(unitsInfo, 'unit'))
		.filter((x) => x);
	return {
		coins: rewardsDef.coins?.[Number(number) - 1] || 2000,
		experience: rewardsDef.experience?.[Number(number) - 1] || {},
		rewards: [
			...materials,
			...units, //
		],
	};
};

export const getStageInfo = async ({ stage, zone, number }) => {
	const stageInfo = stageInfoMap[stage][zone];
	const { rewards, experience, coins } = getDrops({ stage, zone, number });

	const retries = stageInfo.maxTries || 5;
	const stageTracking = getStageTracking();
	const trackingKey = `${stage}_${zone}_${number}`;
	const retriesUsed = stageTracking.count[trackingKey] || 0;

	return {
		experience,
		coins,
		difficulty: stageInfo.difficulty || 'Normal',
		difficultyLevel: number,
		title: `${stageInfo.name} ${number}`,
		name: `${stageInfo.name} ${number}`,
		featherCost: Array.isArray(stageInfo.featherCost)
			? stageInfo.featherCost[number - 1]
			: undefined,
		rewards,
		retries,
		retriesLeft: retries - retriesUsed,
	};
};

export const getActiveStages = async ({ stage }) => {
	const stageInfo = stageInfoMap[stage];
	const active = [
		'event',
		'evolution',
		'wizard',
		'immortal', //
	]; //TODO: Implement this

	return active.map((id) => stageInfo[id]);
};
