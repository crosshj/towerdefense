import { cacheHandler } from '../api-handlers/cache.js';
import { playersGetByToken } from '../api-handlers/playersGetByToken.js';
import { playersSetByToken } from '../api-handlers/playersSetByToken.js';
import { versionHandler } from '../api-handlers/version.js';

const currentHash = '{GIT_COMMIT_HASH}';

const API = {
	matchers: [
		versionHandler({ currentHash }),
		playersGetByToken({ currentHash }),
		playersSetByToken({ currentHash }),
		cacheHandler({ currentHash }),
	],
	async fetch(url, opts) {
		const match = this.matchers.find((m) => m.match(url, opts));
		if (!match) {
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
