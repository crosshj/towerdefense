import { stageCharacterDrops, stageExperience } from '../../$data/drops.js';
import { stageEnemies, stageTowers } from '../../$data/enemies.js';

export const getRewards = async () => {
	return {
		coins: 4000,
		exp: stageExperience.tundra1(),
		bonus: {
			coin: { type: 'coin', probability: 1, amount: 5000 },
			meteor: { type: 'effect', probability: 0.5 },
			ice: { type: 'effect', probability: 0.5 },
			tornado: { type: 'effect', probability: 0.5 },
			invincible: { type: 'effect', probability: 0.5 },
			...stageCharacterDrops.tundra1
		}
	};
};

export default async () => {
	const towerX = 200;
	const towerData = stageTowers.tundra1();
	const enemyTeam = stageEnemies.tundra1({ towerX });

	return {
		state: {
			auto: undefined,
			throttle: 67,
			record: false,
			field: {
				height: 800,
				width: 4000
			},
			sounds: {
				background: towerData.music
			},
			stage: {
				background: towerData.background
			},
			towers: [
				undefined,
				{
					type: 'defender',
					dims: [200, 343],
					x: towerX,
					color: towerData.color,
					hp: towerData.hp,
					deployed: [],
					team: enemyTeam
				}
			],
			tick: 0,
			missile: {
				charge: 100,
				chargeRate: 3
			},
			mineral: {
				charge: 0, // level charge
				chargeRate: 20, // level charge rate
				level: 1,

				capacity: 170,
				amount: 77
			}
		}
	};
};
