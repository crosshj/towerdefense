const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
	url,
	options = {},
	retries = 3,
	backoff = 500
) => {
	try {
		const response = await fetch(url, options);
		if (!response.ok)
			throw new Error(`Request failed with status ${response.status}`);
		return response;
	} catch (error) {
		if (retries > 0) {
			console.warn(`Retrying fetch for ${url}. Retries left: ${retries}`);
			await delay(backoff);
			return fetchWithRetry(url, options, retries - 1, backoff * 2); // Exponential backoff
		} else {
			console.error(`Failed to fetch ${url} after multiple retries.`);
			throw error;
		}
	}
};

const sendClientsProgress = async (progress) => {
	const clients = await self.clients.matchAll();
	clients.forEach((client) => {
		client.postMessage({
			type: 'progress',
			progress,
		});
	});
};

const sendClientsProgressDetail = async (file) => {
	const clients = await self.clients.matchAll();
	clients.forEach((client) => {
		client.postMessage({
			type: 'progress',
			progressDetail: file,
		});
	});
};

const isCacheUpdateNeeded = async ({ filesToCache, CACHE_KEY }) => {
	const cache = await caches.open(CACHE_KEY);

	const cachedVersionResponse = await cache.match('version');
	const cachedVersion =
		cachedVersionResponse && (await cachedVersionResponse.text());
	console.log(`
		Cache version: ${cachedVersion || '[ none ]'}
		SW version: ${self._version || '[ none ]'}
	`);
	if (!cachedVersion || cachedVersion !== self._version) return true;

	const cachedRequests = await cache.keys();
	const cachedUrls = cachedRequests.map(
		(request) => new URL(request.url).pathname
	);
	const filesMissingFromCache = [];
	const allFilesCached = filesToCache.every((file) => {
		const filePathname = new URL(file, location.origin).pathname;
		const cacheMatch = cachedUrls.includes(filePathname);
		if (!cacheMatch) filesMissingFromCache.push(file);
		return cacheMatch;
	});

	console.log(`
		Missing files from cache: ${filesMissingFromCache.length}
	`);
	if (!allFilesCached) return true;

	return false;
};

export const clearCache = async () => {
	// delete entire cache
	const CACHE_KEY = 'dynamic-cache-v1';
	const cacheNames = await caches.keys();
	for (const name of cacheNames) {
		if (name !== CACHE_KEY) continue;
		await caches.delete(name);
		break;
	}
};

export const cacheFiles = async (event) => {
	// maybe get this from the event?`
	const CACHE_KEY = 'dynamic-cache-v1';

	const filesToCache = event.data.files;

	// TODO: if filesToCache is an object versus an array, then we need to handle that

	const isNeeded = await isCacheUpdateNeeded({ CACHE_KEY, filesToCache });
	console.log(`Dynamic Cache update needed: ${isNeeded}`);
	if (!isNeeded) {
		await sendClientsProgress(100);
		return;
	}

	// maybe caches from other installs should be invalidated?
	const cache = await caches.open(CACHE_KEY);
	let cachedCount = 0;

	const failedToCache = [];

	const timestamp = new Date().getTime();
	for (let i = 0; i < filesToCache.length; i++) {
		try {
			await sendClientsProgressDetail(filesToCache[i]);
			const separator = filesToCache[i].includes('?') ? '&' : '?';
			const urlWithCacheBusting = `${filesToCache[i]}${separator}v=${timestamp}`;
			const response = await fetchWithRetry(urlWithCacheBusting, {
				cache: 'no-store',
			});
			if (!response.ok) {
				throw new Error(
					`Request for ${filesToCache[i]} failed with status ${response.status}`
				);
			}
			await cache.put(filesToCache[i], response.clone());
			cachedCount++;
			const progress = (cachedCount / filesToCache.length) * 100;
			sendClientsProgress(progress);
		} catch (error) {
			failedToCache.push(`${filesToCache[i]}: ${error.message}`);
			console.error(
				`Failed to cache ${filesToCache[i]}: ${error.message}`
			);
		}
	}
	// unstuck yourself, but WARNING some files were not cached!
	if (failedToCache.length) {
		console.log(failedToCache);
	}
	await sendClientsProgress(100);
	await cache.put('version', new Response(self._version));
};
