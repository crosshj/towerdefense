import { getUserLevelInfo } from '../utils/experience.js';
import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_INFO';

const rankToGrade = {
	1: 'normal',
	2: 'master',
	3: 'smaster',
	4: 'umaster',
	5: 'legend'
};

const defaultValue = {
	rank: 1,
	exp: 0
};

export const getUser = async () => {
	const lsValue = localStorage.getItem(LS_NAME);
	let user;
	try {
		user = {
			...clone(defaultValue),
			...JSON.parse(lsValue)
		};
	} catch (e) {
		user = clone(defaultValue);
	}
	const thisUser = {
		auto: localStorage.getItem('auto') === 'true',
		grade: rankToGrade[user.rank],
		levelInfo: getUserLevelInfo(user.exp, user.rank)
	};
	return thisUser;
};

export const addUserExperience = async (expAmount) => {
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let value = clone(defaultValue);
	try {
		value = JSON.parse(lsValue);
	} catch (e) {}
	value.exp += expAmount;

	//TODO: when exp causes rank to bump

	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
