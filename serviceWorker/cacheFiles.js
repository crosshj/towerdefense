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

const getCacheVersion = async (cache) => {
	const versionResponse = await cache.match('version');
	const version = versionResponse && (await versionResponse.text());
	return version;
};

const getCacheHash = async (cache) => {
	const hashResponse = await cache.match('hash');
	const hash = hashResponse && (await hashResponse.text());
	return hash;
};

const getCachedFileHash = async (cache, url) => {
	const response = await cache.match(url);
	if (!response) return undefined;
	const hash = response.headers.get('X-File-Hash');
	return hash;
};

const isCacheUpdateNeeded = async ({ files, meta, CACHE_KEY }) => {
	const cache = await caches.open(CACHE_KEY);
	// const cachedVersion = await getCacheVersion(cache);
	const cachedHash = await getCacheHash(cache);
	const filesToCache = Object.keys(files);
	const newCacheHash = meta.hash;
	// 	console.log(`
	// Cache version: ${cachedVersion || '[ none ]'}
	// Cache hash: ${cachedHash || '[ none ]'}
	// Cache hash (new): ${newCacheHash || '[ none ]'}
	// SW version: ${self._version || '[ none ]'}
	// 	`);

	if (!cachedHash || cachedHash !== newCacheHash) {
		console.log('Cache update needed: hash mismatch');
		return true;
	}
	// if (!cachedVersion || cachedVersion !== self._version) {
	// 	console.log('Cache update needed: hash mismatch');
	// 	return true;
	// }

	const cachedRequests = await cache.keys();
	const cachedUrls = cachedRequests.map(
		(request) => new URL(request.url).pathname
	);
	const cachedHashes = {};
	for (const file of filesToCache) {
		const filePath = new URL(file, location.origin);
		cachedHashes[filePath.pathname] = await getCachedFileHash(
			cache,
			filePath.href
		);
	}
	const allFilesCached = filesToCache.every((file) => {
		const filePath = new URL(file, location.origin);
		const cacheMatch = cachedUrls.includes(filePath.pathname);
		if (!cacheMatch) {
			console.log(
				'Cache update needed: file missing - ' + filePath.pathname
			);
			return false;
		}
		const newHash = files[file];
		const cachedHash = cachedHashes[filePath.pathname];
		const fileHashMatches = cacheMatch && newHash === cachedHash;
		if (!fileHashMatches) {
			console.log(
				'Cache update needed: file hash mismatch - ' +
					filePath.pathname,
				newHash,
				cachedHash
			);
		}
		return fileHashMatches;
	});
	return !allFilesCached;
};

const getFilesToRefresh = async ({ files, meta, CACHE_KEY }) => {
	const cache = await caches.open(CACHE_KEY);
	const cachedRequests = await cache.keys();
	const cachedUrls = cachedRequests.map(
		(request) => new URL(request.url).pathname
	);
	const filesToCache = Object.keys(files);
	const cachedHashes = {};
	for (const file of filesToCache) {
		const filePath = new URL(file, location.origin);
		cachedHashes[filePath.pathname] = await getCachedFileHash(
			cache,
			filePath.href
		);
	}
	const filesToRefresh = filesToCache.filter((file) => {
		const filePath = new URL(file, location.origin);
		const cacheMatch = cachedUrls.includes(filePath.pathname);
		if (!cacheMatch) return true;
		const newHash = files[file];
		const cachedHash = cachedHashes[filePath.pathname];
		return newHash !== cachedHash;
	});
	return filesToRefresh;
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

const cleanupCachedFiles = async (cache, filesToCache) => {
	const cachedRequests = await cache.keys();
	const cachedUrls = cachedRequests.map(
		(request) => new URL(request.url).pathname
	);
	const filesToDelete = cachedUrls.filter(
		(url) => !filesToCache.includes(url)
	);
	const ignoreFiles = ['/version', '/hash'];
	const deletedFiles = [];
	for (let i = 0; i < filesToDelete.length; i++) {
		try {
			if (ignoreFiles.includes(filesToDelete[i])) {
				continue;
			}
			await cache.delete(filesToDelete[i]);
			deletedFiles.push(filesToDelete[i]);
		} catch (error) {
			console.error(
				`Failed to delete ${filesToDelete[i]}: ${error.message}`
			);
		}
	}
	if (deletedFiles.length) {
		console.log(`Deleted ${deletedFiles.length} files from cache`);
		console.log({ deletedFiles });
	}
};

export const cacheFiles = async (event) => {
	// maybe get this from the event?`
	const CACHE_KEY = 'dynamic-cache-v1';

	const { files, meta } = event.data;

	const isNeeded = await isCacheUpdateNeeded({
		CACHE_KEY,
		files,
		meta,
	});
	console.log(`Dynamic Cache update needed: ${isNeeded}`);
	if (!isNeeded) {
		await sendClientsProgress(100);
		return;
	}

	const filesToRefresh = await getFilesToRefresh({
		CACHE_KEY,
		files,
		meta,
	});
	filesToRefresh?.length && console.log({ filesToRefresh });

	const cache = await caches.open(CACHE_KEY);
	let cachedCount = 0;

	const failedToCache = [];
	const filesToCache = Object.keys(files);

	const timestamp = new Date().getTime();
	for (let i = 0; i < filesToCache.length; i++) {
		try {
			await sendClientsProgressDetail(filesToCache[i]);
			const fileUpdateNeeded = filesToRefresh.includes(filesToCache[i]);
			if (!fileUpdateNeeded) {
				continue;
			}
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
			const responseWithHash = new Response(response.body, {
				headers: {
					'Content-Type': response.headers.get('Content-Type'),
					'Content-Length': response.headers.get('Content-Length'),
					'X-File-Hash': files[filesToCache[i]],
				},
			});
			await cache.put(filesToCache[i], responseWithHash);
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
	await cleanupCachedFiles(cache, filesToCache);

	// unstuck yourself, but WARNING some files were not cached!
	if (failedToCache.length) {
		console.log(failedToCache);
	}
	await sendClientsProgress(100);
	await cache.put('version', new Response(self._version));
	await cache.put('hash', new Response(meta.hash));
};
