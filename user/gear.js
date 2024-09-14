import { compressGear, deCompressGear } from '../utils/compress.js';
import { getUserFromAPI, updateUserFromAPI } from './user.js';

export const getGear = async (_apiUser) => {
	const apiUser = _apiUser || (await getUserFromAPI());
	let userGear = [];
	if (apiUser && apiUser.data.gear) {
		userGear = deCompressGear(apiUser.data.gear);
	}
	return userGear;
};

export const addNewGear = async (gear) => {
	const apiUser = await getUserFromAPI();
	const currentGear = await getGear(apiUser);
	currentGear.push(gear);

	const compressedGear = compressGear(currentGear);
	await updateUserFromAPI({
		...(apiUser?.data || {}),
		gear: compressedGear,
	});
};

export const assignGearToUnit = async (gearId, unitId) => {
	const apiUser = await getUserFromAPI();
	console.log(gearId, unitId, apiUser);
};
