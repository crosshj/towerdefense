const LS_NAME = 'USER_SETTINGS';

const defaultSettings = {
	bgm: true,
	sfx: true,
	animationQuality: 'low',
	'alert-courtesy': true,
	'alert-event': false,
	'alert-maxFeather': false,
	'alert-guildRaid': false,
	'alert-guild': false,
	'alert-pvp': false
};
const clone = (x) => JSON.parse(JSON.stringify(x));

export const getSettings = async () => {
	const userSettingsSrc = localStorage.getItem(LS_NAME);
	if (!userSettingsSrc) {
		return clone(defaultSettings);
	}
	try {
		return JSON.parse(userSettingsSrc);
	} catch (e) {
		return clone(defaultSettings);
	}
};

export const setSettings = async (newSettings) => {
	const userSettingsSrc = localStorage.getItem(LS_NAME);
	let settings = clone(defaultSettings);
	try {
		settings = JSON.parse(userSettingsSrc);
		settings = {
			...settings,
			...newSettings
		};
	} catch (e) {}
	localStorage.setItem(LS_NAME, JSON.stringify(settings));
};
