export const getRewards = async () => {
	return {
		coins: 4000,
		exp: {
			player: 48000,
			unit: 48000
		},
		bonus: {
			coin: { type: 'coin', probability: 1, amount: 5000 },
			meteor: { type: 'effect', probability: 0.5 },
			ice: { type: 'effect', probability: 0.5 },
			tornado: { type: 'effect', probability: 0.5 },
			invincible: { type: 'effect', probability: 0.5 },
			'u0001-4-boar': { type: 'char', probability: 0.4 },
			'u0001-3-rose': { type: 'char', probability: 0.3 }
		}
	};
};

export default async () => {
	const towerX = 200;
	const towerColor2 = '#934';

	const basicOppChar = {
		type: 'defender',
		hp: 6000,
		respawn: 40,
		range: 560,
		attack: 95,
		move: 40,
		x: towerX + 140,
		critChance: 0.1,
		critMult: 5
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
				background: 'asianSceneBackground'
			},
			stage: {
				background: 'backgroundSakura1'
			},
			towers: [
				undefined,
				{
					type: 'defender',
					dims: [200, 343],
					x: towerX,
					color: towerColor2,
					hp: 50000,
					deployed: [],
					team: [basicOppChar]
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
