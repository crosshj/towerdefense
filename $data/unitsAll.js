export const unitsAll = {
	// like https://rangers.lerico.net/en/ranger/u1-ron
	'u0001-1-macho': {
		displayName: 'Macho',
		element: 'Fighting',
		type: 'Agility',
		rank: 1,
		mineralCost: 100,
		attack: '72 - 243 - 761',
		hp: '413 - 1,401 - 4,394',
		defense: '14 - 52 - 166',
		range: 1000,
		evadeChance: 0.05,
		hitRate: 0.0,
	},
	// like https://rangers.lerico.net/en/ranger/u030e-ron
	'u0001-2-toto': {
		displayName: 'Toto Bato',
		element: 'Rock',
		type: 'Strength',
		rank: 2,
		mineralCost: 150,
		attack: '139 - 661 - 1,838',
		hp: '998 - 4,623 - 12,821',
		defense: '22 - 109 - 304',
		range: 350,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u031e-ron
	'u0001-3-twinkle': {
		displayName: 'Twinkle',
		element: 'Fairy',
		type: 'Intelligence',
		rank: 3,
		mineralCost: 250,
		attack: '246 - 1,455 - 3,735',
		hp: '2,128 - 12,502 - 32,080',
		defense: '32 - 188 - 482',
		range: 800,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u032e-ron
	'u0001-4-vispi': {
		displayName: 'Vispi',
		element: 'Air',
		type: 'Agility',
		rank: 4,
		mineralCost: 150, //original 350
		attack: '411 - 2,959 - 7,198',
		hp: '4,270 - 30,436 - 74,009',
		defense: '43 - 337 - 823',
		range: 282,
		critChance: 0.21,
		critMult: 53,
		evadeChance: 0.18,

		//not (yet) used by game
		dexNumber: 4, // will be used to order units in the future (for now it's implied)
		attackSpeed: 1.47, //(1.47s + 0.00s)
		moveSpeed: 101, //pt/s (Fast)
		cooldown: 15, //seconds
		physicalAttack: '411 - 2,959 - 7,198',
		physicalDefense: '43 - 337 - 823',
		extractMaterial: '180 - 15 - 0',
		hitRate: 0.0,
		splashRadius: 0,
		skillUseRate: '',
		skillEvadeRate: 0.14,
		skillHitRate: 0,
		skillResistance: 0,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-drat': {
		displayName: 'Drat',
		element: 'Dragon',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u032e-ron
	'u0001-4-antonio': {
		displayName: 'Antonio',
		element: 'Bug',
		type: 'Agility',
		rank: 4,
		mineralCost: 350,
		attack: '411 - 2,959 - 7,198',
		hp: '4,270 - 30,436 - 74,009',
		defense: '43 - 337 - 823',
		range: 600,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u032e-ron
	'u0001-4-bumpier': {
		displayName: 'Bumpier',
		element: 'Dark',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 350,
		attack: '411 - 2,959 - 7,198',
		hp: '4,270 - 30,436 - 74,009',
		defense: '43 - 337 - 823',
		range: 600,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u032e-ron
	'u0001-4-tabi': {
		displayName: 'Tabi-Tabi Po',
		element: 'Earth',
		type: 'Agility',
		rank: 4,
		mineralCost: 350,
		attack: '411 - 2,959 - 7,198',
		hp: '4,270 - 30,436 - 74,009',
		defense: '43 - 337 - 823',
		range: 600,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-electopus': {
		displayName: 'Electopus',
		element: 'Electric',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: 340,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-santelmo': {
		displayName: 'Santelmo',
		element: 'Fire',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
		evadeChance: 0.05,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-multo': {
		displayName: 'Multo',
		element: 'Ghost',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-kelvin': {
		displayName: 'Kelvin',
		element: 'Ice',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-blanko': {
		displayName: 'Blanko',
		element: 'Normal',
		type: 'Strength',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-prickles': {
		displayName: 'Prickles',
		element: 'Grass',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-crack9': {
		displayName: 'Bumba',
		element: 'Poison',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-robia': {
		displayName: 'Robia',
		element: 'Psychic',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 300,
		// orig mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-barbell': {
		displayName: 'Barbell',
		displayName2: 'Captain',
		element: 'Steel',
		type: 'Strength',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// like https://rangers.lerico.net/en/ranger/u13-lia
	'u0001-5-wap': {
		displayName: 'Wap Wap',
		element: 'Water',
		type: 'Agility',
		rank: 5,
		mineralCost: 450,
		attack: '1,328 - 11,122 - 25,996',
		hp: '3,978 - 33,360 - 77,976',
		defense: '317 - 2,736 - 6,401',
		range: 1000,
	},
	// https://rangers.lerico.net/en/ranger/u22-glenn
	'u0001-1-benny': {
		displayName: 'Benny',
		displayName2: 'Lava',
		element: 'Fire',
		type: 'Agility',
		rank: 1,
		mineralCost: 100,
		attack: 100,
		// orig attack: 19 - 76 - 245
		hp: 20000,
		// orig hp: 350 - 1,186 - 3,719
		defense: '23 - 80 - 252',
		range: 60 * 10,
	},
	'u0001-4-slabb': {
		displayName: 'Slabb',
		element: 'Ice',
		type: 'Strength',
		rank: 4,
		mineralCost: 200,
		attack: 100,
		hp: 30000,
		defense: 0,
		range: 625,
	},
	'u0001-4-crimson': {
		displayName: 'Crimson',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		attack: 300,
		hp: 40000,
		defense: 0,
		range: 425,
	},
	'u0001-4-violet': {
		displayName: 'Violet',
		element: 'Psychic',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 150,
		attack: 200,
		hp: 20000,
		defense: 0,
		range: 1000,
	},
	'u0001-3-rose': {
		displayName: 'Rose',
		element: 'Grass',
		type: 'Agility',
		rank: 3,
		mineralCost: 150,
		attack: 250,
		hp: 25000,
		defense: 0,
		range: 800,
	},
	'u0001-2-ogre': {
		displayName: 'Ogre',
		displayName2: 'Pre-K',
		element: 'Dark',
		type: 'Strength',
		rank: 2,
		mineralCost: 100,
		attack: 200,
		hp: 15000,
		defense: 0,
		range: 200,
	},
	'u0001-2-jet': {
		displayName: 'Jet',
		element: 'Normal',
		type: 'Intelligence',
		rank: 2,
		mineralCost: 200,
		attack: 300,
		hp: 20000,
		defense: 0,
		range: 300,
	},
	// Openhyman - like https://rangers.lerico.net/en/ranger/u064e-lucas
	'u0001-4-openhyman': {
		displayName: 'Openhyman',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		// original mineralcost:540,
		attack: '340 - 2,447 - 5,953',
		hp: '3,132 - 22,340 - 54,324',
		defense: '33 - 278 - 680',
		range: 486,
	},
	'u0001-4-boar': {
		displayName: 'Boar',
		element: 'Normal',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 180,
		attack: 200,
		hp: 20000,
		defense: 0,
		range: 300,
	},
	'u0001-4-pineman': {
		displayName: 'Pineman',
		element: 'Normal',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 180,
		attack: 200,
		hp: 20000,
		defense: 0,
		range: 680,
	},
	'u0001-4-aynstine': {
		displayName: 'Aynstine',
		element: 'Normal',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 180,
		attack: 200,
		hp: 20000,
		defense: 0,
		range: 520,
	},

	// link https://rangers.lerico.net/en/ranger/u18-ben
	'u0001-1-pete': {
		displayName: 'Pete',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 150,
		// orig mineral cost: 200
		attack: '397-1,250-5,250',
		// orig attack: '67-238-752',
		hp: '1,500 - 6,000 - 15,000',
		//original hp: '530 - 1,803 - 5,657',
		defense: '65-236-749',
		range: 300,
	},

	// https://rangers.lerico.net/en/ranger/u205e-zac
	'u0001-2-coco': {
		displayName: 'Coco',
		element: 'Normal',
		type: 'Strength',
		rank: 2,
		mineralCost: 240,
		attack: '49-252-706',
		hp: '1,104 - 5,106 - 14,159',
		defense: '235 - 1,105 - 3,069',
		range: 150,
	},
	// https://rangers.lerico.net/en/ranger/u73-xan
	'u0001-5-bibly': {
		displayName: 'Bibly',
		displayName2: 'Seraphim',
		element: 'Fairy',
		type: 'Agility',
		rank: 5,
		mineralCost: 830,
		attack: '603 - 5,087 - 11,893',
		hp: '2,241 - 18,820 - 43,992',
		defense: '499 - 4,216 - 9,857',
		range: 500,
	},
	// https://rangers.lerico.net/en/ranger/u62-rei
	'u0001-2-zerosix': {
		displayName: 'Zerosix',
		displayName2: 'OneOneFiveTwo',
		element: 'Steel',
		type: 'Intelligence',
		rank: 2,
		mineralCost: 180,
		attack: '62 - 294 - 817',
		hp: '639 - 2,959 - 8,206',
		defense: '75 - 365 - 1,017',
		range: 500,
	},

	// this character is a base for other characters
	'u0001-0-guide': {
		isInGame: false,
		displayName: 'DO_NOT_USE',
		element: 'Steel',
		type: 'Intelligence',
		rank: 0,
		mineralCost: 180,
		attack: 0,
		hp: 0,
		defense: 0,
		range: 1,
	},

	// https://rangers.lerico.net/en/ranger/u76-brownie
	'u0001-2-tom': {
		displayName: 'Tom',
		displayName2: 'Major',
		element: 'Air',
		type: 'Strength',
		rank: 2,
		mineralCost: 100,
		attack: '109 - 375 - 1,179',
		hp: '360 - 1,215 - 3,807',
		defense: '247 - 855 - 2,691',
		range: 30 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u001e-bella
	'u0001-1-zoe': {
		displayName: 'Zoe',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 150,
		// orig minerals 240
		attack: '240 - 1,110 - 3,078',
		hp: '1,776 - 8,214 - 22,777',
		defense: '259 - 1,216 - 3,377',
		range: 70 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u56-frankie
	'u0001-3-zar': {
		displayName: 'Zar',
		element: 'Normal',
		type: 'Agility',
		rank: 3,
		mineralCost: 150,
		//orig minerals 470
		attack: '188 - 1,124 - 2,887',
		hp: '2,397 - 14,097 - 36,175',
		defense: '28 - 184 - 475',
		range: 70 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u041e-jill
	'u0001-4-liz': {
		displayName: 'Liz',
		displayName2: 'Landlady',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//mineral cost: 200,
		attack: '148 - 1,079 - 2,626',
		hp: '6,275 - 44,740 - 108,792',
		defense: '391 - 2,841 - 6,914',
		range: 114 * 4,
	},

	// https://rangers.lerico.net/en/ranger/u039e-jill
	// evo for liz
	'u0001-5-liz': {
		displayName: 'Liz',
		displayName2: 'Hassle',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 200,
		//mineral cost: 300,
		attack: '59 - 291 - 812',
		hp: '1,230 - 5,696 - 15,797',
		defense: '203 - 957 - 2,659',
		range: 114 * 4,
	},

	// https://rangers.lerico.net/en/ranger/u56-frankie (with reduce mineral cost)
	'u0001-3-corpus': {
		displayName: 'Corpus',
		element: 'Dark',
		type: 'Agility',
		rank: 3,
		mineralCost: 250,
		attack: '188 - 1,124 - 2,887',
		hp: '2,397 - 14,097 - 36,175',
		defense: '28 - 184 - 475',
		range: 70 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u56-frankie
	'u0001-3-arcus': {
		displayName: 'Arcus',
		element: 'Air',
		type: 'Strength',
		rank: 3,
		mineralCost: 250,
		// orig mineral cost: 470
		attack: '188 - 1,124 - 2,887',
		hp: '2,397 - 14,097 - 36,175',
		defense: '28 - 184 - 475',
		range: 50 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u71-cook
	'u0001-3-pismud': {
		displayName: 'Pismud',
		element: 'Normal',
		type: 'Agility',
		rank: 3,
		mineralCost: 250,
		attack: '174 - 1,032 - 2,650',
		hp: '2,205 - 12,969 - 33,280',
		defense: '30 - 186 - 479',
		range: 60 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u041e-jill
	'u0001-4-ruby': {
		displayName: 'Ruby',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 250,
		// orig mineralcost 500
		attack: '148 - 1,079 - 2,626',
		hp: '6,275 - 44,740 - 108,792',
		defense: '391 - 2,841 - 6,914',
		range: 50 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u106-cony
	'u0001-3-timmy': {
		displayName: 'Timmy',
		element: 'Normal',
		type: 'Intelligence',
		rank: 3,
		mineralCost: 290,
		attack: '737 - 4,364 - 11,203',
		hp: '1,117 - 6,577 - 16,879',
		defense: '391 - 2,841 - 6,914',
		// orig 0 - 0 - 0
		range: 80 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u72-sol
	'u0001-5-popo': {
		displayName: 'Popo',
		element: 'Dragon',
		type: 'Agility',
		rank: 5,
		mineralCost: 350,
		// orig mineral 790
		attack: '1,053 - 8,841 - 20,666',
		hp: '3,121 - 26,190 - 61,218',
		defense: '391 - 2,841 - 6,914',
		// orig 0 - 0 - 0
		range: 70 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u056e-ham
	'u0001-3-poki': {
		displayName: 'Poki',
		element: 'Normal',
		type: 'Strength',
		rank: 3,
		mineralCost: 380,
		attack: '67 - 418 - 1,076',
		hp: '3,211 - 18,889 - 48,472',
		defense: '654 - 3,852 - 9,886',
		range: 60 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u11-pico
	'u0001-1-skye': {
		displayName: 'Skye',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 220,
		attack: '257 - 1,214 - 3,373',
		hp: '583 - 2,700 - 7,488',
		defense: '24 - 111 - 308',
		range: 80 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u11-pico
	'u0001-2-momoka': {
		displayName: 'Momoka',
		element: 'Fairy',
		type: 'Agility',
		rank: 2,
		mineralCost: 220,
		attack: '257 - 1,214 - 3,373',
		hp: '583 - 2,700 - 7,488',
		defense: '24 - 111 - 308',
		range: 80 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u050e-sisi
	'u0001-3-redford': {
		displayName: 'Redford',
		element: 'Normal',
		type: 'Strength',
		rank: 3,
		mineralCost: 380,
		attack: '205 - 1,219 - 3,130',
		hp: '2,318 - 13,628 - 34,970',
		defense: '703 - 4,174 - 10,717',
		range: 40 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u43-jessica
	'u0001-4-sylvia': {
		displayName: 'Sylvia',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 380,
		attack: '245 - 1,764 - 4,291',
		hp: '3,938 - 28,095 - 68,319',
		defense: '79 - 569 - 1,384',
		range: 60 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u39-cony
	'u0001-4-ginger': {
		displayName: 'Ginger',
		element: 'Normal',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 390,
		attack: '1,171 - 8,374 - 20,365',
		hp: '2,048 - 14,592 - 35,482',
		defense: '79 - 569 - 1,384',
		// orig 0 - 0 - 0
		range: 40 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u057e-ham
	'u0001-4-lily': {
		displayName: 'Lily',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 475,
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 20 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u96-cony
	'u0001-4-chizu': {
		displayName: 'Chizu',
		element: 'Normal',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 475,
		attack: '616 - 4,438 - 10,796',
		hp: '3,393 - 24,218 - 58,892',
		defense: '892 - 6,380 - 15,516',
		range: 50 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u154e-manager
	'u0001-5-rook': {
		displayName: 'Rook',
		displayName2: 'Master',
		element: 'Normal',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 900,
		attack: '1,110 - 9,370 - 21,906',
		hp: '10,710 - 89,711 - 209,684',
		defense: '892 - 6,380 - 15,516',
		// orig 0 - 0 - 0
		range: 80 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u123-cony
	'u0001-5-rookia': {
		displayName: 'Rookia',
		element: 'Normal',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 900,
		attack: '647 - 4,665 - 11,349',
		hp: '1,131 - 8,089 - 19,672',
		defense: '892 - 6,380 - 15,516',
		// orig 0 - 0 - 0
		range: 60 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u128-chuck
	'u0001-4-ebony': {
		displayName: 'Ebony',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 350,
		attack: '349 - 2,505 - 6,093',
		hp: '805 - 5,754 - 13,993',
		defense: '69 - 510 - 1,242',
		range: 40 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u004e-clark
	'u0001-3-soda': {
		displayName: 'Poppy',
		displayName2: 'da Soda',
		element: 'Normal',
		type: 'Strength',
		rank: 3,
		mineralCost: 150,
		//orig cost 450
		attack: '325 - 1,924 - 4,939',
		hp: '1,890 - 11,133 - 28,571',
		defense: '340 - 2,017 - 5,179',
		range: 30 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u005e-clark
	'u0001-4-chrono': {
		displayName: 'Chrono',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 560
		attack: '650 - 4,668 - 11,354',
		hp: '4,928 - 35,112 - 85,378',
		defense: '465 - 3,356 - 8,165',
		range: 60 * 10,
	},

	// https://rangers.lerico.net/en/ranger/u057e-ham
	'u0001-4-aries': {
		displayName: 'Aries',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 60 * 10,
	},

	//
	'u0001-4-commando1': {
		displayName: 'Commando1',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 60 * 10,
	},

	//
	'u0001-4-commando2': {
		displayName: 'Commando2',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 60 * 10,
	},

	//
	'u0001-4-commando3': {
		displayName: 'Commando3',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 60 * 10,
	},

	//
	'u0001-4-commando4': {
		displayName: 'Commando4',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 60 * 10,
	},

	//
	'u0001-4-commando5': {
		displayName: 'Commando5',
		element: 'Normal',
		type: 'Strength',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '166 - 1,195 - 2,907',
		hp: '6,816 - 48,564 - 118,087',
		defense: '892 - 6,380 - 15,516',
		range: 60 * 10,
	},

	//https://rangers.lerico.net/en/ranger/u227e-cook
	'u0001-4-cupcake': {
		displayName: 'Cupcake',
		displayName2: 'Cuppy',
		element: 'Dessert',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '392 - 2,793 - 6,791',
		hp: '4,860 - 34,652 - 84,262',
		defense: '41 - 335 - 819',
		range: 321,
	},

	//https://rangers.lerico.net/en/ranger/u024e-yang https://rangers.lerico.net/en/ranger/u1001e-brown
	'u0001-5-cane': {
		displayName: 'Cane',
		displayName2: 'Duke',
		element: 'Candy',
		type: 'Strength',
		rank: 5,
		mineralCost: 850,
		//orig cost 475
		attack: '1,115 - 12,175 - 26,955',
		hp: '6,691 - 72,735 - 161,019',
		defense: '60 - 692 - 1,534',
		range: 55 * 10,
	},

	//
	'u0001-4-commando6': {
		displayName: 'Commando6',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '1,115 - 12,175 - 26,955',
		hp: '6,691 - 72,735 - 161,019',
		defense: '60 - 692 - 1,534',
		range: 50 * 10,
	},

	//
	'u0001-4-commando7': {
		displayName: 'Commando7',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		//orig cost 475
		attack: '1,115 - 12,175 - 26,955',
		hp: '6,691 - 72,735 - 161,019',
		defense: '60 - 692 - 1,534',
		range: 40 * 10,
	},

	//
	'u0001-5-pumpee': {
		displayName: 'Pumpee',
		element: 'Normal',
		type: 'Strength',
		rank: 5,
		mineralCost: 150,
		//orig cost 475
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-kor': {
		displayName: 'Kor',
		element: 'Normal',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 150,
		//orig cost 475
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-boowee': {
		displayName: 'Boowee',
		element: 'Normal',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 150,
		//orig cost 475
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-mumay': {
		displayName: 'Mumay',
		element: 'Normal',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		//orig cost 475
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-dave': {
		displayName: 'Dave',
		element: 'Dark',
		type: 'Demon',
		rank: 5,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-stain': {
		displayName: 'Stain',
		element: 'Dark',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-gretchen': {
		displayName: 'Gretchen',
		element: 'Dark',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-glinda': {
		displayName: 'Glinda',
		element: 'Dark',
		type: 'Strength',
		rank: 5,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},

	'u0001-5-jack': {
		displayName: 'Jack',
		element: 'Psychic',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},
	'u0001-3-kopi': {
		displayName: 'Kopi',
		element: 'Water',
		type: 'Agility',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 20 * 10,
	},
	'u0001-3-chai': {
		displayName: 'Chai',
		element: 'Water',
		type: 'Intelligence',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 40 * 10,
	},
	'u0001-3-choco': {
		displayName: 'Choco',
		element: 'Water',
		type: 'Strength',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 50 * 10,
	},
	'u0001-3-milky': {
		displayName: 'Milky',
		element: 'Water',
		type: 'Intelligence',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 60 * 10,
	},

	'u0001-3-sencha': {
		displayName: 'Sencha',
		element: 'Water',
		type: 'Agility',
		rank: 3,
		mineralCost: 150,
		attack: '2,115 - 12,175 - 70,000',
		hp: '6,691 - 72,735 - 300,000',
		defense: '60 - 692 - 5,000',
		range: 80 * 10,
	},

	'u0001-3-spritz': {
		displayName: 'Spritz',
		element: 'Water',
		type: 'Strength',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 20 * 10,
	},

	'u0001-3-oran': {
		displayName: 'Oran',
		element: 'Water',
		type: 'Intelligence',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 20 * 10,
	},

	'u0001-3-vinia': {
		displayName: 'Vinia',
		element: 'Water',
		type: 'Agility',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 20 * 10,
	},

	'u0001-3-bloo': {
		displayName: 'Bloo',
		element: 'Water',
		type: 'Strength',
		rank: 3,
		mineralCost: 150,
		attack: '1,115 - 12,175 - 50,000',
		hp: '6,691 - 72,735 - 200,000',
		defense: '60 - 692 - 5,000',
		range: 20 * 10,
	},

	//https://rangers.lerico.net/en/ranger/u2004e-clara
	'u0001-5-queenlollie': {
		displayName: 'Lollie',
		displayName2: 'Queen',
		element: 'Candy',
		type: 'Intelligence',
		rank: 5,
		mineralCost: 150,
		attack: '3,900 - 63,400 - 132,120',
		hp: '20,000 - 317,500 - 661,500',
		defense: '0 - 0 - 0',
		range: 500,
	},

	//https://rangers.lerico.net/en/ranger/u81-james
	//https://rangers.lerico.net/en/ranger/u86-cony
	'u0001-4-ladycindy': {
		displayName: 'Cindy',
		displayName2: 'Lady',
		element: 'Candy',
		type: 'Intelligence',
		rank: 4,
		mineralCost: 150,
		attack: '1,017 - 7,289 - 17,728',
		hp: '3,575 - 25,478 - 61,952',
		defense: '0 - 0 - 0',
		range: 350,
	},

	//https://rangers.lerico.net/en/ranger/u123u-brown
	'u0001-5-kingpopillol': {
		displayName: 'Popillol',
		displayName2: 'King',
		element: 'Candy',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '2,709 - 59,004 - 99,504',
		hp: '44,872 - 902,502 - 1,519,502',
		defense: '303 - 5,585 - 9,385',
		range: 600,
	},

	/*
	//changeDET
	'u0001-5-price': {
		displayName: 'Price',
		displayName2: 'Prince',
		element: 'Fire',
		type: 'Agility',
		rank: 5,
		mineralCost: 1000,
		attack: '2,709 - 59,004 - 99,504',
		hp: '44,872 - 902,502 - 1,519,502',
		defense: '303 - 5,585 - 9,385',
		range: 155,
	},
	*/

	'u0001-5-freida': {
		displayName: 'Freida',
		displayName2: 'Princess',
		element: 'Fire',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '2,709 - 59,004 - 99,504',
		hp: '44,872 - 902,502 - 1,519,502',
		defense: '303 - 5,585 - 9,385',
		range: 400,
	},

	'u0001-5-burkley': {
		displayName: 'Burkley',
		element: 'Plant',
		type: 'Strength',
		rank: 5,
		mineralCost: 150,
		attack: '2,709 - 59,004 - 99,504',
		hp: '44,872 - 902,502 - 1,519,502',
		defense: '303 - 5,585 - 9,385',
		range: 200,
	},

	'u0001-5-callista': {
		displayName: 'Callista',
		element: 'Dark',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '2,709 - 59,004 - 99,504',
		hp: '44,872 - 902,502 - 1,519,502',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},
	//edit stats
	'u0001-5-rayella': {
		displayName: 'Rayella ',
		element: 'Mermaid',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '2,709 - 59,004 - 99,504',
		hp: '44,872 - 902,502 - 1,519,502',
		defense: '303 - 5,585 - 9,385',
		range: 500,
	},

	'u0001-5-glacielle': {
		displayName: 'Glacielle',
		element: 'Mermaid',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '5,709 - 70,004 - 150,000',
		hp: '44,872 - 902,502 - 1,700,000',
		defense: '303 - 5,585 - 9,385',
		range: 700,
	},

	'u0001-5-merlot': {
		displayName: 'Merlot',
		element: 'Mermaid',
		type: 'Agility',
		rank: 5,
		mineralCost: 150,
		attack: '5,709 - 70,004 - 150,000',
		hp: '44,872 - 902,502 - 1,700,000',
		defense: '303 - 5,585 - 9,385',
		range: 700,
	},

	'u0001-1-sapphire': {
		displayName: 'Sapphire',
		element: 'Flying',
		type: 'Intelligence',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 400,
	},

	'u0001-1-daisy': {
		displayName: 'Daisy',
		element: 'Flying',
		type: 'Intelligence',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 200,
	},

	'u0001-1-jam': {
		displayName: 'Jam',
		element: 'Flying',
		type: 'Intelligence',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 200,
	},

	'u0001-1-layla': {
		displayName: 'Layla',
		element: 'Flying',
		type: 'Intelligence',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},

	// this is for new base I made - Aileen
	'u0001-4-newbase': {
		displayName: 'Newbase',
		element: 'Flying',
		type: 'Intelligence',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},

	'u0001-4-molly': {
		displayName: 'Molly',
		element: 'Normal',
		type: 'Strength',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},

	'u0001-4-sheen': {
		displayName: 'Sheen',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},

	'u0001-4-peanut': {
		displayName: 'Peanut',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},

	'u0001-4-macadamia': {
		displayName: 'Macadamia',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},

	'u0001-4-walnut': {
		displayName: 'Walnut',
		element: 'Normal',
		type: 'Agility',
		rank: 1,
		mineralCost: 150,
		attack: '1,709 - 20,004 - 50,000',
		hp: '4,872 - 92,502 - 150,000',
		defense: '303 - 5,585 - 9,385',
		range: 300,
	},
};
