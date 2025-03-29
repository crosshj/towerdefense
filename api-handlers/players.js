import { IDBStorage } from '../../utils/IDBStorage.js';
import { getCurrentVersion } from './version.js';
import { feathersModifier } from './_userHandler.js';
import IDBResponse from '../../utils/IDBResponse.js';

const playerStore = new IDBStorage('PlayerDB', 'PlayerStore');
const CACHE_TTL = 1 * 60 * 60 * 1000; // TTL set to 1 hour (in milliseconds)
const DEBUG = false;

export const playersGetByToken = ({ currentHash }) => ({
	match: (url) => url.endsWith('/api/teedee/players/getByToken'),
	async handler(url, options) {
		const currentVersion = getCurrentVersion({ currentHash });
		let storedResponse;

		// cache first
		const cached = {
			version: await playerStore.get('cacheVersion'),
			cacheDateTime: await playerStore.get('cacheDateTime'),
			player: await playerStore.get('player'),
		};
		const isCacheValid =
			cached.cacheDateTime &&
			Date.now() - cached.cacheDateTime < CACHE_TTL &&
			cached.player?.length === 2 &&
			cached.version === currentVersion;
		if (isCacheValid) {
			DEBUG && console.log('API: playersGetByToken (cached)');
			storedResponse = cached.player;
		}

		// from network + update cache
		if (!storedResponse) {
			DEBUG && console.log('API: playersGetByToken');
			const result = await fetch(url, options);
			storedResponse = await IDBResponse.fromResponse(result);
			await playerStore.set('cacheVersion', currentVersion);
			await playerStore.set('player', storedResponse);
			await playerStore.set('cacheDateTime', Date.now());
		}

		// modify response body to reflect game logic, ie. feathers updated
		storedResponse = IDBResponse.modifyBody(storedResponse, [
			feathersModifier,
		]);

		return IDBResponse.toResponse(storedResponse);
	},
});

export const playersSetByToken = ({ currentHash }) => ({
	match: (url) => url.endsWith('/api/teedee/players/setByToken'),
	async handler(url, options) {
		try {
			const currentVersion = getCurrentVersion({ currentHash });
			const cached = {
				version: await playerStore.get('cacheVersion'),
				cacheDateTime: await playerStore.get('cacheDateTime'),
				player: await playerStore.get('player'),
			};
			const isCacheValid =
				cached.cacheDateTime &&
				Date.now() - cached.cacheDateTime < CACHE_TTL &&
				cached.player?.length === 2 &&
				cached.version === currentVersion;

			console.log('API: playersSetByToken');

			const jsonBody = JSON.parse(options?.body || '{}');
			const { token, ...data } = jsonBody;
			const user = { token, data };
			const modifiedBody = feathersModifier(user, true);

			const networkResponse = await fetch(
				new Request(url, {
					body: JSON.stringify({
						...(modifiedBody?.data || {}),
						token,
					}),
					method: options.method,
					headers: options.headers,
				})
			);

			const responseClone = await networkResponse.clone().json();
			responseClone.source = 'setByToken';
			responseClone.sourceDate = new Date().toISOString();
			responseClone.name = responseClone.name || cached?.player?.name;
			responseClone.date_created =
				responseClone.date_created || cached?.player?.date_created;
			responseClone.last_login =
				responseClone.last_login || cached?.player?.last_login;

			const modifiedResponse = new Response(
				JSON.stringify(responseClone),
				{
					status: networkResponse.status,
					statusText: networkResponse.statusText,
					headers: networkResponse.headers,
				}
			);

			const storedResponse =
				await IDBResponse.fromResponse(modifiedResponse);
			await playerStore.set('cacheVersion', currentVersion);
			await playerStore.set('player', storedResponse);
			await playerStore.set('cacheDateTime', Date.now());

			return modifiedResponse;
		} catch (e) {
			console.log(e);
		}
	},
});
