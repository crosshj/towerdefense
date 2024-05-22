import { getMineralMap } from './mineral.js';

const mineralMap = getMineralMap();

export const getActions = (state) => {
	return {
		pauseToggle: () => {
			state.paused = !state.paused;
		},
		missileFire: () => {
			if (state.paused) return;
			state.missile.charge = 0;
		},
		mineralLevel: () => {
			if (state.paused) return;
			if (!mineralMap[state?.mineral?.level]?.cost) return;
			state.mineral.charge = 0;
			state.mineral.amount -= mineralMap[state.mineral.level]?.cost;
			state.mineral.level++;
		}
	};
};
