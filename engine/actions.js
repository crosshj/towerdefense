import { getMineralMap } from './mineral.js';
import { spawnMissile } from './update/missile.js';

const mineralMap = getMineralMap();

export const getActions = (state) => {
	return {
		pauseToggle: () => {
			state.paused = !state.paused;
		},
		missileFire: () => {
			if (state.paused) return;
			spawnMissile(state);
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
