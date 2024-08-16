https://web.dev/articles/service-worker-lifecycle

from:
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/updatefound_event

```javascript
const registration = await navigator.serviceWorker.getRegistration();
if (registration) {
	registration.addEventListener('updatefound', () => {
		console.log('Service Worker update found!');
	});
}
```
