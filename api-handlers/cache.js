import { IDBStorage } from '../../utils/IDBStorage.js';
import { getCurrentVersion } from './version.js';
import IDBResponse from '../../utils/IDBResponse.js';

const apiStore = new IDBStorage('APIDB', 'APIStore');
const CACHE_TTL = 1 * 60 * 60 * 1000; // TTL set to 1 hour (in milliseconds)
const DEBUG = false;

// TODO: deprecate _cacheAPI.js

const fetchAndCache = async (url, options, { currentHash }) => {
	const currentVersion = getCurrentVersion({ currentHash });

	const cached = {
		version: await apiStore.get('cacheVersion'),
	};
	if (cached.version !== currentVersion) {
		await apiStore.clear();
		await apiStore.set('cacheVersion', currentVersion);
	}

	const cachedResponse = await apiStore.get(url);
	if (cachedResponse) {
		const response = await IDBResponse.toResponse(cachedResponse);
		const cachedDate = new Date(
			response.headers.get('sw-cached-time')
		).getTime();
		if (Date.now() - cachedDate < CACHE_TTL) {
			DEBUG && console.log('API: cache (cached)');
			return response;
		}
	}

	// otherwise, fetch and cache
	DEBUG && console.log('API: cache (from network)');
	const networkResponse = await fetch(url, options);

	const responseClone = networkResponse.clone();
	const headers = new Headers(responseClone.headers);
	headers.append('sw-cached-time', new Date().toUTCString());
	const responseWithHeader = new Response(responseClone.body, {
		status: responseClone.status,
		statusText: responseClone.statusText,
		headers: headers,
	});
	const storedResponse = await IDBResponse.fromResponse(responseWithHeader);

	await apiStore.set(url, storedResponse);
	return networkResponse;
};

export const apiCacheHandler = ({ currentHash }) => ({
	match: (url) => url.includes('/api/teedee/'),
	async handler(url, options) {
		return fetchAndCache(url, options, { currentHash });
	},
});
