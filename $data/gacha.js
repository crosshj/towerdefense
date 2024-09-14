const drops = {
	// units
	'units-ultra-rare': [
		{ code: 'u0001-4-commando1', probability: 1 },
		{ code: 'u0001-4-commando2', probability: 1 },
		{ code: 'u0001-4-commando3', probability: 1 },
		{ code: 'u0001-4-commando4', probability: 1 },
		{ code: 'u0001-4-commando5', probability: 1 },
		{ code: 'u0001-4-cupcake', probability: 0.1 },
		{ code: 'u0001-5-cane', probability: 0.1 },
	],
	'units-rare': [
		{ code: 'u0001-4-commando1', probability: 1 },
		{ code: 'u0001-4-commando2', probability: 1 },
		{ code: 'u0001-4-commando3', probability: 1 },
		{ code: 'u0001-4-commando4', probability: 1 },
		{ code: 'u0001-4-commando5', probability: 1 },
		{ code: 'u0001-4-cupcake', probability: 0.1 },
		{ code: 'u0001-5-cane', probability: 0.1 },
	],
	'units-common': [
		{ code: 'u0001-4-commando1', probability: 1 },
		{ code: 'u0001-4-commando2', probability: 1 },
		{ code: 'u0001-4-commando3', probability: 1 },
		{ code: 'u0001-4-commando4', probability: 1 },
		{ code: 'u0001-4-commando5', probability: 1 },
		{ code: 'u0001-4-cupcake', probability: 0.1 },
		{ code: 'u0001-5-cane', probability: 0.1 },
	],
	// gear
	'gear-special': [
		{ code: 'eq_wpn_0001', probability: 1 },
		{ code: 'eq_acc_0101', probability: 1 },
		{ code: 'eq_amr_0061', probability: 1 },
	],
	'gear-rare': [
		{ code: 'eq_wpn_0001', probability: 1 },
		{ code: 'eq_acc_0101', probability: 1 },
		{ code: 'eq_amr_0061', probability: 1 },
	],
	'gear-normal': [
		{ code: 'eq_wpn_0001', probability: 1 },
		{ code: 'eq_acc_0101', probability: 0.2 },
		{ code: 'eq_amr_0061', probability: 0.3 },
	],
};

export const getCurrentGacha = async () => {
	return {
		drops,
		units: [
			{
				id: 'units-ultra-rare',
				thumb: '/assets/gacha/units1.thumb.svg',
				image: '/assets/gacha/units1.svg',
				imageBg: 'linear-gradient(180deg, blue, red)',
				options: [
					{ type: 'ticket', pulls: '1', cost: '5' },
					{ type: 'ruby', pulls: '6+1', cost: '300' },
				],
			},
			{
				id: 'units-rare',
				thumb: '/assets/gacha/units2.thumb.svg',
				image: '/assets/gacha/units2.svg',
				imageBg: 'linear-gradient(180deg, yellow, brown)',
				options: [
					{ type: 'ticket', pulls: '1', cost: '5' },
					{ type: 'ruby', pulls: '6+1', cost: '300' },
				],
			},
			{
				id: 'units-common',
				thumb: '/assets/gacha/units3.thumb.svg',
				image: '/assets/gacha/units3.svg',
				imageBg: 'linear-gradient(180deg, green, #4F4)',
				options: [
					{ type: 'ticket', pulls: '1', cost: '5' },
					{ type: 'ruby', pulls: '6+1', cost: '300' },
				],
			},
			// {
			// 	type: 'purple',
			// 	thumb: '/assets/gacha/units4.thumb.svg',
			// 	image: '/assets/gacha/units4.svg',
			// 	imageBg: 'linear-gradient(180deg, purple, white)',
			// },
			// {
			// 	type: 'yellow',
			// 	thumb: '/assets/gacha/units5.thumb.svg',
			// 	image: '/assets/gacha/units5.svg',
			// 	imageBg: 'linear-gradient(180deg, aqua, teal)',
			// },
		],
		gear: [
			{
				id: 'gear-special',
				name: 'SPECIAL',
				thumb: '/assets/gacha/gear1.thumb.svg',
				image: '/assets/gacha/gear1.svg',
				imageBg: 'linear-gradient(180deg, blue, red)',
				options: [
					{ type: 'ruby', pulls: '1', cost: '40' },
					{ type: 'ruby', pulls: '5+1', cost: '200' },
				],
			},
			{
				id: 'gear-rare',
				name: 'RARE',
				thumb: '/assets/gacha/gear2.thumb.svg',
				image: '/assets/gacha/gear2.svg',
				imageBg: 'linear-gradient(180deg, yellow, brown)',
				options: [
					{ type: 'ticket', pulls: '1', cost: '5' },
					{ type: 'ruby', pulls: '6+1', cost: '300' },
				],
			},
			{
				id: 'gear-normal',
				name: 'NORMAL',
				thumb: '/assets/gacha/gear3.thumb.svg',
				image: '/assets/gacha/gear3.svg',
				imageBg: 'linear-gradient(180deg, green, #4F4)',
				options: [
					{ type: 'ticket', pulls: '1', cost: '5' },
					{ type: 'ruby', pulls: '6+1', cost: '300' },
				],
			},
			// {
			// 	type: 'purple',
			// 	thumb: '/assets/gacha/gear4.thumb.svg',
			// 	image: '/assets/gacha/gear4.svg',
			// 	imageBg: 'linear-gradient(180deg, purple, white)',
			// },
			// {
			// 	type: 'yellow',
			// 	thumb: '/assets/gacha/gear5.thumb.svg',
			// 	image: '/assets/gacha/gear5.svg',
			// 	imageBg: 'linear-gradient(180deg, aqua, teal)',
			// },
		],
	};
};
