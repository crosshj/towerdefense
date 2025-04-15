import { debug } from '../utils/debug.js';
import { Capacitor as CapacitorCDN } from '/vendor/capacitor.js';

debug.log(
	`Using Capacitor from ${window.Capacitor ? 'window.Capacitor' : 'CDN'}`
);
const Capacitor = window.Capacitor ?? CapacitorCDN;

let FirebaseAuthentication;
let auth;
let provider;
let platform;

export async function initAuth() {
	platform = Capacitor.getPlatform();

	debug.log('initFirebaseAuthentication: native');
	debug.log(`Plugins: ${Object.keys(Capacitor.Plugins).join(', ')}`);

	FirebaseAuthentication = Capacitor.Plugins.FirebaseAuthentication;
	debug.log(`Firebase: ${Object.keys(FirebaseAuthentication).join(', ')}`);

	FirebaseAuthentication.addListener('authStateChange', debug.log);
	FirebaseAuthentication.addListener('authDebug', debug.log);
}

export async function getCurrentUser() {
	try {
		debug.log('getCurrentUser: native');
		// const timeout = new Promise((_, reject) =>
		// 	setTimeout(() => reject(new Error('getCurrentUser Timeout')), 10000)
		// );
		// const result = await Promise.race([
		// 	FirebaseAuthentication.getCurrentUser(),
		// 	timeout,
		// ]);
		const result = await FirebaseAuthentication.getCurrentUser();
		return result;
	} catch (e) {
		debug.log('Native user not signed in. Error: ', e.message);
		showLoginButton();
	}
}

export async function signInWithGoogle() {
	try {
		debug.log('signIn: native');
		const result = await FirebaseAuthentication.signInWithGoogle();
		debug.log('Native user:', result?.user || 'unknown');
		return result;
	} catch (e) {
		debug.log('Native sign-in failed:', e.message);
		return { error: e.message };
	}
}
