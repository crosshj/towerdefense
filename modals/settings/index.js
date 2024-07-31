import { getSettings, setSettings } from '../../user/settings.js';
import { getUser } from '../../user/user.js';
import { getVersionString } from './version.js';

const notificationPermitted = async () => {
	if ('Notification' in window && navigator.serviceWorker) {
		if (Notification.permission === 'granted') {
			return true;
		} else if (Notification.permission !== 'denied') {
			const permission = await Notification.requestPermission();
			return permission === 'granted';
		}
	}
	return false;
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
		'alert-pvp'
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
			type: 'testNotification'
		});
	});
};

const updateVersionString = () => {
	const versionSpan = document.querySelector('.versionString');
	const versionString = getVersionString();
	versionSpan.innerText = versionString;
};

const updateUserPane = async () => {
	const user = await getUser();
	const accountPane = document.querySelector('.tab-pane.account');
	accountPane.innerHTML = JSON.stringify(user.apiUser, null, 2);
};

document.addEventListener('DOMContentLoaded', async () => {
	updateVersionString();
	await attachSettings();
	await updateUserPane();

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
			_: 'navigate'
		});
	});
});
