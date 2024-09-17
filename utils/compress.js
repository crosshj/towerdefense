import { gearAll, gearIndex } from '../$data/gearAll.js';
import { clone, generateUUID } from './utils.js';
import { unitsAll } from '/$data/unitsAll.js';

const allTeamNames = [
	'Team 1',
	'Team 2',
	'Team 3',
	'Team 4',
	'Team 5',
	'Defense',
];

const getCharacterSet = (asciiOnly = false) => {
	const nums = '0123456789';
	const lets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const othlets = `ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ`;
	const symbs = `×÷!#$%&*+-:;<=>?@[^_|~¢£¤¥¦§©ª«¬®¯±°¹²³µ¶»¼½¾`;
	const othUni = `‰‱⁂⁄⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞←↑→↓↔↕↖↗↘↙↺↻`; // Characters with codes > 255

	let allChars = nums + lets + symbs + othlets;
	if (!asciiOnly) {
		allChars += othUni;
	}
	const uniqueChars = [...new Set(allChars)];
	return uniqueChars;
};

function encodeNumber(num, characterSet) {
	try {
		if (num + '' === '0') return '0';
		if (!num) return '¿';
		let result = '';
		const base = characterSet.length;
		while (num > 0) {
			result = characterSet[num % base] + result;
			num = Math.floor(num / base);
		}
		return result;
	} catch (e) {
		return '¿';
	}
}

function decodeNumber(str, characterSet) {
	try {
		if (str === '0') return 0;
		if (str === '¿') return undefined;
		let result = 0;
		const base = characterSet.length;
		for (let i = 0; i < str.length; i++) {
			result = result * base + characterSet.indexOf(str[i]);
		}
		return result;
	} catch (e) {
		return undefined;
	}
}

export const compressChars = (lsCharacters, baseLength = 36) => {
	const characterSet = getCharacterSet(true).slice(0, baseLength);
	const encode = (num) => encodeNumber(num, characterSet);
	const compressed = lsCharacters
		.map((char, i) => {
			const unitsIndex = encode(
				Object.keys(unitsAll).findIndex((key) => char.code === key)
			);
			const exp = encode(Math.floor((char.experience || 0) / 100));
			const uncapped = char.uncapped || char.uncappedLevel || 0;
			const gearWeapon = char.gearWeapon
				? encode(char.gearWeapon.replace('-localid', ''))
				: '';
			const gearArmor = char.gearArmor
				? encode(char.gearArmor.replace('-localid', ''))
				: '';
			const gearAccessory = char.gearAccessory
				? encode(char.gearAccessory.replace('-localid', ''))
				: '';
			const profPoints = encode(char.professorPoints || 1);
			const locked = char.locked === true ? 1 : 0;

			return [
				char.uuid || encode(i),
				unitsIndex,
				exp,
				uncapped,
				gearWeapon,
				gearArmor,
				gearAccessory,
				profPoints,
				locked,
			].join(',');
		})
		.join('\n');
	return compressed + `\n-----\n${characterSet.join('')}\n-----\n`;
};

export const decompressChars = (compedString) => {
	if (!compedString || typeof compedString !== 'string') {
		return [];
	}

	const [compressedData, charSet] = compedString.split('-----');
	const characterSet = charSet.trim().split('');
	const decode = (str) => decodeNumber(str, characterSet);

	const lines = compressedData.trim().split('\n');
	return lines.map((line, i) => {
		const [
			index,
			unitsIndex,
			exp,
			uncapped,
			_gearWeapon,
			_gearArmor,
			_gearAccessory,
			profPoints,
			locked = 0,
		] = line.split(',');

		const gearWeapon = _gearWeapon
			? decode(_gearWeapon) + '-localid'
			: undefined;
		const gearArmor = _gearArmor
			? decode(_gearArmor) + '-localid'
			: undefined;
		const gearAccessory = _gearAccessory
			? decode(_gearAccessory) + '-localid'
			: undefined;

		return {
			index,
			id: i + '-localid',
			code: Object.keys(unitsAll)[decode(unitsIndex)],
			experience: decode(exp) * 100,
			uncappedLevel: Number(uncapped),
			gearWeapon,
			gearArmor,
			gearAccessory,
			professorPoints: profPoints ? decode(profPoints) : 1,
			locked: locked + '' === '1' ? true : false,
		};
	});
};

export const compressTeams = (lsTeam, lsCharacters, baseLength = 36) => {
	const characterSet = getCharacterSet(true).slice(0, baseLength);
	const encode = (num) => encodeNumber(num, characterSet);
	const compressed = [];
	for (const teamName of allTeamNames) {
		const team = [];
		for (const subteam of ['a', 'b']) {
			for (const index of [0, 1, 2, 3, 4]) {
				const thisChar = lsTeam[teamName][subteam][index];
				if (!thisChar) {
					team.push(encode(false));
					continue;
				}
				if (thisChar.id + '' === 'undefined') {
					team.push(encode(false));
					continue;
				}
				const charIndex = lsCharacters.findIndex(
					(x) => x.id === thisChar.id
				);
				team.push(encode(charIndex));
			}
		}
		compressed.push(team.join(','));
	}
	const compressedOut = compressed.join('\n');
	return compressedOut + `\n-----\n${characterSet.join('')}\n-----\n`;
};

export const decompressTeams = (compedString, characters, baseLength = 36) => {
	try {
		const [compressedData, charSet] = compedString.split('-----');
		const characterSet = charSet.trim().split('');
		const decode = (str) => decodeNumber(str, characterSet);

		const lines = compressedData.trim().split('\n');
		let teamIndex = 0;

		const teams = {};
		for (const teamName of allTeamNames) {
			teams[teamName] = { a: [], b: [] };
			const charCodes = lines[teamIndex].split(',');
			for (const subteam of ['a', 'b']) {
				for (let i = 0; i < 5; i++) {
					const charIndex = decode(
						charCodes[subteam === 'a' ? i : 5 + i]
					);
					const { id } = characters[charIndex] || {};
					teams[teamName][subteam].push({ id });
				}
			}
			teamIndex++;
		}
		return teams;
	} catch (e) {
		console.log(e);
		return {};
	}
};

const getPercentageInRange = (rangeStr, value) => {
	if (!isNaN(rangeStr)) return 100;
	const [min, max] = rangeStr.replace('%', '').split(' - ').map(Number);
	if (isNaN(min) || isNaN(max)) return 100;
	if (min === max) return 100;
	return Math.round((100 * (value - min)) / (max - min));
};

const getValueFromPercentage = (rangeStr, percentage) => {
	if (!isNaN(rangeStr)) return rangeStr;
	const [min, max] = rangeStr.replace('%', '').split(' - ').map(Number);
	if (isNaN(min) || isNaN(max)) return min || max;
	if (min === max) return min;
	const value = min + (percentage / 100) * (max - min);
	return rangeStr.includes('%') ? value.toFixed(2) + '%' : Math.round(value);
};

export const compressGear = (gear, baseLength = 36) => {
	const characterSet = getCharacterSet(true).slice(0, baseLength);
	const encode = (num) => encodeNumber(num, characterSet);

	const gearCompressMap = (gearItem, i) => {
		const gearDef = gearAll[gearItem.code];
		const index = encode(gearIndex.indexOf(gearItem.code));

		const pFromK = (prop, index) => {
			try {
				const [key, range] = Object.entries(gearDef[prop])[index];
				const value = gearItem[prop][key];
				return getPercentageInRange(range, value);
			} catch (e) {
				return '';
			}
		};
		const properties = {
			id: gear.uuid || encode(i),
			index,
			locked: gearItem.locked ? 1 : 0,
			ef1: encode(pFromK('effects', 0)),
			ef2: encode(pFromK('effects', 1)),
			ef3: encode(pFromK('effects', 2)),
			ef4: encode(pFromK('effects', 3)),
			sw: '',
			swWhich: '',
			swUnlimit: '',
			sk1: '',
			sk2: '',
			sk3: '',
			sk4: '',
		};
		return Object.values(properties).join(',');
	};
	const compressed = gear.map(gearCompressMap).join('\n');
	return compressed + `\n-----\n${characterSet.join('')}\n-----`;
};

export const deCompressGear = (compedString) => {
	if (!compedString || typeof compedString !== 'string') {
		return [];
	}
	const [compressedData, charSet] = compedString.split('-----');
	const characterSet = charSet.trim().split('');
	const decode = (str) => decodeNumber(str, characterSet);

	const lines = compressedData.trim().split('\n');
	return lines.map((line, i) => {
		const [
			id,
			index,
			locked,
			ef1,
			ef2,
			ef3,
			ef4,
			sw,
			swWhich,
			swUnlimit,
			sk1,
			sk2,
			sk3,
			sk4,
		] = line.split(',');
		const code = gearIndex[decode(index)];
		const gearDef = gearAll[code];
		const gearInstance = clone(gearDef);

		for (const [i, effectComped] of Object.entries([ef1, ef2, ef3, ef4])) {
			const defEntry = Object.entries(gearDef.effects)[i];
			if (!defEntry) continue;
			const [key, range] = defEntry;
			const effectValue = decode(effectComped);
			gearInstance.effects[key] = getValueFromPercentage(
				range,
				effectValue
			);
		}
		return {
			//index,
			id: i + '-localid',
			code: gearIndex[decode(index)],
			locked: locked + '' === '1' ? true : false,
			...gearInstance,
		};
	});
};
