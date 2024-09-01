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
			move: 20,
			x: towerX + 140,
			critChance: 0.025,
			critMult: 1.1,
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
			move: 20,
			x: towerX + 140,
			critChance: 0.025,
			critMult: 1.1,
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
			move: 30,
			x: towerX + 140,
			critChance: 0.05,
			critMult: 1.2,
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
			move: 40,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
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
			move: 40,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
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
			x: towerX + 140,
			critChance: 0.01,
			critMult: 2,
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
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
		},
	],
	// ice, water, ground
	tundra1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 5000,
			respawn: 40,
			range: 560,
			attack: 95,
			move: 40,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
		},
	],
	// steel, poison, electric
	industrial1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 6000,
			respawn: 30,
			range: 560,
			attack: 95,
			move: 40,
			x: towerX + 140,
			critChance: 0.1,
			critMult: 5,
		},
	],
	// dragon, fairy, psychic,
	pantheon1: ({ towerX }) => [
		{
			type: 'defender',
			hp: 20000,
			respawn: 22,
			range: 500,
			attack: 430,
			move: 75,
			x: towerX + 140,
			critChance: 0.2,
			critMult: 5,
		},
	],
};
