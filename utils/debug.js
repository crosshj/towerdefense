let socket;
let ready = false;
let tried = false;
const url = localStorage.getItem('DEBUG_URL');
const enabled = /^wss?:\/\//.test(url);
const queue = [];

function init() {
	if (tried || ready || socket) return;
	tried = true;
	try {
		socket = new WebSocket(url);

		socket.onopen = () => {
			ready = true;
			socket.send(
				JSON.stringify({
					type: 'init',
					time: Date.now(),
					data: 'debug session started',
				})
			);
			flushQueue();
		};

		socket.onerror = socket.onclose = () => {
			socket = null;
			ready = false;
		};
	} catch (e) {
		console.log(e);
	}
}

function send(data) {
	if (ready && socket?.readyState === WebSocket.OPEN) {
		try {
			socket.send(
				JSON.stringify({
					type: 'log',
					data,
					time: Date.now(),
				})
			);
		} catch (e) {
			console.log(e);
		}
	} else {
		queue.push(data);
	}
}

function flushQueue() {
	while (queue.length && socket?.readyState === WebSocket.OPEN) {
		send(queue.shift());
	}
}

export const debug = {
	log: (...args) => {
		const data = args.map((a) =>
			typeof a === 'string' ? a : JSON.stringify(a)
		);
		alert(data);
		console.log(...args);
		if (!enabled) return;
		init();
		send(data);
	},
};
