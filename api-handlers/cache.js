export const cacheHandler = ({ currentHash }) => ({
	match: (url) => url.startsWith('/api'),
	async handler(url, options) {
		const currentVersion = getCurrentVersion({ currentHash });
		console.log('API: cache');
	},
});
