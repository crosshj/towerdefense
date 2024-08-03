import { clone } from '../utils/utils.js';
import { getUserFromAPI, updateUserFromAPI } from './user.js';

const LS_NAME = 'USER_STATS';

const defaultValue = {
	feathers: 300,
	feathersMax: 100,
	gems: 999,
	coins: 1000,
	friendPoints: 3000,
	exp: 0 // this is directly on user?
};

export const getStats = async () => {
	const src = localStorage.getItem(LS_NAME) || '';
	let value = clone(defaultValue);
	try {
		value = JSON.parse(src);
	} catch (e) {}

	const apiUser = await getUserFromAPI();
	if (apiUser) {
		value.feathers = apiUser.data.feathers || value.feathers;
		value.feathersMax = apiUser.data.feathersMax || value.feathersMax;
		value.gems = apiUser.data.gems || value.gems;
		value.coins = apiUser.data.coins || value.coins;
		value.friendPoints = apiUser.data.friendPoints || value.friendPoints;
		localStorage.setItem(
			LS_NAME,
			JSON.stringify({
				feathers: value.feathers,
				feathersMax: value.feathersMax,
				gems: value.gems,
				coins: value.coins,
				friendPoints: value.friendPoints
			})
		);
	}
	return value;
};

export const addStats = async (newValue) => {
	const apiUser = await getUserFromAPI();
	const stats = await getStats();
	for (const k of Object.keys(defaultValue)) {
		if (!newValue[k]) continue;
		stats[k] = stats[k] || 0;
		stats[k] += newValue[k];
	}

	await updateUserFromAPI({
		...(apiUser.data || {}),
		feathers: stats.feathers,
		feathersMax: stats.feathersMax,
		gems: stats.gems,
		coins: stats.coins,
		friendPoints: stats.friendPoints
	});

	localStorage.setItem(LS_NAME, JSON.stringify(stats));
	return stats;
};
