import { UserDataStorage as Store } from '../utils/storage.js';

const fromAPI = (currentAPI, currentLS, { lsUpdate }) => {
	//TODO: decompress materials
	//TODO: handle collision
	//TODO: reconsitute materials
	const apiParsed = (currentAPI || '').split(',').reduce((acc, x) => {
		const [k, v] = x.split(':');
		if (!k || k === 'undefined') return acc;
		acc[k] = Number(v);
		return acc;
	}, {});
	//console.log({ _: 'fromAPI', apiParsed, currentLS });

	//TODO: unshitify this poor cache invalidation
	const apiIsNewer =
		Object.keys(apiParsed).length > Object.keys(currentLS).length;
	if (apiIsNewer) {
		lsUpdate(apiParsed);
	}
	return apiParsed;
};

const toAPI = (currentLS = {}) => {
	//TODO: compress materials
	//TODO: handle collision
	//console.log({ _: 'toAPI', currentLS });
	return Object.entries(currentLS)
		.map(([k, v]) => `${k}:${v}`)
		.join(',');
};

export const MaterialsStore = new Store({
	name: 'materials',
	fromAPI,
	toAPI,
});
