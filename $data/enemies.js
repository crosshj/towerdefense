export const stageTowers = {
	// meadow: normal, bug, flying(air)
	field1: () => {
		return {
			hp: 10000,
			color: '#98fb98',
			music: 'sunnyFieldBackground',
			background: 'backgroundField1',
		};
	},
	// grass, bug, normal
	forest1: () => {
		return {
			hp: 20000,
			color: '#238b21',
			music: 'sunnyFieldBackground',
			background: 'backgroundForest1',
		};
	},
	// coastal: water, normal, flying(air)
	water1: () => {
		return {
			hp: 25000,
			color: '#10bffb',
			music: 'sunnyFieldBackground',
			background: 'backgroundOcean1',
		};
	},
	// grass, fighting, dragon
	sakura1: () => {
		return {
			hp: 30000,
			color: '#934',
			music: 'asianSceneBackground',
			background: 'backgroundSakura1',
		};
	},
	// rock, ground, fighting
	highlands1: () => {
		return {
			hp: 30000,
			color: '#a9a9a9',
			music: 'sunnyFieldBackground',
			background: 'backgroundHighlands1',
		};
	},
	// tropical graveyard: ghost, dark, grass
	tropical1: () => {
		return {
			hp: 35000,
			color: '#604050',
			music: 'tropicalShadowsBackground',
			background: 'backgroundTropicalGraveyard1',
		};
	},
	// thunder oasis: electric, ground, rock, fire
	oasis1: () => {
		return {
			hp: 35000,
			color: '#ffd701',
			music: 'sunnyFieldBackground',
			background: 'backgroundOasis1',
		};
	},
	// ice, water, ground
	tundra1: () => {
		return {
			hp: 40000,
			color: '#afc4de',
			music: 'sunnyFieldBackground',
			background: 'backgroundTundra1',
		};
	},
	// steel, poison, electric
	industrial1: () => {
		return {
			hp: 50000,
			color: '#556b2f',
			music: 'slowedSurf',
			background: 'backgroundIndustrial1',
		};
	},
	// dragon, fairy, psychic,
	pantheon1: () => {
		return {
			hp: 120000,
			color: '#8b008b',
			music: 'slowedSurf',
			background: 'backgroundGhost1',
		};
	},
};

export const stageEnemies = {
	// meadow: normal, bug, flying(air)
	field1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 3000,
			respawn: 100,
			range: 560,
			attack: 25,
			defense: 50,
			move: 20,
			x: towerX + 140,
			critChance: 0.025,
			critMult: 1.1,
			evadeChance: 0.025,
		},
	],
	// grass, bug, normal
	forest1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 3000,
			respawn: 90,
			range: 560,
			attack: 25,
			defense: 100,
			move: 20,
			x: towerX + 140,
			critChance: 0.025,
			critMult: 1.1,
			evadeChance: 0.025,
		},
	],
	// coastal: water, normal, flying(air)
	water1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 3000,
			respawn: 80,
			range: 560,
			attack: 50,
			defense: 150,
			move: 30,
			x: towerX + 140,
			critChance: 0.05,
			critMult: 1.2,
			evadeChance: 0.05,
		},
	],
	// grass, fighting, dragon
	sakura1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 3000,
			respawn: 70,
			range: 560,
			attack: 95,
			defense: 200,
			move: 40,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
			evadeChance: 0.05,
		},
	],
	// rock, ground, fighting
	highlands1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 3000,
			respawn: 60,
			range: 560,
			attack: 95,
			defense: 250,
			move: 40,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
			evadeChance: 0.1,
		},
	],
	// tropical graveyard: ghost, dark, grass
	tropical1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 3000,
			respawn: 50,
			range: 560,
			attack: 87,
			move: 60,
			defense: 300,
			x: towerX + 140,
			critChance: 0.01,
			critMult: 2,
			evadeChance: 0.2,
		},
	],
	// thunder oasis: electric, ground, rock, fire
	oasis1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 4000,
			respawn: 40,
			range: 560,
			attack: 95,
			move: 40,
			defense: 350,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
			evadeChance: 0.3,
		},
	],
	// ice, water, ground
	tundra1: ({ towerX }) => [
		{
			code: 'u0001-5-kelvin',
			type: 'defender',
			mineralCost: 50,
			hp: 50000,
			respawn: 40,
			range: 560,
			attack: 20000,
			move: 50,
			defense: 2000,
			x: towerX + 140,
			critChance: 0.075,
			critMult: 2,
			evadeChance: 0.6,
		},
		{
			code: 'u0001-4-slabb',
			type: 'defender',
			mineralCost: 100,
			hp: 100000,
			respawn: 40,
			range: 120,
			attack: 20000,
			move: 30,
			defense: 2000,
			x: towerX + 140,
			critChance: 0.075,
			critMult: 2,
			evadeChance: 0.7,
		},
	],
	// steel, poison, electric
	industrial1: ({ towerX }) => [
		{
			code: 'u0001-2-zerosix',
			type: 'defender',
			mineralCost: 100,
			hp: 60000,
			respawn: 30,
			range: 860,
			attack: 150000,
			move: 60,
			defense: 1000,
			x: towerX + 140,
			critChance: 0.15,
			critMult: 5,
			evadeChance: 0.55,
		},
		{
			code: 'u0001-5-barbell',
			type: 'defender',
			mineralCost: 110,
			hp: 200000,
			respawn: 30,
			range: 200,
			attack: 30000,
			move: 80,
			defense: 1000,
			x: towerX + 140,
			critChance: 0.15,
			critMult: 3,
			evadeChance: 0.65,
		},
		{
			code: 'u0001-5-crack9',
			type: 'defender',
			mineralCost: 70,
			hp: 50000,
			respawn: 30,
			range: 560,
			attack: 30000,
			move: 60,
			defense: 1000,
			x: towerX + 140,
			critChance: 0.15,
			critMult: 3,
			evadeChance: 0.6,
		},
	],
	// dragon, fairy, psychic,
	pantheon1: ({ towerX }) => [
		{
			code: 'u0001-5-drat',
			type: 'defender',
			mineralCost: 150,
			hp: 200000,
			respawn: 22,
			range: 600,
			attack: 3000,
			move: 75,
			defense: 2000,
			x: towerX + 140,
			critChance: 0.2,
			critMult: 3,
			evadeChance: 0.6,
		},
		{
			code: 'u0001-5-robia',
			type: 'defender',
			mineralCost: 75,
			hp: 100000,
			respawn: 22,
			range: 400,
			attack: 20000,
			move: 75,
			defense: 1500,
			x: towerX + 140,
			critChance: 0.2,
			critMult: 3,
			evadeChance: 0.7,
		},
		{
			code: 'u0001-3-twinkle',
			type: 'defender',
			mineralCost: 100,
			hp: 65000,
			respawn: 22,
			range: 1300,
			attack: 6000,
			move: 75,
			defense: 4000,
			x: towerX + 140,
			critChance: 0.2,
			critMult: 3,
			evadeChance: 0.6,
		},
	],
};
