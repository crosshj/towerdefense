import { clone } from '/utils/utils.js';
import { getMineralMap } from './mineral.js';
import { spawnMissile } from './update/missile.js';
import { applyGearModifiers } from '../../../user/gear.js';

const mineralMap = getMineralMap();

const spawnCharInstance = (state) => (char, deployed) => {
	const assignId = (x) => (x.id = Math.random().toString().slice(2));
	const setHpMax = (x) => (x.hpMax = x.hp);
	let newChar = clone(char);
	newChar = applyGearModifiers(newChar);

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
				src: '/pages/stage/main/index.html',
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
			// TODO: this is polluted, ui changes should happen in ui - FIX THIS
			if (ui.effect === 'teamSwitch') {
				const [attackerTower] = state.towers;
				attackerTower.selectedTeam =
					attackerTower.selectedTeam === 'a' ? 'b' : 'a';
				ui.updateTeamSwitcher();
				ui.controls.bottom.updateTeam(state);
				return state;
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
			if (!unit) return;
			unit.type = 'attacker';
			unit.x = unit.x || tower.x + 100;
			spawnCharInstance(state)(unit, tower.deployed);
		},
	};
};
