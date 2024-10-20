export const specialStage = {
	// tie-up events
	event: {
		id: 'event',
		status: 'COMING SOON',
		name: 'Collabo Event',
		maxTries: 5,
		image: '/assets/stage/special/world1.svg',
	},

	// time-limited
	professor: {
		id: 'professor',
		status: 'COMING SOON',
		name: 'Professor Planet',
		maxTries: 5,
		image: '/assets/stage/special/world1.svg',
	},

	// time-limited elemental stages
	crimson: {
		id: 'crimson',
		status: 'COMING SOON',
		name: 'Crimson Volcano',
		maxTries: 5,
		image: '/assets/stage/special/worlds/crimsonVolcano.svg',
	},
	verdant: {
		id: 'verdant',
		status: 'COMING SOON',
		name: 'Verdant Tree',
		maxTries: 5,
		image: '/assets/stage/special/world1.svg',
	},
	moving: {
		id: 'moving',
		status: 'COMING SOON',
		name: 'Moving Glacier',
		maxTries: 5,
		image: '/assets/stage/special/world1.svg',
	},

	// available every day
	evolution: {
		id: 'evolution',
		name: 'Ascension Sphere',
		color: '#89CFF0',
		difficulty: 'Easy',
		maxTries: 5,
		image: '/assets/stage/special/worlds/ascensionSphere.webp',
		featherCost: [1, 2, 3, 4, 5, 6],
	},
	wizard: {
		id: 'wizard',
		status: 'COMING SOON',
		name: 'Mystic Tesseract',
		color: '#73ed73',
		difficulty: 'Normal',
		maxTries: 3,
		image: '/assets/stage/special/worlds/mysticTesseract.webp',
		featherCost: [7, 7, 7, 8, 8, 8],
	},
	immortal: {
		id: 'immortal',
		status: 'COMING SOON',
		name: 'Phantom Obelisk',
		color: '#da4b24',
		difficulty: 'Hard',
		maxTries: 3,
		image: '/assets/stage/special/worlds/phantomObelisk.webp',
		featherCost: [9, 9, 9, 10, 10, 10],
	},
};
