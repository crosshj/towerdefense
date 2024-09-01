import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_EFFECTS';

const defaultEffects = {
	meteor: {
		selected: true,
		count: 5,
	},
	ice: {
		selected: true,
		count: 5,
	},
	tornado: {
		selected: true,
		count: 5,
	},
	invincible: {
		selected: true,
		count: 5,
	},
};

export const getEffects = async () => {
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let effects;
	try {
		effects = JSON.parse(lsValue);
	} catch (e) {
		effects = clone(defaultEffects);
	}
	return effects;
};

// player gets an effect as a reward
export const updateEffectsCount = async (newEffects) => {
	const effects = await getEffects();
	for (const key of Object.keys(defaultEffects)) {
		if (!newEffects[key]) continue;
		effects[key] = effects[key] || { selected: true, count: 0 };
		effects[key].count += newEffects[key];
	}
	localStorage.setItem(LS_NAME, JSON.stringify(effects));
};

// save player selections for effects
export const updateEffectsSelect = async (newEffects) => {
	const effects = await getEffects();
	for (const key of Object.keys(defaultEffects)) {
		if (typeof newEffects[key] === 'undefined') continue;
		effects[key] = effects[key] || { selected: true, count: 0 };
		effects[key].selected = newEffects[key];
	}
	localStorage.setItem(LS_NAME, JSON.stringify(effects));
};
