import { getMineralMap } from '../mineral.js';
const mineralMap = getMineralMap();

const chargeMineral = (state) => {
	if (state.mineral.charge === 100) return;
	if (state.tick % state.mineral.chargeRate !== 0) return;
	state.mineral.charge += 20;
};

const updateMineral = (state) => {
	const mineralRate = 3.65; //4;
	// const thisLevel = mineralMap[state.mineral.level - 1];
	// const nextLevel = mineralMap[state.mineral.level];
	// state.mineral.capacity = thisLevel.amount;
	// state.mineral.levelCost = nextLevel?.cost || 0;
	state.mineral.amount += mineralRate;
	if (state.mineral.amount >= state.mineral.capacity) {
		state.mineral.amount = state.mineral.capacity;
	}
};

const upgradeMineralLevel = (state) => {
	if (enemyState?.mineral?.level === 8) {
		enemyState.awaitLevel = false;
		return;
	}
	console.log('leveling mineral');
	enemyState.mineral.amount -= mineralMap[enemyState.mineral.level].cost;
	enemyState.mineral.level += 1;
	enemyState.mineral.capacity = mineralMap[enemyState.mineral.level].amount;
	state.mineral.charge = 0;
	enemyState.awaitLevel = false;
};

const randomDefender = (team) => {
	const randomIndex = Math.floor(Math.random() * team.length);
	return team[randomIndex];
};

const enemyState = {
	awaitLevel: false,
	awaitLevelChance: 0.1,
	awaitCharge: false,
	awaitChargeChance: 0.5,
	shouldLevel: true,
	mineral: {
		charge: 0, //cooldown
		chargeRate: 20, //cooldown rate
		amount: 0,
		level: 1,
		capacity: mineralMap[0].amount,
	},
};

export const enemyOneSpawnTicker = (state, tower) => {
	if (!enemyState.maxMineralNeeded) {
		enemyState.maxMineralNeeded = Math.max(
			...tower.team.map((x) => x.mineralCost)
		);
	}
	if (
		enemyState.shouldLevel &&
		enemyState.maxMineralNeeded <= enemyState.mineral.capacity
	) {
		enemyState.shouldLevel = false;
	}

	enemyState.tick = state.tick;
	chargeMineral(enemyState); // cooldown
	updateMineral(enemyState);

	const mineralLevelable = enemyState.mineral.charge === 100;
	const mineralCharged =
		enemyState.mineral.amount === enemyState.mineral.capacity;
	if (mineralLevelable && enemyState.awaitLevel) {
		upgradeMineralLevel(enemyState);
	}
	if (enemyState.awaitLevel) {
		const excessMineral =
			enemyState.mineral.amount -
			mineralMap[enemyState.mineral.level].amount;
		// may have enough excess mineral to deploy
		return;
	}

	if (
		enemyState.awaitCharge &&
		enemyState.mineral.amount !== enemyState.mineral.capacity
	) {
		return;
	}

	const deployable = tower.team.filter(
		(x) => x.mineralCost <= enemyState.mineral.amount
	);

	if (
		enemyState.awaitCharge &&
		enemyState.mineral.amount === enemyState.mineral.capacity
	) {
		console.log('deploying awaited');
		enemyState.awaitCharge = false;
		const char = randomDefender(deployable);
		state.actions.spawnCharInstance(char, tower.deployed);
		enemyState.mineral.amount -= char.mineralCost;
		return;
	}

	const potential = tower.team.filter(
		(x) => x.mineralCost <= enemyState.mineral.capacity
	);
	if (!deployable.length) return;
	if (deployable.length < potential.length) {
		if (Math.random() < enemyState.awaitChargeChance) {
			console.log('waiting for mineral charge');
			enemyState.awaitCharge = true;
			enemyState.awaitChargeChance -= 0.1;
		} else {
			enemyState.awaitCharge = false;
			enemyState.awaitCharge += 0.1;
		}
	}

	if (
		enemyState.shouldLevel &&
		enemyState.mineral.level <= 8 &&
		Math.random() < enemyState.awaitLevelChance
	) {
		console.log('waiting for mineral level');
		enemyState.awaitLevel = true;
		enemyState.awaitLevelChance -= 0.05;
	} else {
		console.log('deploying');
		const char = randomDefender(deployable);
		state.actions.spawnCharInstance(char, tower.deployed);
		enemyState.mineral.amount -= char.mineralCost;
		enemyState.awaitLevelChance += 0.05;
	}

	if (enemyState.awaitLevelChance < 0.15) {
		enemyState.awaitLevelChance = 0.15;
	}
	if (enemyState.awaitLevelChance > 0.85) {
		enemyState.awaitLevelChance = 0.85;
	}
};
