// import { getCharacters } from '../user/characters.js';
// import { getTeams } from '../user/teams.js';
import {
	compressChars,
	compressTeams,
	decompressChars,
	decompressTeams,
} from '../utils/compress.js';

const byteSize = (input) => {
	/* prettier-ignore */
	const str =typeof input === "string"
		? input
		: JSON.stringify(input);
	return new Blob([str]).size;
};

const onLoaded = async () => {
	const lsCharacters = JSON.parse(localStorage.getItem('USER_CHARACTERS'));
	const lsTeams = JSON.parse(localStorage.getItem('USER_TEAMS'));

	// compress
	const BASE_LENGTH = 36;
	const teams = compressTeams(lsTeams, lsCharacters, BASE_LENGTH);
	const characters = compressChars(lsCharacters, BASE_LENGTH);

	// decompress
	const decomChars = decompressChars(characters);
	const decomTeams = decompressTeams(teams, decomChars);

	// stats
	const size = {
		characters: {
			compressed: byteSize(characters),
			decompressed: byteSize(decomChars),
		},
		teams: {
			compressed: byteSize(teams),
			decompressed: byteSize(decomTeams),
		},
	};
	size.characters.savings = (
		((size.characters.decompressed - size.characters.compressed) /
			size.characters.decompressed) *
		100
	).toFixed(2);
	size.teams.savings = (
		((size.teams.decompressed - size.teams.compressed) /
			size.teams.decompressed) *
		100
	).toFixed(2);

	// compress UI
	const compressedAllCharsEl = document.querySelector('.compressedAllChars');
	compressedAllCharsEl.innerText = characters;
	const compressedTeamsEl = document.querySelector('.compressedTeams');
	compressedTeamsEl.innerText = teams;

	// decompress UI
	const decompressedAllCharsEl = document.querySelector('.decomAllChars');
	decompressedAllCharsEl.innerText = JSON.stringify(decomChars, null, 2);
	const decompressedTeamsEl = document.querySelector('.decomTeams');
	decompressedTeamsEl.innerText = JSON.stringify(decomTeams, null, 2);

	// sizes UI
	const sizesEl = document.querySelector('.statistics');
	sizesEl.innerText = JSON.stringify(size, null, 2);
};
document.addEventListener('DOMContentLoaded', onLoaded);
