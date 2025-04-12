const logEl = document.getElementById('log');

const log = (...args) => {
	const line = args
		.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : a))
		.join(' ');
	logEl.textContent += '\n' + line;
	console.log(...args);
};

function connect() {
	const socket = new WebSocket('ws://192.168.1.19:8080');

	socket.onopen = () => {
		log('[WS] Connected');
		socket.send('Hello from device browser');
	};

	socket.onmessage = (e) => {
		log('[WS] Message:', e.data);
	};

	socket.onerror = (e) => {
		log('[WS] Error:', e);
	};

	socket.onclose = () => {
		log('[WS] Closed');
	};
}
