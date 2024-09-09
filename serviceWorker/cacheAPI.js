const CACHE_NAME = 'dynamic-cache-v1';
const CACHE_DURATION = 10 /*minutes*/ * 60 * 1000;

export async function fetchAndCache(request) {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(request);
	const now = Date.now();

	if (cachedResponse) {
		const cachedDate = new Date(
			cachedResponse.headers.get('sw-cached-time')
		).getTime();
		if (now - cachedDate < CACHE_DURATION) {
			return cachedResponse;
		}
	}

	console.log({
		_: 'API called',
		url: request.url,
	});
	const networkResponse = await fetch(request);
	const responseClone = networkResponse.clone();
	const headers = new Headers(responseClone.headers);
	headers.append('sw-cached-time', new Date().toUTCString());

	const responseWithHeader = new Response(responseClone.body, {
		status: responseClone.status,
		statusText: responseClone.statusText,
		headers: headers,
	});

	await cache.put(request, responseWithHeader);
	return networkResponse;
}
