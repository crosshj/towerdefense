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
			// Invalidate the cache if the response body contains an error
			await invalidateUserCache();
			throw new Error('Response contains an error.');
		}
	} catch (error) {
		// Handle JSON parsing errors
		await invalidateUserCache();
		throw new Error('Failed to parse JSON.');
	}
}

export async function invalidateUserCache() {
	const cache = await caches.open('teedee-api-cache');
	await cache.delete('/api/teedee/players/getByToken');
}

export async function handleGetByToken(request) {
	const requestBody = await request.clone().json();
	const token = requestBody.token;

	// Create a custom cache key
	const cacheKey = `getByToken-${token}`;

	// Check if we already have the response cached
	const cachedResponse = await caches.match(cacheKey);
	if (cachedResponse) {
		return cachedResponse;
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

	// Cache the response
	const cache = await caches.open('teedee-api-cache');
	await cache.put(cacheKey, networkResponse.clone());

	// Store the token for future use
	await storeToken(token);

	return networkResponse;
}

export async function handleSetByToken(request) {
	const requestBody = await request.clone().json();
	const token = requestBody.token;

	let networkResponse;
	try {
		networkResponse = await fetch(request);
		await validateResponse(networkResponse);
	} catch (error) {
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

	return modifiedResponse;
}