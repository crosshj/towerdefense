import { getCurrentVersion } from './version.js';

export const playersSetByToken = ({ currentHash }) => ({
	match: (url) => url.endsWith('/api/teedee/players/setByToken'),
	async handler(url, options) {
		const currentVersion = getCurrentVersion({ currentHash });
		console.log('API: playersSetByToken');
	},
});
