import { loadSounds } from '/visuals/assets/assets.js';
const coreSounds = await loadSounds('coreSounds');

const MISSILE_SPEED = 450;
const MISSILE_ANGLE = 45;
const MISSILE_HEIGHT = 260;
const MISSILE_START_HEIGHT = 350;
const MISSILE_DAMAGE = 3000;
const MISSILE_RANGE = 300;

const getMissileTarget = (opponent) => {
	let nearest = opponent.deployed.sort((a, b) => {
		a.x - b.x;
	})?.[0];
	if (!nearest) {
		return {
			x: opponent.x,
			y: MISSILE_START_HEIGHT
		};
	}
	return {
		x: nearest.x,
		y: MISSILE_START_HEIGHT
	};
};

const getMissileAngle = (missile) => {
	const traveled = missile.x / (missile.target.x - missile.start.x);
	const angle = MISSILE_ANGLE - traveled * 2 * MISSILE_ANGLE;
	return angle;
};
const getMissileHeight = (missile) => {
	const traveled = missile.x / (missile.target.x - missile.start.x);
	const heightDiff = MISSILE_HEIGHT * Math.sin(Math.PI * traveled);
	return missile.start.y - heightDiff;
};

export const spawnMissile = (state, source = 'attacker') => {
	const { towers } = state.global();
	state.missile.charge = 0;
	state.missile.instances = state.missile.instances || [];
	const self = towers.find((x) => x.type === source);
	const opponent = towers.find((x) => x.type !== source);
	const thisMissile = {
		start: {
			x: self.x + self.dims[0] / 2,
			y: MISSILE_START_HEIGHT
		},
		x: self.x + self.dims[0] / 2,
		y: MISSILE_START_HEIGHT,
		target: getMissileTarget(opponent),
		source
	};
	thisMissile.angle = getMissileAngle(thisMissile);
	state.missile.instances.push(thisMissile);
};

export const updateMissiles = (state) => {
	if (!Array.isArray(state?.missile?.instances)) return;
	if (!state.missile.instances.length) return;
	const activeMissiles = [];
	for (const missile of state.missile.instances) {
		const update = missile;
		if (update.exploded) {
			update.exploded += 1;
			if (update.exploded === 4) {
				coreSounds.play('explode1', 1);
			}
			if (update.exploded > 10) continue;
			activeMissiles.push(update);
			continue;
		}
		update.angle = getMissileAngle(update);
		update.x = missile.x + MISSILE_SPEED;
		update.y = getMissileHeight(update);
		if (update.x >= update.target.x) {
			update.x = update.target.x;
			update.y += 70;
			update.angle = -65;
			update.exploded = 1;
		}
		activeMissiles.push(update);
	}
	state.missile.instances = activeMissiles;
};

export const updateMissileDamage = (state) => {
	if (!Array.isArray(state?.missile?.instances)) return;
	if (!state.missile.instances.length) return;
	const exploded = state.missile.instances.filter((x) => x.exploded === 4);
	if (!exploded.length) return;

	const { towers } = state;
	const { towers: towersGlobal } = state.global();
	const deployed = [...towers[0].deployed, ...towers[1].deployed];
	for (const missile of exploded) {
		const opponent = towersGlobal.find((x) => x.type !== missile.source);

		const missileHitHigh = missile.target.x + MISSILE_RANGE;
		const missileHitLow = missile.target.x - MISSILE_RANGE;
		const targetsHit = opponent.deployed
			.filter((target) => {
				return target.x > missileHitLow && target.x < missileHitHigh;
			})
			.map((x) => deployed.find((y) => y.id === x.id));
		for (const target of targetsHit) {
			target.hp -= MISSILE_DAMAGE;
			if (target.hp <= 0) {
				target.status = 'dead';
			}
		}
	}
	towers.forEach((tower) => {
		if (tower.hp <= 0) tower.status = 'dead';
		tower.deployed = tower.deployed.filter((x) => x.status !== 'dead');
	});
};

export default {
	spawnMissile,
	updateMissiles,
	updateMissileDamage
};
