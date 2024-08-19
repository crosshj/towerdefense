// character cache used across iframes (esp. detail page)
const CHARACTER_CACHE_KEY = 'CURRENT_CHAR_DETAIL';
const OPPONENT_TEAM_CACHE_KEY = 'CURRENT_OPPONENT_TEAM';

export function setCurrentCharCache(character) {
	if (typeof character !== 'object') {
		localStorage.removeItem(CHARACTER_CACHE_KEY);
		return;
	}
	const charClone = { ...character };
	delete charClone.image;
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
