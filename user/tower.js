import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_TOWER';

/*
https://rangers.lerico.net/en/machine-upgrade-book
*/

const defaultValue = {
	level: 100,
	dims: [200, 343],
	x: 200,
	color: '#00e5e6',
	hp: 30000,
};

export const getTower = async () => {
	const lsValue = localStorage.getItem(LS_NAME);
	if (!lsValue) {
		return clone(defaultValue);
	}
	try {
		return {
			...clone(defaultValue),
			...JSON.parse(lsValue),
		};
	} catch (e) {
		return clone(defaultValue);
	}
};
