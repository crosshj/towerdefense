import { getUser } from '../../user/user.js';

export default async () => {
	const user = await getUser();

	const towerX = 200;
	const towerColor2 = '#934';

	const basicOppChar = {
		type: 'defender',
		hp: 3000,
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
			auto: user.auto,
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
