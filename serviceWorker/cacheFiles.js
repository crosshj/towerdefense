const sendClientsProgress = async (progress) => {
	const clients = await self.clients.matchAll();
	clients.forEach((client) => {
		client.postMessage({
			type: 'progress',
			progress
		});
	});
};

const isCacheUpdateNeeded = async ({ filesToCache, CACHE_KEY }) => {
	const cache = await caches.open(CACHE_KEY);

	const cachedVersionResponse = await cache.match('version');
	const cachedVersion =
		cachedVersionResponse && (await cachedVersionResponse.text());
	console.log(`
		Cache version: ${cachedVersion}
		SW version: ${self._version}
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

export const cacheFiles = async (event) => {
	// maybe get this from the event?`
	const CACHE_KEY = 'dynamic-cache-v1';

	const filesToCache = event.data.files;
	const isNeeded = await isCacheUpdateNeeded({ CACHE_KEY, filesToCache });
	console.log(`Dynamic Cache update needed: ${isNeeded}`);
	if (!isNeeded) {
		await sendClientsProgress(100);
		return;
	}

	// maybe caches from other installs should be invalidated?
	const cache = await caches.open(CACHE_KEY);
	let cachedCount = 0;

	for (let i = 0; i < filesToCache.length; i++) {
		try {
			const response = await fetch(filesToCache[i], {
				cache: 'no-store'
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
			console.error(
				`Failed to cache ${filesToCache[i]}: ${error.message}`
			);
		}
	}
	await cache.put('version', new Response(self._version));
};
