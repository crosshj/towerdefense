import { hydrateCharacters } from '../../characters/index.js';
import { getOpponentTeamCache } from '../../pages/_utils/cache.js';

// TODO: no rewards for friend battle?
export const getRewards = async () => {
	return {
		coins: 4000,
		exp: {
			player: 12000,
			unit: 12000
		},
		bonus: {
			coin: { type: 'coin', probability: 1, amount: 5000 },
			meteor: { type: 'effect', probability: 0.5 },
			ice: { type: 'effect', probability: 0.5 },
			tornado: { type: 'effect', probability: 0.5 },
			invincible: { type: 'effect', probability: 0.5 }
		}
	};
};

export default async () => {
	const towerX = 200;
	const towerColor2 = '#934';

	const opponent = getOpponentTeamCache();
	const opponentChars = [...opponent.defense.a, ...opponent.defense.b];

	const hydrated = await hydrateCharacters(opponentChars);

	for (const defenderChar of hydrated) {
		defenderChar.type = 'defender';
		defenderChar.x = towerX + 140;
		defenderChar.respawn = 999999;
		defenderChar.spawnTicker = 999999;
	}

	const opponentTower = {
		type: 'defender',
		dims: [200, 343],
		x: towerX,
		color: towerColor2,
		hp: 120000,
		deployed: [],
		team: hydrated
	};

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
				background: 'sunnyFieldBackground'
			},
			stage: {
				background: 'backgroundIndustrial1'
			},
			towers: [undefined, opponentTower],
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
