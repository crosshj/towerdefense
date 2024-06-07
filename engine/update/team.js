import { unNest } from '../../utils/utils.js';
import { loadSounds } from '../../visuals/assets.js';
const coreSounds = await loadSounds('coreSounds');

export const moveDeployed = (state) => {
	const { tick, towers } = state;
	const move = (char) => {
		if (char.target) return;
		char.x += char.move;
	};
	const deployed = towers.reduce((all, one) => [...all, ...one.deployed], []);
	deployed.forEach(move);
};

export const spawnTeam = (state) => {
	const { towers } = state;
	const iterate = (char, deployed) => {
		if (char.spawnTicker) return char.spawnTicker--;
		if (char.type === 'attacker' && !state.auto) {
			return;
		}
		state.actions.spawnCharInstance(char, deployed);
		char.spawnTicker = char.respawn;
	};
	const spawn = (tower) =>
		tower.team.forEach((char) => {
			iterate(char, tower.deployed);
		});
	towers.forEach(spawn);
};
/*
export const spawnTeam = (state) => {
	const { towers } = state;
	for (const tower of towers) {
		if (tower.type === 'defender') {
			console.log({ defenderTower: tower });
		}
		for (const unit of tower.team) {
			if (unit.spawnTicker) return unit.spawnTicker--;
			if (tower.type === 'attacker' && !state.auto) {
				continue;
			}
			unit.spawnTicker = unit.respawn;
			state.actions.spawnCharInstance(unit, tower.deployed);
		}
	}
};
*/

export const targetOpponents = (state) => {
	const { towers } = state.global();
	towers.forEach((tower, i) => {
		const isAttack = tower.type === 'attacker';
		const opponent = towers[isAttack ? 1 : 0];
		const withinRange = (char, opp) =>
			isAttack
				? char.x + char.range >= opp.x
				: char.x - char.range <= opp.x;
		tower.deployed.forEach((char, j) => {
			if (char.target) return;
			const nearby = [opponent, ...opponent.deployed].filter((opp) =>
				withinRange(char, opp)
			);
			if (!nearby.length) return;
			state.towers[i].deployed[j].target = isAttack
				? nearby.sort((a, b) => b - a)[0].id
				: nearby.sort((a, b) => a - b)[0].id;
		});
	});
};

export const attackOpponents = (state) => {
	const { towers } = state;
	const attacking = [...towers[0].deployed, ...towers[1].deployed].filter(
		(x) => x.target
	);
	attacking.forEach((attacker) => {
		const target = state.getById(attacker.target);
		if (!target) {
			attacker.target = undefined;
			return;
		}
		let damage = attacker.attack;
		const canCrit =
			typeof attacker.critChance === 'number' &&
			typeof attacker.critMult === 'number';
		let didCrit = false;
		if (canCrit && Math.random() <= attacker.critChance) {
			damage = attacker.attack * attacker.critMult;
			console.log('critical attack');
			didCrit = true;
		}
		if (damage <= 0) {
			return;
		}
		if (Math.random() > 0.85 || didCrit) {
			didCrit && coreSounds.play('swipe1');
			!didCrit && coreSounds.play('punch1');
		}
		target.hp -= damage;
		if (target.hp <= 0) {
			target.status = 'dead';
			attacker.target = undefined;
		}
	});
	towers.forEach((tower) => {
		if (tower.hp <= 0) tower.status = 'dead';
		tower.deployed = tower.deployed.filter((x) => x.status !== 'dead');
	});
};

export const updateDeployedTicks = (state) => {
	unNest(state, 'tower(s)/deployed').forEach(({ tower, deployed }) => {
		deployed.tick =
			typeof deployed.tick === 'undefined' ? -1 : deployed.tick;
		deployed.tick++;
	});
};

export default {
	moveDeployed,
	spawnTeam,
	targetOpponents,
	attackOpponents,
	updateDeployedTicks
};
