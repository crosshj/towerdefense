import { getUser } from '../../user/user.js';

const resetGame = () => {
	localStorage.removeItem('USER_TEAMS');
	localStorage.removeItem('USER_EFFECTS');
	localStorage.removeItem('USER_CHARACTERS');
	localStorage.removeItem('USER_STATS');
};

const updateLogin = async () => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken) throw new Error('missing token, cannot update login');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: userToken })
		};
		const update = await fetch(
			'https://datamosh.vercel.app//api/teedee/loginUpdate',
			opts
		).then((x) => x.json());
		if (!update.success) throw new Error('login update failed');
		return;
	} catch (e) {
		console.log(e);
		return;
	}
};

const setupActionsNew = ({ gameStarted }) => {
	const actionsNewButton = document.querySelector('.actions .new');
	if (!gameStarted) {
		actionsNewButton.classList.add('main');
	} else {
		actionsNewButton.classList.add('secondary');
	}
	actionsNewButton.addEventListener('mousedown', () => {
		if (gameStarted) {
			const choice = window.confirm(
				'This will discard your previous progress.  You sure?'
			);
			if (!choice) return;
			resetGame();
		}
		sessionStorage.setItem('SESSION_ACTIVE', 'true');
		if (!gameStarted) {
			localStorage.setItem('GAME_STARTED', new Date().toISOString());
		}
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home/index.html'
		});
	});
};

const setupActionsContinue = ({ gameStarted }) => {
	const actionsContinueButton = document.querySelector('.actions .continue');
	if (!gameStarted) {
		actionsContinueButton.classList.add('hidden');
	} else {
		actionsContinueButton.classList.add('main');
	}
	actionsContinueButton.addEventListener('mousedown', async () => {
		await updateLogin();
		sessionStorage.setItem('SESSION_ACTIVE', 'true');
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home/index.html'
		});
	});
};

const setupActionLogin = ({ gameStarted }) => {
	const button = document.querySelector('.actions .login');
	if (gameStarted) {
		button.classList.add('main');
	} else {
		button.classList.add('secondary');
	}
	button.addEventListener('pointerdown', () => {
		sessionStorage.setItem('SESSION_ACTIVE', 'true');
		window.parent.postMessage({
			_: 'navigate',
			src: '/account/login/index.html'
		});
	});
};
const setupActionSignUp = ({ gameStarted }) => {
	const button = document.querySelector('.actions .signUp');
	if (gameStarted) {
		button.classList.add('secondary');
	} else {
		button.classList.add('main');
	}
	button.addEventListener('pointerdown', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/account/signup/index.html'
		});
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const sessionActive = sessionStorage.getItem('SESSION_ACTIVE') === 'true';
	if (sessionActive) {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home/index.html'
		});
		return;
	}

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

	const user = await getUser();
	const gameStarted = localStorage.getItem('GAME_STARTED');

	//TODO: if user.apiUser.verfied===false - mention this, don't go further

	console.log(user.apiUser);
	setupActionsNew({ gameStarted });
	setupActionsContinue({ gameStarted });
	setupActionLogin({ gameStarted });
	setupActionSignUp({ gameStarted });

	if (user.apiUser) {
		const containerDiv = document.querySelector('.container.game');
		containerDiv.classList.remove('hidden');
	} else {
		const containerDiv = document.querySelector('.container.account');
		containerDiv.classList.remove('hidden');
	}

	window.parent.postMessage({ _: 'loaded' });
});
