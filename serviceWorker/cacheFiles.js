export const cacheFiles = async (event) => {
	const filesToCache = event.data.files;
	// maybe get this from the event?
	const CACHE_KEY = 'dynamic-cache-v1';
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
			const clients = await self.clients.matchAll();
			clients.forEach((client) => {
				client.postMessage({
					type: 'progress',
					progress: progress
				});
			});
		} catch (error) {
			console.error(
				`Failed to cache ${filesToCache[i]}: ${error.message}`
			);
		}
	}
};
