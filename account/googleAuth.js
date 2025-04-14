import { debug } from '../utils/debug.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

import { Capacitor as CapacitorCDN } from '/vendor/capacitor.js';
debug.log(
	`Using Capacitor from ${window.Capacitor ? 'window.Capacitor' : 'CDN'}`
);
const Capacitor = window.Capacitor ?? CapacitorCDN;

let FirebaseAuthentication;
let auth;
let provider;
let platform;

const useWebAuth = () => {
	// return true;
	return platform === 'web';
};

async function initFirebaseAuthentication() {
	platform = Capacitor.getPlatform();
	debug.log(`Platform: ${platform}`);

	if (useWebAuth()) {
		debug.log('initFirebaseAuthentication: web');
		const firebaseConfig = {
			apiKey: 'AIzaSyBirVAOsWziG6l3GKvZhj_dygN2JP_pSVw',
			authDomain: 'teedee-441303.firebaseapp.com',
			projectId: 'teedee-441303',
			storageBucket: 'teedee-441303.firebasestorage.app',
			messagingSenderId: '421449850638',
			appId: '1:421449850638:web:b04425f809ac6284a1815f',
			measurementId: 'G-CN6VYEK723',
		};
		const app = initializeApp(firebaseConfig);
		auth = getAuth(app);
		provider = new GoogleAuthProvider();
	} else {
		debug.log('initFirebaseAuthentication: native');
		debug.log(`Plugins: ${Object.keys(Capacitor.Plugins).join(', ')}`);
		debug.log(
			`Firebase: ${Object.keys(FirebaseAuthentication).join(', ')}`
		);
		FirebaseAuthentication = Capacitor.Plugins.FirebaseAuthentication;
		FirebaseAuthentication.addListener('authStateChange', debug.log);
	}
}

async function handleAuthState() {
	if (useWebAuth()) {
		debug.log('handleAuthState: web');
		const result = await getRedirectResult(auth);
		if (result?.user) {
			debug.log('Redirect sign-in user:', result.user);
			renderUser(result.user);
		} else {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					debug.log('User already signed in:', user);
					renderUser(user);
				} else {
					showLoginButton();
				}
			});
		}
	} else {
		try {
			debug.log('handleAuthState: native');
			const { user } = await FirebaseAuthentication.getCurrentUser();
			if (user) {
				debug.log('Native user already signed in:', user);
				renderUser(user);
			} else {
				debug.log('Native user not signed in');
				showLoginButton();
			}
		} catch (e) {
			debug.log('Native user not signed in');
			showLoginButton();
		}
	}
}

async function signIn() {
	document.getElementById('login-button').style.display = 'none';
	if (useWebAuth()) {
		try {
			debug.log('signIn: web');
			const result = await signInWithPopup(auth, provider);
			debug.log('Web user:', result.user);
			renderUser(result.user);
		} catch (e) {
			debug.warn('Popup failed, falling back to redirect...');
			await signInWithRedirect(auth, provider);
		}
	} else {
		try {
			debug.log('signIn: native');
			const result = await FirebaseAuthentication.signInWithGoogle();
			debug.log('Native user:', result.user);
			renderUser(result.user);
		} catch (e) {
			debug.error('Native sign-in failed:', e);
		}
	}
}

async function setUserPhoto(user) {
	const img = document.getElementById('user-photo');
	const fallback = '/assets/auth/fallback.png';
	const cached = sessionStorage.getItem('userPhotoDataURL');

	if (cached) {
		img.src = cached;
		return;
	}

	// Show original while we try to cache it
	img.src = user.photoURL;

	try {
		const res = await fetch(user.photoURL, { mode: 'cors' });
		if (!res.ok) throw new Error('Image fetch failed');

		const blob = await res.blob();
		const reader = new FileReader();
		reader.onloadend = () => {
			const dataURL = reader.result;
			sessionStorage.setItem('userPhotoDataURL', dataURL);
			img.src = dataURL; // just in case image failed before
		};
		reader.readAsDataURL(blob);
	} catch (err) {
		img.src = fallback;
	}
}

function renderUser(user) {
	if (!user) return;
	document.getElementById('login-button').style.display = 'none';

	setUserPhoto(user);

	document.getElementById('user-name').textContent = user.displayName;
	document.getElementById('user-email').textContent = user.email;
	document.getElementById('user-info').hidden = false;
}

function showLoginButton() {
	document.getElementById('login-button').style.display = 'inline-flex';
	document.getElementById('user-info').hidden = true;
	document.getElementById('user-name').textContent = '';
	document.getElementById('user-email').textContent = '';
	document.getElementById('user-info').hidden = true;
}

function attachButtons() {
	document.getElementById('login-button').addEventListener('click', signIn);

	document
		.getElementById('logout-button')
		.addEventListener('click', async () => {
			if (Capacitor.getPlatform() === 'web') {
				await signOut(auth);
			} else {
				await FirebaseAuthentication.signOut();
			}
			// location.reload();
			showLoginButton();
			sessionStorage.removeItem('userPhotoDataURL');
		});
}

document.addEventListener('DOMContentLoaded', async () => {
	try {
		attachButtons();
		await initFirebaseAuthentication();
		await handleAuthState();
		debug.log(
			`Auth loaded. Parent window ${window.parent ? 'exists' : 'does not exist'}`
		);
		if (window.parent) {
			window.parent.postMessage({ _: 'stats', visibility: 'hidden' });
			window.parent.postMessage({
				_: 'title',
				title: 'Google Auth',
				visibility: 'visible',
			});
			window.parent.postMessage({ _: 'loaded' });
		}
	} catch (e) {
		debug.log(`FirebaseAuthentication error: ${e.message}`);
	}
});
