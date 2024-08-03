import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_STATS';

const defaultValue = {
	feathers: 300,
	feathersMax: 100,
	gems: 999,
	coins: 1000,
	friendPoints: 3000,
	exp: 0
};

export const getStats = async () => {
	const src = localStorage.getItem(LS_NAME) || '';
	let value = clone(defaultValue);
	try {
		value = JSON.parse(src);
	} catch (e) {}
	return value;
};

export const addStats = async (newValue) => {
	const stats = await getStats();
	for (const k of Object.keys(defaultValue)) {
		if (!newValue[k]) continue;
		stats[k] = stats[k] || 0;
		stats[k] += newValue[k];
	}
	localStorage.setItem(LS_NAME, JSON.stringify(stats));
	return stats;
};
