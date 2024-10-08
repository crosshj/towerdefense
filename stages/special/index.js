import { stageEnemies, stageTowers } from '../../$data/enemies.js';
import { getStageInfo } from '../../utils/stageInfo.js';

// TODO: get rid of this helper function if possible
const getInfo = async (args) => {
	const { stage, world, number } = args;
	const stageInfo = getStageInfo({
		stage,
		number,
		zone: world,
	});
	return stageInfo;
};

export const getRewards = async (args) => {
	const info = await getInfo(args);
	const rewards = {
		coins: info.coins,
		exp: info.experience,
		bonus: info.rewards.reduce((a, o) => ({ ...a, [o.id]: o }), {}),
	};
	return rewards;
};

export default async (args) => {
	const info = await getInfo(args);
	const towerData = stageTowers.special({ args, info });
	const enemyTeam = stageEnemies.special({ args, info }, towerData);

	//TODO: much of this is useless detail which should be abstracted
	return {
		state: {
			auto: undefined,
			throttle: 67,
			record: false,
			field: {
				height: 800,
				width: 4000,
			},
			sounds: {
				background: towerData.music,
			},
			stage: {
				background: towerData.background,
			},
			towers: [
				undefined,
				{
					type: 'defender',
					dims: [200, 343],
					x: towerData.x,
					color: towerData.color,
					hp: towerData.hp,
					deployed: [],
					team: enemyTeam,
					ai: 'enemyOne',
				},
			],
			tick: 0,
			missile: {
				charge: 100,
				chargeRate: 3,
			},
			mineral: {
				charge: 0, // level charge
				chargeRate: 20, // level charge rate
				level: 1,

				capacity: 170,
				amount: 77,
			},
		},
	};
};
