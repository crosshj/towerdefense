import { clone } from '../utils/utils.js';
import { getMineralMap } from './mineral.js';
import { spawnMissile } from './update/missile.js';

const mineralMap = getMineralMap();

export const getActions = (state) => {
	return {
		restartGame: () => {
			alert('this does not work right now');
		},
		mainMenu: () => {
			document.location.reload();
		},
		pauseToggle: () => {
			state.paused = !state.paused;
		},
		autoToggle: () => {
			state.auto = !state.auto;
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
		},
		spawnCharInstance: (char, deployed) => {
			const assignId = (x) => (x.id = Math.random().toString().slice(2));
			const setHpMax = (x) => (x.hpMax = x.hp);

			const newChar = clone(char);
			assignId(newChar);
			setHpMax(newChar);
			deployed.push(newChar);
		}
	};
};
