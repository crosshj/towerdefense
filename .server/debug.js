import http from 'http';
import { WebSocketServer } from 'ws';
import { networkInterfaces } from 'os';
import ngrok from 'ngrok';

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
	const ip = req.socket.remoteAddress;
	logInfo('Client connected', ip);
	console.log('');

	ws.on('message', (msg) => {
		try {
			const parsed = JSON.parse(msg.toString());
			logRemote(parsed.type || 'log', parsed.data, parsed.time);
		} catch {
			logWarn('Invalid message:', msg.toString());
		}
	});

	ws.on('close', () => {
		console.log('');
		logInfo('Client disconnected', ip);
		console.log('');
	});
});

server.listen(8080, '0.0.0.0', async () => {
	const ip = getLocalIP();
	logInfo('WebSocket server running:');
	console.log('  ', bold('ws://localhost:8080'));
	console.log('  ', bold(`ws://${ip}:8080\n`));

	try {
		const url = await ngrok.connect({
			addr: 8080,
			proto: 'http',
			bind_tls: true,
		});
		const wssUrl = url.replace('https://', 'wss://');
		logInfo('Public WSS URL via ngrok:');
		console.log('  ', bold(wssUrl + '\n'));
	} catch (err) {
		logWarn('Failed to start ngrok:', err.message || err);
	}
});

function getLocalIP() {
	const interfaces = networkInterfaces();
	for (const name in interfaces) {
		for (const iface of interfaces[name]) {
			if (iface.family === 'IPv4' && !iface.internal) {
				return iface.address;
			}
		}
	}
	return 'localhost';
}

// Stylized console output
function logInfo(...args) {
	console.log(gray('[info]'), ...args);
}

function logWarn(...args) {
	console.warn(yellow('[warn]'), ...args);
}

function logRemote(type, data, time) {
	const label = type === 'log' ? gray('[log]') : blue(`[${type}]`);
	const ts = time ? gray(new Date(time).toLocaleTimeString()) : '';
	console.log(label, ts, ...[].concat(data));
}

// ANSI color helpers
function gray(str) {
	return `\x1b[90m${str}\x1b[0m`;
}
function blue(str) {
	return `\x1b[34m${str}\x1b[0m`;
}
function yellow(str) {
	return `\x1b[33m${str}\x1b[0m`;
}
function bold(str) {
	return `\x1b[1m${str}\x1b[0m`;
}
