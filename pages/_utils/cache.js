// character cache used across iframes (esp. detail page)
const CHARACTER_CACHE_KEY = 'CURRENT_CHAR_DETAIL';

export function setCurrentCharCache(character) {
	if (typeof character !== 'object') {
		sessionStorage.removeItem(CHARACTER_CACHE_KEY);
		return;
	}
	const charClone = { ...character };
	delete charClone.image;
	sessionStorage.setItem(CHARACTER_CACHE_KEY, JSON.stringify(charClone));
}

export function getCurrentCharCache() {
	const storedCharacter = JSON.parse(
		sessionStorage.getItem(CHARACTER_CACHE_KEY) || 'null'
	);
	if (typeof storedCharacter !== 'object') return;

	storedCharacter.image = new Image();
	storedCharacter.image.src = storedCharacter.imageUri;

	return storedCharacter;
}
