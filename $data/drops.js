const K = 1000;

export const stageExperience = {
	field1: () => ({ player: 12000, unit: 12000 }),
	forest1: () => ({ player: 20000, unit: 20000 }),
	water1: () => ({ player: 25000, unit: 25000 }),
	sakura1: () => ({ player: 30000, unit: 30000 }),
	highlands1: () => ({ player: 35000, unit: 35000 }),
	tropical1: () => ({ player: 45000, unit: 45000 }),
	oasis1: () => ({ player: 50000, unit: 50000 }),
	tundra1: () => ({ player: 70000, unit: 70000 }),
	industrial1: () => ({ player: 85000, unit: 85000 }),
	pantheon1: () => ({ player: 96000, unit: 96000 }),
};

export const stageCharacterDrops = {
	// meadow: normal, bug, flying(air)
	field1: {
		'u0001-5-blanko': { type: 'char', probability: 0.3 },
		'u0001-4-vispi': { type: 'char', probability: 0.3 },
		'u0001-4-aynstine': { type: 'char', probability: 0.3 },
	},
	// grass, bug, normal
	forest1: {
		'u0001-4-antonio': { type: 'char', probability: 0.3 },
		'u0001-5-prickles': { type: 'char', probability: 0.3 },
		'u0001-4-openhyman': { type: 'char', probability: 0.3 },
	},
	// coastal: water, normal, flying(air)
	water1: {
		'u0001-5-wap': { type: 'char', probability: 0.3 },
		'u0001-3-arcus': { type: 'char', probability: 0.3 },
		'u0001-4-pineman': { type: 'char', probability: 0.3 },
		'u0001-2-tom': { type: 'char', probability: 0.3 },
	},
	// grass, fighting, dragon, normal
	sakura1: {
		'u0001-1-macho': { type: 'char', probability: 0.3 },
		'u0001-4-boar': { type: 'char', probability: 0.3 },
		'u0001-5-popo': { type: 'char', probability: 0.3 },
	},
	// rock, ground, fighting
	highlands1: {
		'u0001-4-tabi': { type: 'char', probability: 0.3 },
		'u0001-2-toto': { type: 'char', probability: 0.3 },
		'u0001-4-liz': { type: 'char', probability: 0.3 },
		'u0001-4-aries': { type: 'char', probability: 0.3 },
	},
	// tropical graveyard: ghost, dark, grass
	tropical1: {
		'u0001-5-multo': { type: 'char', probability: 0.3 },
		'u0001-4-bumpier': { type: 'char', probability: 0.3 },
		'u0001-3-corpus': { type: 'char', probability: 0.3 },
	},
	// thunder oasis: electric, ground, rock, fire
	oasis1: {
		'u0001-5-electopus': { type: 'char', probability: 0.3 },
		'u0001-5-santelmo': { type: 'char', probability: 0.3 },
		'u0001-1-benny': { type: 'char', probability: 0.3 },
	},
	// ice, water, ground
	tundra1: {
		'u0001-5-kelvin': { type: 'char', probability: 0.3 },
		'u0001-4-slabb': { type: 'char', probability: 0.3 },
		'u0001-4-chrono': { type: 'char', probability: 0.3 },
	},
	// steel, poison, electric
	industrial1: {
		'u0001-5-barbell': { type: 'char', probability: 0.3 },
		'u0001-5-crack9': { type: 'char', probability: 0.3 },
		'u0001-2-zerosix': { type: 'char', probability: 0.3 },
	},
	// dragon, fairy, psychic,
	pantheon1: {
		'u0001-5-robia': { type: 'char', probability: 0.3 },
		'u0001-3-twinkle': { type: 'char', probability: 0.3 },
		'u0001-5-drat': { type: 'char', probability: 0.3 },
	},
};

export const specialRewards = {
	evolution: {
		coins: [
			2 * K,
			6.08 * K,
			15.96 * K,
			28.14 * K,
			53.51 * K,
			61.53 * K, //
		],
		experience: [
			{ player: 12.0 * K, unit: 2.5 * K },
			{ player: 154.0 * K, unit: 41.47 * K },
			{ player: 128.99 * K, unit: 26.87 * K },
			{ player: 247.67 * K, unit: 51.6 * K },
			{ player: 534.97 * K, unit: 111.45 * K },
			{ player: 641.96 * K, unit: 133.74 * K },
		],
		unit: [
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-102:0.3, ev-103:0.3, ev-202:0.3, ev-203:0.3, ev-302:0.3, ev-303:0.3',
			'ev-102:0.3, ev-103:0.3, ev-202:0.3, ev-203:0.3, ev-302:0.3, ev-303:0.3',
			'ev-102:0.3, ev-103:0.3, ev-202:0.3, ev-203:0.3, ev-302:0.3, ev-303:0.3',
			'ev-103:0.3, ev-203:0.3, ev-303:0.3',
		],
	},
	event: {
		experience: [
			{ player: 10000, unit: 10000 },
			{ player: 20000, unit: 20000 },
			{ player: 30000, unit: 30000 },
			{ player: 40000, unit: 40000 },
			{ player: 50000, unit: 50000 },
			{ player: 60000, unit: 60000 },
		],
		unit: [
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
		],
	},
	crimson: {
		experience: [
			{ player: 10000, unit: 10000 },
			{ player: 20000, unit: 20000 },
			{ player: 30000, unit: 30000 },
			{ player: 40000, unit: 40000 },
			{ player: 50000, unit: 50000 },
			{ player: 60000, unit: 60000 },
		],
		unit: [
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
		],
	},
	verdant: {
		experience: [
			{ player: 10000, unit: 10000 },
			{ player: 20000, unit: 20000 },
			{ player: 30000, unit: 30000 },
			{ player: 40000, unit: 40000 },
			{ player: 50000, unit: 50000 },
			{ player: 60000, unit: 60000 },
		],
		unit: [
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
		],
	},
	moving: {
		experience: [
			{ player: 10000, unit: 10000 },
			{ player: 20000, unit: 20000 },
			{ player: 30000, unit: 30000 },
			{ player: 40000, unit: 40000 },
			{ player: 50000, unit: 50000 },
			{ player: 60000, unit: 60000 },
		],
		unit: [
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
		],
	},
	wizard: {
		experience: [
			{ player: 10000, unit: 10000 },
			{ player: 20000, unit: 20000 },
			{ player: 30000, unit: 30000 },
			{ player: 40000, unit: 40000 },
			{ player: 50000, unit: 50000 },
			{ player: 60000, unit: 60000 },
		],
		unit: [
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
		],
	},
	immortal: {
		experience: [
			{ player: 10000, unit: 10000 },
			{ player: 20000, unit: 20000 },
			{ player: 30000, unit: 30000 },
			{ player: 40000, unit: 40000 },
			{ player: 50000, unit: 50000 },
			{ player: 60000, unit: 60000 },
		],
		unit: [
			'',
			'',
			'',
			'',
			'',
			'', //
		],
		material: [
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
			'ev-101:0.3, ev-102:0.3, ev-201:0.3, ev-202:0.3, ev-301:0.3, ev-302:0.3',
		],
	},
};
