document.addEventListener('DOMContentLoaded', () => {
	setupFullscreenButton();
});

async function fullscreen() {
	try {
		if (document.documentElement.requestFullscreen) {
			await document.documentElement.requestFullscreen();
			try {
				await screen.orientation.lock('landscape');
				document.body.style.backgroundColor = 'black';
			} catch (err) {
				console.error('Failed to lock orientation:', err);
				document.body.style.backgroundColor = 'orange'; // Orientation lock error
			}
		} else {
			console.error('Fullscreen API is not supported in this browser.');
			document.body.style.backgroundColor = 'red'; // API not supported
		}
	} catch (err) {
		console.error('Failed to enter fullscreen mode:', err);
		document.body.style.backgroundColor = 'red'; // Fullscreen error
	}
}

function setupWakeLockIndicator() {
	const wakeLockIndicator = document.createElement('div');
	wakeLockIndicator.style.position = 'fixed';
	wakeLockIndicator.style.bottom = '30px';
	wakeLockIndicator.style.right = '30px';
	wakeLockIndicator.style.width = '15px';
	wakeLockIndicator.style.height = '15px';
	wakeLockIndicator.style.borderRadius = '50%';
	wakeLockIndicator.style.backgroundColor = 'red'; // Default to not active
	wakeLockIndicator.style.zIndex = '1000';
	document.body.appendChild(wakeLockIndicator);
	const updateIndicator = (color) => {
		wakeLockIndicator.style.backgroundColor = color;
	};
	return { update: updateIndicator };
}

async function keepScreenAwake() {
	const indicator = setupWakeLockIndicator();
	let lock = null;
	if ('wakeLock' in navigator) {
		try {
			// log(`Acquire "${type}" button pressed.`);
			lock = await navigator.wakeLock.request('screen');
			indicator.update('green');

			lock.addEventListener('release', () => {
				indicator.update('red');
				lock = null;
			});
		} catch (e) {
			console.error(`${e.name}, ${e.message}`);
			indicator.update('red');
		}
	} else {
		console.log('Wake Lock API not supported');
	}
}

function setupPageRefreshButton(iframe) {
	const refreshButton = document.createElement('button');
	refreshButton.innerText = 'REFRESH';
	refreshButton.style.position = 'fixed';
	refreshButton.style.bottom = '30px';
	refreshButton.style.right = '70px';
	refreshButton.style.zIndex = '1000';
	refreshButton.addEventListener('click', () => {
		iframe.contentWindow.location.reload();
	});
	document.body.appendChild(refreshButton);
}

function setupIframe() {
	const iframe = document.createElement('iframe');
	iframe.src = './iframe.html';
	iframe.style.position = 'fixed';
	iframe.style.top = '0';
	iframe.style.left = '0';
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';
	// iframe.style.zIndex = '999';
	document.body.appendChild(iframe);
	return iframe;
}

function setupFullscreenButton() {
	const fullscreenButton = document.createElement('button');
	fullscreenButton.innerText = 'Go Fullscreen';
	fullscreenButton.style.position = 'fixed';
	fullscreenButton.style.top = '10px';
	fullscreenButton.style.right = '10px';
	fullscreenButton.style.zIndex = '1000';
	fullscreenButton.addEventListener('click', async () => {
		keepScreenAwake();
		fullscreenButton.remove();
		fullscreen();
		const iframe = setupIframe();
		setupPageRefreshButton(iframe);
	});
	document.body.appendChild(fullscreenButton);
}
