import { getMineralMap } from '../mineral.js';
const mineralMap = getMineralMap();

const chargeMineral = (state) => {
	if (state.mineral.charge === 100) return;
	if (state.tick % state.mineral.chargeRate !== 0) return;
	state.mineral.charge += 20;
};
const chargeMissile = (state) => {
	if (state.missile.charge === 100) return;
	if (state.tick % state.missile.chargeRate !== 0) return;
	state.missile.charge += 10;
};

const updateMineral = (state) => {
	const mineralRate = 4;
	const thisLevel = mineralMap[state.mineral.level - 1];
	const nextLevel = mineralMap[state.mineral.level];
	state.mineral.capacity = thisLevel.amount;
	state.mineral.levelCost = nextLevel?.cost || 0;
	if (state.mineral.amount === state.mineral.capacity) return;
	state.mineral.amount += mineralRate;
	if (state.mineral.amount >= state.mineral.capacity) {
		state.mineral.amount = state.mineral.capacity;
	}
};

export default {
	chargeMineral,
	chargeMissile,
	updateMineral,
};
