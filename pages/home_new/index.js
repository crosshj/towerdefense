document.addEventListener('DOMContentLoaded', () => {
	setupFullscreenButton();
	setupDialog();
});

async function fullscreen() {
	try {
		if (document.documentElement.requestFullscreen) {
			await document.documentElement.requestFullscreen();
			try {
				await screen.orientation.lock('landscape');
				// document.body.style.backgroundColor = 'black';
			} catch (err) {
				console.error('Failed to lock orientation:', err);
				// document.body.style.backgroundColor = 'orange'; // Orientation lock error
			}
		} else {
			console.error('Fullscreen API is not supported in this browser.');
			// document.body.style.backgroundColor = 'red'; // API not supported
		}
	} catch (err) {
		console.error('Failed to enter fullscreen mode:', err);
		// document.body.style.backgroundColor = 'red'; // Fullscreen error
	}
}

function setupWakeLockIndicator() {
	const wakeLockIndicator = document.createElement('div');
	wakeLockIndicator.id = 'wake-lock-indicator';
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
	refreshButton.id = 'refresh-button';
	refreshButton.addEventListener('click', () => {
		iframe.contentWindow.location.reload();
	});
	document.body.appendChild(refreshButton);
}

function setupIframe() {
	const iframe = document.createElement('iframe');
	iframe.id = 'game-iframe';
	iframe.src = './iframe.html';
	document.body.appendChild(iframe);
	return iframe;
}

function setupFullscreenButton() {
	const fullscreenButton = document.createElement('button');
	fullscreenButton.id = 'fullscreen-button';
	fullscreenButton.innerText = 'Start';
	fullscreenButton.addEventListener('click', async () => {
		keepScreenAwake();
		fullscreenButton.remove();
		fullscreen();
		const iframe = setupIframe();
		setupPageRefreshButton(iframe);
	});
	document.body.appendChild(fullscreenButton);
}

function setupDialog() {
	const dialog = document.createElement('dialog');
	dialog.id = 'dialog';
	document.body.appendChild(dialog);

	const popupDialog = ({ message }) => {
		dialog.innerHTML = `
		<h2>Message</h2>
		<p>${message}</p>
		<button id="close-dialog-button">Close</button>
	`;
		dialog
			.querySelector('#close-dialog-button')
			.addEventListener('click', dialog.close.bind(dialog));
		dialog.showModal();
	};

	window.addEventListener('message', (event) => {
		const { data, origin } = event;
		if (origin !== window.location.origin) {
			console.warn({
				_: 'Received message from untrusted origin:',
				origin,
			});
			return;
		}

		const showMessage =
			data?.type === 'dialog' && typeof data?.message === 'string';
		if (showMessage) {
			popupDialog(data);
		}
	});
}
