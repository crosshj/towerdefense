import { debounce } from '../utils/debounce.js';

const LS_NAME = 'STAGE_TRACKING';

const LocalStorageModifier = {
	read: function () {
		let stageTracking = localStorage.getItem(LS_NAME);
		stageTracking = JSON.parse(stageTracking || '{}');
		const currentDate = new Date().toISOString().split('T')[0];
		if (stageTracking.date !== currentDate) {
			stageTracking = {
				date: currentDate,
				count: {},
			};
		}
		return stageTracking;
	},
	iterate: function (stageCode) {
		const currentTrack = LocalStorageModifier.read();
		currentTrack.count[stageCode] = currentTrack.count[stageCode] || 0;
		currentTrack.count[stageCode]++;
		localStorage.setItem(LS_NAME, JSON.stringify(currentTrack));
	},
	write: function (stageTracking) {
		const currentDate = new Date().toISOString().split('T')[0];
		let tracking = clone(stageTracking);
		if (stageTracking.date !== currentDate) {
			tracking = {
				date: currentDate,
				count: {},
			};
		}
		localStorage.setItem(LS_NAME, JSON.stringify(tracking));
	},
};

export const getStageTracking = () => LocalStorageModifier.read();
export const updateStageTracking = (stageCode) =>
	LocalStorageModifier.iterate(stageCode);

export const StageTrackAPIModifier = {
	post: function (apiUserData) {
		apiUserData.stageTrack = LocalStorageModifier.read();
		return apiUserData;
	},
	get: function (apiUser) {
		const currentData = LocalStorageModifier.read();
		const apiData = apiUser?.data?.stageTrack || {};
		const newData = {};

		if (apiData.date > currentData.date) {
			LocalStorageModifier.write(apiData);
			Object.assign(newData, apiData);
		}
		if (apiData.date < currentData.date) {
			Object.assign(newData, currentData);
		}
		if (apiData.date === currentData.date) {
			newData.date = apiData.date;
			newData.count = { ...currentData.count, ...apiData.count };
		}
		apiUser.data.stageTrack = newData;

		return apiUser;
	},
};
