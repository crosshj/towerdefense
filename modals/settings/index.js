import { getSettings, setSettings } from '../../user/settings.js';

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
		el.addEventListener('change', function () {
			setSettings({ [alert]: this.checked });
		});
	}
};

document.addEventListener('DOMContentLoaded', async () => {
	await attachSettings();
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
