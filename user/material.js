import { UserDataStorage as Store } from '../utils/storage.js';
import { materials as materialsInfo } from '../$data/materials.js';

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

const fromLS = (lsMaterials) => {
	const materials = {};
	for (const key of Object.keys(lsMaterials)) {
		materials[key] = {
			...materialsInfo[key],
			count: lsMaterials[key],
		};
	}
	return materials;
};

const toLS = (materials) => {
	return Object.entries(materials).reduce((acc, [k, v]) => {
		acc[k] = v?.count || v || 0;
		if (v?.count === null) {
			acc[k] = 0;
		}
		if (typeof v === 'string' && v.includes('[object Object]')) {
			acc[k] = 0;
		}
		return acc;
	}, {});
};

export const MaterialsStore = new Store({
	name: 'materials',
	fromLS,
	toLS,
	fromAPI,
	toAPI,
});
