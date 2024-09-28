import {
	compressGear,
	decompressChars,
	deCompressGear,
} from '../utils/compress.js';
import { clone } from '../utils/utils.js';
import { updateAllChars } from './characters.js';
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
	try {
		const apiUser = await getUserFromAPI();
		const allUnits = decompressChars(apiUser.data.characters);
		const allGear = deCompressGear(apiUser.data.gear);

		const gear = allGear.find((x) => x.id === gearId);
		const unit = allUnits.find((x) => x.id === unitId);

		if (!gear) throw new Error('cannot find gear');
		if (!unit) throw new Error('cannot find unit');

		if (gear.type === 'accessory') {
			unit.gearAccessory = gear.id;
		}
		if (gear.type === 'armor') {
			unit.gearArmor = gear.id;
		}
		if (gear.type === 'weapon') {
			unit.gearWeapon = gear.id;
		}
		await updateAllChars(allUnits, apiUser);
		return { error: false };
	} catch (e) {
		return { error: e.message };
	}
};

export const getGearModifiers = (unit) => {
	const modTotals = {};
	for (const { effects } of Object.values(unit?.gear || {})) {
		for (const [key, value] of Object.entries(effects || {})) {
			modTotals[key] = (modTotals[key] || 0) + value;
			if (['physicalDefense', 'magicalDefense'].includes(key)) {
				modTotals.defense = (modTotals.defense || 0) + value;
			}
			if (['physicalAttack', 'magicalAttack'].includes(key)) {
				modTotals.attack = (modTotals.attack || 0) + value;
			}
		}
	}
	return modTotals;
};

export const applyGearModifiers = (unit) => {
	const unitModded = clone(unit);
	for (const { effects } of Object.values(unit?.gear || {})) {
		for (const [key, value] of Object.entries(effects || {})) {
			unitModded[key] = (unitModded[key] || 0) + value;
			if (['physicalDefense', 'magicalDefense'].includes(key)) {
				unitModded.defense = (unitModded.defense || 0) + value;
			}
			if (['physicalAttack', 'magicalAttack'].includes(key)) {
				unitModded.attack = (unitModded.attack || 0) + value;
			}
		}
	}
	return unitModded;
};
