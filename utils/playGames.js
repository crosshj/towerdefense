import { debug } from '../utils/debug.js';
import { Capacitor as CapacitorCDN } from '/vendor/capacitor.js';

const Capacitor = window.Capacitor ?? CapacitorCDN;

let PlayGames;

export async function initPlugin() {
	debug.log('initPlayGames: native');

	PlayGames = Capacitor.Plugins.PlayGames;
	if (!PlayGames) {
		debug.log(`Play Games : plugin not found`);
		debug.log(
			`Plugins Available: ${Object.keys(Capacitor.Plugins).join(', ')}`
		);
		return { error: 'Play Games plugin not found' };
	}

	const methods = Object.keys(PlayGames);
	debug.log({ methods });

	const status = await PlayGames.status();
	debug.log(status);

	PlayGames.addListener('onSignInStatus', debug.log);

	return { success: true };
}

export async function getCurrentUser() {
	try {
		debug.log('getCurrentUser: native');
		const user = await PlayGamesServices.login();
		/* response return: 
        id: string;
        display_name: string;
        icon: string; // URI Does not work yet.
        title: string;
        message: string; // A messate that say what happen with the plugin correct / error (usded for tests) 
        isLogin: boolean; TRUE if is online FALSE if is offline
    */
		debug.log('Current user:', user);
		return {
			user: {
				id: user.id,
				displayName: user.display_name,
				photoURL: user.icon,
				title: user.title,
			},
		};
	} catch (e) {
		debug.log('Failed to get current user. Error: ', e.message);
		return { error: e.message };
	}
}
