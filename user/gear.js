import { getUserFromAPI } from './user.js';

export const getGear = async () => {
	const apiUser = await getUserFromAPI();
	console.log(apiUser);
};

export const addNewGear = async (gearCode) => {
	const apiUser = await getUserFromAPI();
	console.log(gearCode, apiUser);
};

export const assignGearToUnit = async (gearId, unitId) => {
	const apiUser = await getUserFromAPI();
	console.log(gearId, unitId, apiUser);
};
