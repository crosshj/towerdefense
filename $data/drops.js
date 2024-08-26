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
	pantheon1: () => ({ player: 96000, unit: 96000 })
};

export const stageCharacterDrops = {
	// meadow: normal, bug, flying(air)
	field1: {
		'u0001-5-blanko': { type: 'char', probability: 0.1 },
		'u0001-4-vispi': { type: 'char', probability: 0.1 },
		'u0001-1-pete': { type: 'char', probability: 0.2 },
		'u0001-1-zoe': { type: 'char', probability: 0.2 },
		'u0001-2-coco': { type: 'char', probability: 0.2 },
		'u0001-4-aynstine': { type: 'char', probability: 0.2 },
		'u0001-3-poki': { type: 'char', probability: 0.4 }
	},
	// grass, bug, normal
	forest1: {
		'u0001-4-antonio': { type: 'char', probability: 0.1 },
		'u0001-5-prickles': { type: 'char', probability: 0.1 },
		'u0001-3-timmy': { type: 'char', probability: 0.2 },
		'u0001-3-zar': { type: 'char', probability: 0.2 },
		'u0001-3-pismud': { type: 'char', probability: 0.2 },
		'u0001-4-openhyman': { type: 'char', probability: 0.2 },
		'u0001-1-skye': { type: 'char', probability: 0.4 }
	},
	// coastal: water, normal, flying(air)
	water1: {
		'u0001-5-wap': { type: 'char', probability: 0.1 },
		'u0001-3-redford': { type: 'char', probability: 0.1 },
		'u0001-2-jet': { type: 'char', probability: 0.1 },
		'u0001-3-arcus': { type: 'char', probability: 0.3 },
		'u0001-4-pineman': { type: 'char', probability: 0.4 },
		'u0001-2-tom': { type: 'char', probability: 0.4 }
	},
	// grass, fighting, dragon
	sakura1: {
		'u0001-1-macho': { type: 'char', probability: 0.1 },
		'u0001-4-ruby': { type: 'char', probability: 0.2 },
		'u0001-4-boar': { type: 'char', probability: 0.25 },
		'u0001-5-popo': { type: 'char', probability: 0.45 }
	},
	// rock, ground, fighting
	highlands1: {
		'u0001-4-tabi': { type: 'char', probability: 0.1 },
		'u0001-2-toto': { type: 'char', probability: 0.1 },
		'u0001-4-liz': { type: 'char', probability: 0.4 }
	},
	// tropical graveyard: ghost, dark, grass
	tropical1: {
		'u0001-5-multo': { type: 'char', probability: 0.1 },
		'u0001-4-bumpier': { type: 'char', probability: 0.1 },
		'u0001-2-ogre': { type: 'char', probability: 0.4 },
		'u0001-3-corpus': { type: 'char', probability: 0.4 }
	},
	// thunder oasis: electric, ground, rock, fire
	oasis1: {
		'u0001-5-electopus': { type: 'char', probability: 0.1 },
		'u0001-5-santelmo': { type: 'char', probability: 0.1 },
		'u0001-1-benny': { type: 'char', probability: 0.3 },
		'u0001-3-rose': { type: 'char', probability: 0.4 }
	},
	// ice, water, ground
	tundra1: {
		'u0001-5-kelvin': { type: 'char', probability: 0.1 },
		'u0001-4-slabb': { type: 'char', probability: 0.2 },
		'u0001-4-violet': { type: 'char', probability: 0.4 }
	},
	// steel, poison, electric
	industrial1: {
		'u0001-5-barbell': { type: 'char', probability: 0.1 },
		'u0001-5-crack9': { type: 'char', probability: 0.1 },
		'u0001-2-zerosix': { type: 'char', probability: 0.2 },
		'u0001-2-jet': { type: 'char', probability: 0.4 }
	},
	// dragon, fairy, psychic,
	pantheon1: {
		'u0001-2-momoka': { type: 'char', probability: 0.1 },
		'u0001-5-robia': { type: 'char', probability: 0.1 },
		'u0001-3-twinkle': { type: 'char', probability: 0.1 },
		'u0001-5-bibly': { type: 'char', probability: 0.3 },
		'u0001-5-drat': { type: 'char', probability: 0.2 },
		'u0001-4-crimson': { type: 'char', probability: 0.4 }
	}
};
