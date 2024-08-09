const clone = (obj) => {
	try {
		return JSON.parse(JSON.stringify(obj));
	} catch (e) {
		return obj;
	}
};

function openDB(name, version, { upgrade }) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(name, version);
		request.onupgradeneeded = (event) => {
			upgrade(event.target.result);
		};
		request.onsuccess = (event) => {
			resolve(event.target.result);
		};
		request.onerror = (event) => {
			reject(event.target.error);
		};
	});
}

async function storeToken(token) {
	const db = await openDB('teedee-api-cache', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('tokens')) {
				db.createObjectStore('tokens');
			}
		}
	});
	const tx = db.transaction('tokens', 'readwrite');
	const store = tx.objectStore('tokens');
	store.put(token, 'player-token');
	await tx.done;
}

async function getToken() {
	const db = await openDB('teedee-api-cache', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('tokens')) {
				db.createObjectStore('tokens');
			}
		}
	});
	const tx = db.transaction('tokens', 'readonly');
	const store = tx.objectStore('tokens');
	const request = store.get('player-token');

	return new Promise((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = (event) => {
			reject(event.target.error);
		};
	});
}

async function validateResponse(response) {
	if (!response.ok) {
		// Invalidate the cache if the response status is not ok (2xx)
		await invalidateUserCache();
		throw new Error('Network response was not ok.');
	}

	if (!response.headers.get('Content-Type').includes('application/json')) {
		// Invalidate the cache if the Content-Type is not JSON
		await invalidateUserCache();
		throw new Error('Response is not JSON.');
	}

	try {
		const responseClone = response.clone();
		const responseBody = await responseClone.json();
		if (responseBody.error) {
			console.log({ apiError: responseBody.error });
			// Invalidate the cache if the response body contains an error
			await invalidateUserCache();
			throw new Error('Response contains an error.');
		}
	} catch (error) {
		// Handle JSON parsing errors
		console.log(error);
		await invalidateUserCache();
		throw new Error('Failed to parse JSON.');
	}
}

// Function to modify feathers and feathersUpdate
// used by getByToken and setByToken, exported only for testing
export function feathersModifier(_user, isUpdating) {
	const user = clone(_user);
	const DO_NOT_UPDATE = -1;
	const currentTime = new Date();
	let feathersToAdd = 0;
	const TEN_MINUTES = 10 * 60 * 1000;

	if (
		isUpdating &&
		user.data.feathers < user.data.feathersMax &&
		[undefined, DO_NOT_UPDATE].includes(user.data.feathersUpdate)
	) {
		user.data.feathersUpdate = new Date(
			currentTime.getTime() + TEN_MINUTES
		).toISOString();
		return user;
	}

	if (!user || typeof user !== 'object' || !user.data) {
		throw new Error('Invalid user object');
	}

	if (
		typeof user.data.feathers !== 'number' ||
		typeof user.data.feathersMax !== 'number'
	) {
		throw new Error('Invalid feathers or feathersMax format');
	}

	// should not accumulate when maxed
	if (user.data.feathers >= user.data.feathersMax) {
		user.data.feathersUpdate = DO_NOT_UPDATE;
		return user;
	}

	if (
		user.data.feathersUpdate + '' === '-1' &&
		user.data.feathers < user.data.feathersMax
	) {
		user.data.feathersUpdate = new Date(
			currentTime.getTime() + TEN_MINUTES
		).toISOString();
	}

	const feathersUpdateDate = new Date(user.data.feathersUpdate);
	if (isNaN(feathersUpdateDate.getTime())) {
		user.data.feathersUpdate = undefined;
	}

	// Initialize feathersUpdate if it does not exist
	if (!user.data.feathersUpdate) {
		if (user.data.feathers < user.data.feathersMax) {
			user.data.feathersUpdate = new Date(
				currentTime.getTime() + TEN_MINUTES
			).toISOString();
		} else {
			user.data.feathersUpdate = DO_NOT_UPDATE;
		}
		return user;
	}

	// Calculate feathersToAdd based on the elapsed time since feathersUpdate
	if (user.data.feathers < user.data.feathersMax) {
		if (currentTime > feathersUpdateDate) {
			feathersToAdd = 1;
		}
		const timeElapsed = Math.floor(
			(currentTime - feathersUpdateDate) / TEN_MINUTES
		);
		feathersToAdd += Math.max(timeElapsed, 0);
	}

	// add feathers
	if (user.data.feathers + feathersToAdd > user.data.feathersMax) {
		feathersToAdd = user.data.feathersMax - user.data.feathers;
	}
	user.data.feathers += feathersToAdd;

	// If feathers are now maxed, set feathersUpdate to DO_NOT_UPDATE
	if (user.data.feathers >= user.data.feathersMax) {
		user.data.feathersUpdate = DO_NOT_UPDATE;
	}

	// Update feathersUpdate if needed (far past case)
	if (feathersToAdd > 0 && user.data.feathersUpdate !== DO_NOT_UPDATE) {
		const oldTime = new Date(user.data.feathersUpdate).getTime();
		const newTime = oldTime + TEN_MINUTES * feathersToAdd;
		user.data.feathersUpdate = new Date(newTime).toISOString();
	}

	if (user.data.feathersUpdate !== DO_NOT_UPDATE) {
		// if too far in the future, walk back
		let currentUpdateTime = new Date(user.data.feathersUpdate).getTime();
		const tenMinutesFuture = currentTime.getTime() + TEN_MINUTES;
		const tenMinutesPast = currentTime.getTime() - TEN_MINUTES;
		while (currentUpdateTime > tenMinutesFuture) {
			console.log('next update time is too far in future');
			currentUpdateTime -= TEN_MINUTES;
		}
		while (currentUpdateTime < tenMinutesPast) {
			console.log('next update time is too far in future');
			currentUpdateTime += TEN_MINUTES;
		}
		user.data.feathersUpdate = new Date(currentUpdateTime).toISOString();
	}

	return user;
}

export async function invalidateUserCache() {
	const cache = await caches.open('teedee-api-cache');
	const token = await getToken();
	const cacheKey = `getByToken-${token}`;
	console.log('invalidateUserCache: with key:', cacheKey);
	const deleted = await cache.delete(cacheKey);
	console.log('invalidateUserCache: key deleted:', deleted);

	// delete entire cache
	// const cacheName = 'teedee-api-cache';
	// const cacheNames = await caches.keys();
	// for (const name of cacheNames) {
	// 	if (name === cacheName) {
	// 		await caches.delete(name);
	// 		break;
	// 	}
	// }
}

export async function handleGetByToken(request) {
	const requestBody = await request.clone().json();
	const token = requestBody.token;

	// Create a custom cache key
	const cacheKey = `getByToken-${token}`;

	// Check if we already have the response cached
	const cachedResponse = await caches.match(cacheKey);
	if (cachedResponse) {
		console.log('handleGetByToken: Cache hit for key:', cacheKey);
		const cachedBody = await cachedResponse.json();
		const modifiedBody = feathersModifier(cachedBody);

		// Check if feathersUpdate was initialized and needs to be updated in the cache
		if (
			modifiedBody.data.feathersUpdate &&
			cachedBody.data.feathersUpdate !== modifiedBody.data.feathersUpdate
		) {
			// Create a new response with the modified body
			const newResponse = new Response(JSON.stringify(modifiedBody), {
				status: cachedResponse.status,
				statusText: cachedResponse.statusText,
				headers: cachedResponse.headers
			});

			// Update the cache with the new response
			const cache = await caches.open('teedee-api-cache'); // Replace with your actual cache name
			cache.put(cacheKey, newResponse);
			console.log(
				'handleGetByToken: Cache updated with new feathersUpdate'
			);
		}

		return new Response(JSON.stringify(modifiedBody), {
			status: cachedResponse.status,
			statusText: cachedResponse.statusText,
			headers: cachedResponse.headers
		});
	}

	// Fetch from the network and validate
	let networkResponse;
	try {
		networkResponse = await fetch(request);
		await validateResponse(networkResponse);
	} catch (error) {
		await invalidateUserCache();
		throw error;
	}

	const networkBody = await networkResponse.clone().json();
	const modifiedBody = feathersModifier(networkBody);
	const modifiedResponse = new Response(JSON.stringify(modifiedBody), {
		status: networkResponse.status,
		statusText: networkResponse.statusText,
		headers: networkResponse.headers
	});

	// Cache the response
	const cache = await caches.open('teedee-api-cache');
	await cache.put(cacheKey, modifiedResponse.clone());
	console.log('handleGetByToken: Cached new response with key:', cacheKey);

	// Store the token for future use
	await storeToken(token);

	return modifiedResponse;
}

export async function handleSetByToken(request) {
	let requestBody = await request.clone().json();
	const { token, ...data } = requestBody;
	const user = { token, data };
	const modifiedBody = feathersModifier(user, true /*isUpdating*/);
	console.log({ modifiedBody });

	let networkResponse;
	try {
		networkResponse = await fetch(
			new Request(request, {
				body: JSON.stringify({
					...(modifiedBody?.data || {}),
					token
				}),
				method: request.method,
				headers: request.headers
			})
		);
		await validateResponse(networkResponse);
	} catch (error) {
		// Handle JSON parsing errors
		console.log(error);
		await invalidateUserCache();
		throw error;
	}

	// Modify the response
	const responseClone = await networkResponse.clone().json();
	responseClone.source = 'setByToken';
	responseClone.sourceDate = new Date().toISOString();

	const modifiedResponse = new Response(JSON.stringify(responseClone), {
		status: networkResponse.status,
		statusText: networkResponse.statusText,
		headers: networkResponse.headers
	});

	// Invalidate the cache for the `getByToken` endpoint
	const cache = await caches.open('teedee-api-cache');
	const cacheKey = `getByToken-${token}`;
	await cache.put(cacheKey, modifiedResponse.clone());
	console.log('handleSetByToken: Updating cache with key:', cacheKey);

	return modifiedResponse;
}
