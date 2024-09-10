import { describe, setAutoRefresh } from '/test/.test.js';
import { charsCompressed, teamsCompressed } from './compress.fixtures.js';
import {
	compressChars,
	compressTeams,
	decompressChars,
	decompressTeams,
} from '../utils/compress.js';

//setAutoRefresh(5000);

describe('Compress Characters', (it) => {
	it.todo('Mocked cases');

	it('should decompress team and characters', ({ expect }) => {
		const decompressed = {};
		decompressed.characters = decompressChars(charsCompressed);
		decompressed.teams = decompressTeams(
			teamsCompressed,
			decompressed.characters
		);

		console.log({ decompressed });

		//TODO: be more thorough
		return expect(Object.keys(decompressed.teams).length).toBe(6);
	});

	it.todo('Live cases');

	it('should compress and decompress end-to-end', ({ expect }) => {
		const store = {};
		store.characters = JSON.parse(localStorage.getItem('USER_CHARACTERS'));
		store.teams = JSON.parse(localStorage.getItem('USER_TEAMS'));

		const compressed = {};
		compressed.characters = compressChars(store.characters);
		compressed.teams = compressTeams(store.teams, store.characters);

		const decompressed = {};
		decompressed.characters = decompressChars(compressed.characters);
		decompressed.teams = decompressTeams(
			compressed.teams,
			decompressed.characters
		);

		console.log({ compressed, decompressed });

		//TODO: be more thorough
		return expect(true).toBe(true);
	});
});
