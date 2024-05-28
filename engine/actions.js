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
		mineralLevel: ({ updateLevel }) => {
			if (state.paused) return;
			if (!mineralMap[state?.mineral?.level]?.cost) return;
			state.mineral.charge = 0;
			state.mineral.amount -= mineralMap[state.mineral.level]?.cost;
			state.mineral.level++;
			updateLevel(state.mineral.level);
		},
		triggerEffect: (ui) => {
			if (ui.effect === 'teamSwitch') {
				ui.switchTeam();
				console.log('do state-related team switch');
				return;
			}
			ui.disableEffect();
			console.log('do state-related effect spawn');
		}
	};
};
