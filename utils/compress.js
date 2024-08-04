import { generateUUID } from './utils.js';
import { unitsAll } from '/$data/unitsAll.js';

const allTeamNames = [
	'Team 1',
	'Team 2',
	'Team 3',
	'Team 4',
	'Team 5',
	'Defense'
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
			const exp = encode((char.experience || 0) / 100);
			const uncapped = char.uncapped || 0;
			const gear1 = encode(char.gear1);
			const gear2 = encode(char.gear2);
			const gear3 = encode(char.gear3);
			return [
				encode(i),
				unitsIndex,
				exp,
				uncapped,
				gear1,
				gear2,
				gear3
			].join(',');
		})
		.join('\n');
	return compressed + `\n-----\n${characterSet.join('')}\n-----\n`;
};

export const decompressChars = (compedString) => {
	const [compressedData, charSet] = compedString.split('-----');
	const characterSet = charSet.trim().split('');
	const decode = (str) => decodeNumber(str, characterSet);

	const lines = compressedData.trim().split('\n');
	return lines.map((line, i) => {
		const [index, unitsIndex, exp, uncapped, gear1, gear2, gear3] =
			line.split(',');
		return {
			id: i + '-localid',
			code: Object.keys(unitsAll)[decode(unitsIndex)],
			experience: decode(exp) * 100,
			uncapped: Number(uncapped),
			gear1: decode(gear1),
			gear2: decode(gear2),
			gear3: decode(gear3)
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
					compressed.push('-');
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

export const decompressTeams = (compedString, characters) => {
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
				const { id } = characters[charIndex];
				teams[teamName][subteam].push({ id });
			}
		}
		teamIndex++;
	}
	return teams;
};
