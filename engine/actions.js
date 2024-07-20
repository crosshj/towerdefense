import { clone } from '../utils/utils.js';
import { getMineralMap } from './mineral.js';
import { spawnMissile } from './update/missile.js';

const mineralMap = getMineralMap();

const spawnCharInstance = (state) => (char, deployed) => {
	const assignId = (x) => (x.id = Math.random().toString().slice(2));
	const setHpMax = (x) => (x.hpMax = x.hp);
	const newChar = clone(char);
	assignId(newChar);
	setHpMax(newChar);
	deployed.push(newChar);
	if (char.type === 'attacker') {
		state.mineral.amount -= char.mineralCost || 100;
	}
	state.assets.initChar(newChar);
	return newChar;
};

export const getActions = (state) => {
	return {
		restartGame: () => {
			document.location.reload();
		},
		mainMenu: () => {
			window.parent.postMessage({
				_: 'navigate',
				src: '/pages/mainStage/index.html'
			});
		},
		pauseToggle: () => {
			state.paused = !state.paused;
		},
		autoToggle: () => {
			state.auto = !state.auto;
			localStorage.setItem('auto', state.auto);
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
			spawnCharInstance(state)(char, deployed);
		},
		deployUnit: ({ unitId, tower }) => {
			const unit = tower.teams[0][tower.selectedTeam].find(
				(x) => x.unit === unitId
			);
			unit.type = 'attacker';
			unit.x = unit.x || tower.x + 100;
			spawnCharInstance(state)(unit, tower.deployed);
		}
	};
};
