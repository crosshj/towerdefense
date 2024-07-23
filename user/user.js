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

const getUserFromAPI = async () => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken)
			throw new Error('missing token, cannot get user from API');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: userToken })
		};
		const user = await fetch(
			'https://datamosh.vercel.app/api/teedee/players/getByToken',
			opts
		).then((x) => x.json());
		if (user.error) throw new Error(user.error);
		return user;
	} catch (e) {
		console.log(e);
		return;
	}
};

const updateUserFromAPI = async (data) => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken)
			throw new Error('missing token, cannot get user from API');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: userToken,
				...data
			})
		};
		const user = await fetch(
			'https://datamosh.vercel.app/api/teedee/players/setByToken',
			opts
		).then((x) => x.json());
		if (user.error) throw new Error(user.error);
		return user;
	} catch (e) {
		return;
	}
};

export const getUser = async () => {
	const apiUser = await getUserFromAPI();
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
		levelInfo: getUserLevelInfo(user.exp, user.rank),
		apiUser
	};
	return thisUser;
};

export const addUserExperience = async (expAmount) => {
	const apiUser = await getUserFromAPI();
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let value = clone(defaultValue);
	try {
		value = JSON.parse(lsValue);
	} catch (e) {}
	value.exp += expAmount;

	await updateUserFromAPI({
		...(apiUser.data || {}),
		rank: value.rank,
		exp: value.exp,
		expModifiedDate: new Date()
	});
	//TODO: when exp causes rank to bump

	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
