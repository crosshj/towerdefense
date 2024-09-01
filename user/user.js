import { userIconsMap } from '../assets/userIcons/$map.js';
import { getUserLevelInfo } from '../utils/experience.js';
import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_INFO';

const rankToGrade = {
	1: 'normal',
	2: 'master',
	3: 'smaster',
	4: 'umaster',
	5: 'legend',
};

const defaultValue = {
	name: 'Anonymous',
	rank: 1,
	exp: 0,
};

export const getUserFromAPI = async () => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken)
			throw new Error('missing token, cannot get user from API');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: userToken }),
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

export const updateUserFromAPI = async (data) => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken)
			throw new Error('missing token, cannot get user from API');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: userToken,
				...data,
			}),
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

export const getUserImage = async (user) => {
	const map = userIconsMap();
	return map[user?.data?.image || 0];
};

export const getUser = async () => {
	const lsValue = localStorage.getItem(LS_NAME);
	let user;
	try {
		user = {
			...clone(defaultValue),
			...JSON.parse(lsValue),
		};
	} catch (e) {
		user = clone(defaultValue);
	}

	const apiUser = await getUserFromAPI();
	if (apiUser) {
		user.name = apiUser.name || user.name;
		user.rank = apiUser.data.rank || user.rank;
		user.exp = apiUser.data.exp || user.exp;
		localStorage.setItem(
			LS_NAME,
			JSON.stringify({
				name: user.name,
				rank: user.rank,
				exp: user.exp,
			})
		);
	}

	const image = await getUserImage(apiUser);

	const thisUser = {
		auto: localStorage.getItem('auto') === 'true',
		grade: rankToGrade[user.rank],
		levelInfo: getUserLevelInfo(user.exp, user.rank),
		image,
		apiUser,
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
		...(apiUser?.data || {}),
		rank: value.rank,
		exp: value.exp,
		expModifiedDate: new Date(),
	});
	//TODO: when exp causes rank to bump

	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
