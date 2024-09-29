import { unNest } from '/utils/utils.js';
import { loadSounds } from '/visuals/assets/assets.js';
import { enemyOneSpawnTicker } from '../ai/enemyOne.js';

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

// this is for auto-spawning both attackers and defenders
export const spawnTeam = (state) => {
	const { towers } = state;
	const iterate = (char, deployed) => {
		// if (char.type === 'defender') return;

		if (char.spawnTicker) return char.spawnTicker--;
		if (char.type === 'attacker' && !state.auto) {
			return;
		}
		state.actions.spawnCharInstance(char, deployed);
		char.spawnTicker = char.respawn;
	};
	for (const tower of towers) {
		if (tower?.type === 'defender' && tower.ai === 'enemyOne') {
			enemyOneSpawnTicker(state, tower);
			continue;
		}
		for (const char of tower.team) {
			iterate(char, tower.deployed);
		}
	}
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

const withinRange = (isAttack, char, opp) => {
	// make sure units don't overlap
	const variableSpace = Math.floor(Math.random() * 200);
	return isAttack
		? char.x + (char.range + variableSpace) >= opp.x
		: char.x - (char.range + variableSpace) <= opp.x;
};

export const targetOpponents = (state) => {
	const { towers } = state.global();
	towers.forEach((tower, i) => {
		const isAttack = tower.type === 'attacker';
		const opponent = towers[isAttack ? 1 : 0];

		tower.deployed.forEach((char, j) => {
			//if (char.target) return;
			const nearby = [opponent, ...opponent.deployed].filter((opp) =>
				withinRange(isAttack, char, opp)
			);
			if (!nearby.length) return;
			state.towers[i].deployed[j].target = isAttack
				? nearby.sort((a, b) => b - a)[0].id
				: nearby.sort((a, b) => a - b)[0].id;
		});
	});
};

const calculateDamage = ({ attacker, defender }) => {
	const defenderEvades = typeof defender?.evadeChance === 'number';
	const evaded = defenderEvades && Math.random() < defender.evadeChance;
	if (evaded) {
		return { damage: 0, isCriticalHit: false, evaded: true };
	}

	// effective attack power
	const canCrit =
		typeof attacker.critChance === 'number' &&
		typeof attacker.critMult === 'number';
	const isCriticalHit = canCrit && Math.random() <= attacker.critChance;
	const effectiveAttackPower = isCriticalHit
		? attacker.attack * attacker.critMult
		: attacker.attack;

	// defense
	const defense =
		typeof defender.defense === 'number'
			? defender.defense //
			: 0;

	// calculate damage
	const damage = effectiveAttackPower * (100 / (100 + defense));

	return { damage, isCriticalHit, evaded: false };
};

const doAttack = (state) => (attacker) => {
	const defender = state.getById(attacker.target);
	if (!defender) {
		attacker.target = undefined;
		return;
	}

	const { damage, isCriticalHit, evaded } = calculateDamage({
		attacker,
		defender,
	});
	// isCriticalHit && console.log('CRITICAL!');
	// evaded && console.log('EVADED!');

	// apply damage
	if (damage <= 0) {
		return;
	}
	if (Math.random() > 0.85 || isCriticalHit) {
		isCriticalHit && coreSounds.play('swipe1');
		!isCriticalHit && coreSounds.play('punch1');
	}

	defender.hp -= damage;
	if (defender.hp <= 0) {
		defender.status = 'dead';
		attacker.defender = undefined;
	}
};

export const attackOpponents = (state) => {
	const { towers } = state;
	const attacking = [...towers[0].deployed, ...towers[1].deployed].filter(
		(x) => x.target
	);
	attacking.forEach(doAttack(state));
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
	updateDeployedTicks,
};
