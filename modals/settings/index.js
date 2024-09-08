import { SVGIcons } from '../../assets/icons.svg.js';
import { getSettings, setSettings } from '../../user/settings.js';
import { getUser, getUserFromAPI, updateUserFromAPI } from '../../user/user.js';
import { IDBStorage } from '../../utils/IDBStorage.js';
import { getVersionString } from './version.js';

const notificationPermitted = async () => {
	if ('Notification' in window && navigator.serviceWorker) {
		if (Notification.permission === 'granted') {
			return true;
		} else {
			const permission = await Notification.requestPermission();
			return permission === 'granted';
		}
	}
	return false;
};

function urlBase64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	var base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	var rawData = window.atob(base64);
	var outputArray = new Uint8Array(rawData.length);

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

const getSubscription = async () => {
	const registration = await navigator.serviceWorker.ready;
	let subscription = await registration.pushManager.getSubscription();

	if (!subscription) {
		//TODO: get vapidPublicKey live from server instead
		const vapidPublicKey = urlBase64ToUint8Array(
			'BHgYzvBsZlUdtzMjBifhO7x-IitcSlLm9sBRiwzeBntu01LT9ZJjAoc832naveLT9pzgBAATmEehlkKmS8VJWcw'
		);
		subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: vapidPublicKey,
		});
	}
	return subscription;
};

const setupPushNotifications = async (_subscription) => {
	const subscription = _subscription || (await getSubscription());

	const user = await getUserFromAPI();
	user.data.subscriptions = user.data.subscriptions || [];
	const existingSub = user.data.subscriptions.find((x) => {
		return (
			x.endpoint === subscription.endpoint &&
			x.keys.p256h === subscription.keys.p256h &&
			x.keys.auth === subscription.keys.auth
		);
	});
	if (!existingSub) {
		user.data.subscriptions.push(subscription);
		await updateUserFromAPI(user.data);
	}

	console.log({ subscription });

	await fetch('https://datamosh.vercel.app/api/teedee/notification/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			subscription,
			payload: 'this is a test notification!',
		}),
	});
};

const resourcesCheck = async ({ reload = true } = {}) => {
	try {
		sessionStorage.removeItem('SESSION_ACTIVE');
		const worker = navigator?.serviceWorker;
		if (worker?.controller) {
			worker.controller.postMessage({
				type: 'clearDynamicCache',
			});
		}
		const unitImageStore = new IDBStorage('ImageDB', 'UnitStore');
		await unitImageStore.clear();
		if (!reload) return;
		window.parent.postMessage({
			_: 'reload',
		});
	} catch (e) {
		console.log(e);
	}
};

const logout = async () => {
	const settings = await getSettings();
	const gameStarted = localStorage.getItem('GAME_STARTED');
	localStorage.clear();
	localStorage.setItem('GAME_STARTED', gameStarted);
	await setSettings(settings);

	sessionStorage.removeItem('SESSION_ACTIVE');
	window.parent.postMessage({
		_: 'reload',
	});
};

const attachSettings = async () => {
	const settings = await getSettings();

	// game
	const bgm = document.getElementById('setting-bgm');
	const sfx = document.getElementById('setting-sfx');
	const anim = document.getElementById('setting-animation-hq');

	bgm.checked = settings.bgm;
	sfx.checked = settings.sfx;
	anim.checked = settings.animationQuality === 'high';

	bgm.addEventListener('change', function () {
		setSettings({ bgm: this.checked });
	});
	sfx.addEventListener('change', function () {
		setSettings({ sfx: this.checked });
	});
	anim.addEventListener('change', function () {
		setSettings({ animationQuality: this.checked ? 'high' : 'low' });
	});

	// alert
	const alerts = [
		'alert-courtesy',
		'alert-event',
		'alert-maxFeather',
		'alert-guildRaid',
		'alert-guild',
		'alert-pvp',
	];
	for (const alert of alerts) {
		const el = document.getElementById(`setting-${alert}`);
		el.checked = settings[alert];
		el.addEventListener('change', async function () {
			if (this.checked && !(await notificationPermitted())) {
				el.checked = false;
				return;
			}
			setSettings({ [alert]: this.checked });
		});
	}

	const testAlertButton = document.querySelector('.testAlert');
	testAlertButton.addEventListener('pointerup', async () => {
		if (!navigator.serviceWorker.controller) {
			console.log('service worker not available');
			return;
		}
		if (!(await notificationPermitted())) {
			console.log('You must enable notifications.');
			return;
		}
		navigator.serviceWorker.controller.postMessage({
			type: 'testNotification',
		});
	});

	const testPushButton = document.querySelector('.testPush');
	testPushButton.addEventListener('pointerup', async () => {
		if (!navigator.serviceWorker.controller) {
			console.log('service worker not available');
			return;
		}
		if (!(await notificationPermitted())) {
			console.log('You must enable notifications.');
			return;
		}
		await setupPushNotifications();
	});

	const resourcesCheckButton = document.querySelector('.resourceCheckButton');
	resourcesCheckButton.addEventListener('pointerup', resourcesCheck);
};

const updateVersionString = async () => {
	const versionSpan = document.querySelector('.versionString');
	const versionString = await getVersionString();
	versionSpan.innerText = versionString;
};

const updateUserPane = async () => {
	const user = await getUser();
	const accountPane = document.querySelector('.tab-pane.account');
	accountPane.innerHTML = `
		<div class="username">NAME: ${user?.apiUser?.name}</div>
		<div class="userCreatedDate">CREATED: ${user?.apiUser?.date_created}</div>
		<div class="userLastLogin">LAST LOGIN: ${user?.apiUser?.last_login}</div>
		<div class="userPushSubs">Push Subscriptions: ${(user?.apiUser?.data?.subscriptions || []).length}</div>
		<button class="logout">LOG OUT</button>
	`;
	const logoutButton = accountPane.querySelector('.logout');
	logoutButton.addEventListener('pointerup', logout);
};

const attachIcons = () => {
	const svgElements = document.querySelectorAll('[class*="svg-"]');

	for (const element of svgElements) {
		const [, svgName] = element.className.match(/(?:^|\s)svg-([^\s]+)/);
		const svgString = (SVGIcons[svgName] || SVGIcons._NO_ICON)();
		element.innerHTML = `
			<div class="svgIconContainer">
				${svgString}
			</div>
			<span>
				${element.innerHTML}
			</span>
		`;
	}
};

document.addEventListener('DOMContentLoaded', async () => {
	await updateVersionString();
	await attachSettings();
	await updateUserPane();

	attachIcons();

	const chooserEl = document.querySelector('.chooser');
	const itemsListEl = document.querySelector('.items-list');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');

		const currentPane = itemsListEl.querySelector('.selected');
		currentPane.classList.remove('selected');
		const newPane = itemsListEl.querySelector(
			`.tab-pane.${e.target.dataset.tab}`
		);
		newPane.classList.add('selected');
	});

	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
});
