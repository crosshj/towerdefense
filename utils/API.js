import { versionHandler } from '../api-handlers/version.js';
import {
	playersGetByToken,
	playersSetByToken,
	playersGetPvP,
} from '../api-handlers/players.js';
import { apiCacheHandler } from '../api-handlers/cache.js';

const currentHash = '{GIT_COMMIT_HASH}';

const API = {
	matchers: [
		versionHandler({ currentHash }),
		playersGetByToken({ currentHash }),
		playersSetByToken({ currentHash }),
		playersGetPvP({ currentHash }),
		apiCacheHandler({ currentHash }), // api cache handler, must be last
	],
	async fetch(url, opts) {
		const match = this.matchers.find((m) => m.match(url, opts));
		if (!match) {
			debugger;
			console.log('API: unmatched ', url);
			return await fetch(url, opts);
		}
		const { handler: $ } = match;
		const intResponse = $ && (await $(url, opts));

		if (intResponse instanceof Response) {
			return intResponse;
		}
		if (intResponse?.json) {
			return {
				json: async () => intResponse.json,
			};
		}
		return await fetch(url, opts);
	},
};

export default API;
