const API = {
	matchers: [],
	on(match, $) {
		this.matchers.push({ match, $ });
	},
	async fetch(url, opts) {
		const match = this.matchers.find((m) => m.match(url, opts)) || {};
		const intResponse = match.$ && (await match.$(url, opts));
		if (intResponse?.json) {
			return {
				json: async () => intResponse.json,
			};
		}
		console.log('FETCH:', url);
		return await fetch(url, opts);
	},
};

API.on(
	(url) => /\/version$/.test(url),
	async (url, options) => {
		const currentVersion = '0.0.1';
		//will be replaced with GH Action
		const currentHash = '{GIT_COMMIT_HASH}';
		const version = currentHash.includes('_HASH')
			? currentVersion
			: currentVersion + '-' + currentHash.slice(0, 7);
		return { json: { version } };
	}
);

export default API;
