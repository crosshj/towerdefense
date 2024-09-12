export const getCurrentGacha = async () => {
	return {
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
				id: 'gear-ultra-rare',
				name: 'ULTRA RARE',
				thumb: '/assets/gacha/gear1.thumb.svg',
				image: '/assets/gacha/gear1.svg',
				imageBg: 'linear-gradient(180deg, blue, red)',
				options: [
					{ type: 'ticket', pulls: '1', cost: '5' },
					{ type: 'ruby', pulls: '6+1', cost: '300' },
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
				id: 'gear-common',
				name: 'COMMON',
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
