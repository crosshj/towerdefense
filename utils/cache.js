// character cache used across iframes (esp. detail page)
const CHARACTER_CACHE_KEY = 'CURRENT_CHAR_DETAIL';
const OPPONENT_TEAM_CACHE_KEY = 'CURRENT_OPPONENT_TEAM';
const UNITS_FILTER_CACHE_KEY = 'UNITS_FILTER';
const GEAR_CACHE_KEY = 'CURRENT_GEAR';

export function setCurrentCharCache(character) {
	if (typeof character !== 'object') {
		localStorage.removeItem(CHARACTER_CACHE_KEY);
		return;
	}
	const charClone = { ...character };
	delete charClone.image;

	if (!charClone.experience) {
		const userChars = JSON.parse(
			localStorage.getItem('USER_CHARACTERS') || '[]'
		);
		const thisUserChar = userChars.find((x) => x.id === charClone.id);
		if (thisUserChar?.experience) {
			charClone.experience = thisUserChar.experience;
		}
		if (thisUserChar?.professorPoints) {
			charClone.professorPoints = thisUserChar.professorPoints;
		}
	}

	localStorage.setItem(CHARACTER_CACHE_KEY, JSON.stringify(charClone));
}

export function getCurrentCharCache() {
	const storedCharacter = JSON.parse(
		localStorage.getItem(CHARACTER_CACHE_KEY) || 'null'
	);
	if (typeof storedCharacter !== 'object' || storedCharacter === null) return;

	storedCharacter.image = new Image();
	storedCharacter.image.src = storedCharacter.imageUri;

	return storedCharacter;
}

export function setOpponentTeamCache(team) {
	if (typeof team !== 'object') {
		localStorage.removeItem(OPPONENT_TEAM_CACHE_KEY);
		return;
	}
	localStorage.setItem(OPPONENT_TEAM_CACHE_KEY, JSON.stringify(team));
}

export function getOpponentTeamCache() {
	const storedTeam = JSON.parse(
		localStorage.getItem(OPPONENT_TEAM_CACHE_KEY) || 'null'
	);
	if (typeof storedTeam !== 'object') return;
	return storedTeam;
}

export function setUnitsFilterCache(filter) {
	if (!Array.isArray(filter)) {
		localStorage.removeItem(UNITS_FILTER_CACHE_KEY);
		return;
	}
	localStorage.setItem(UNITS_FILTER_CACHE_KEY, JSON.stringify(filter));
}

export function getUnitsFilterCache() {
	const filter = JSON.parse(
		localStorage.getItem(UNITS_FILTER_CACHE_KEY) || 'null'
	);
	if (!Array.isArray(filter)) return;
	return filter;
}

export function setCurrentGearCache(gear) {
	if (typeof gear !== 'object') {
		localStorage.removeItem(GEAR_CACHE_KEY);
		return;
	}
	localStorage.setItem(GEAR_CACHE_KEY, JSON.stringify(gear));
}

export function getCurrentGearCache() {
	const gear = JSON.parse(localStorage.getItem(GEAR_CACHE_KEY) || 'null');
	if (typeof gear !== 'object' || gear === null) return;
	return gear;
}
