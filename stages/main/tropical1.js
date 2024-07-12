import { getUser } from '../../user/user.js';

export const getRewards = async () => {
	return {
		coin: 4000,
		exp: {
			player: 6000,
			unit: 6000
		},
		bonus: {
			coin: { type: 'coin', probability: 1, amount: 5000 },
			meteor: { type: 'effect', probability: 0.9 },
			ice: { type: 'effect', probability: 0.9 },
			tornado: { type: 'effect', probability: 0.9 },
			invincible: { type: 'effect', probability: 0.9 },
			'019079cf-cb56-7358-a31-edf4b2': { type: 'char', probability: 0.3 },
			'019079cf-cb56-7f47-f03-7ef27d': { type: 'char', probability: 0.1 }
		}
	};
};

export default async () => {
	const user = await getUser();
	const towerX = 200;
	const towerColor2 = '#604050';

	const basicOppChar = {
		type: 'defender',
		hp: 3000,
		respawn: 118,
		range: 560,
		attack: 87,
		move: 60,
		x: towerX + 140,
		critChance: 0.01,
		critMult: 2
	};

	return {
		state: {
			auto: user.auto,
			throttle: 67,
			record: false,
			field: {
				height: 800,
				width: 4000
			},
			sounds: {
				background: 'tropicalShadowsBackground'
			},
			stage: {
				background: 'backgroundTropicalGraveyard1'
			},
			towers: [
				user.tower,
				{
					type: 'defender',
					dims: [200, 343],
					x: towerX,
					color: towerColor2,
					hp: 30000,
					deployed: [],
					team: [basicOppChar]
				}
			],
			tick: 0,

			// this stuff has to come from user
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
