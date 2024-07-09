const resetGame = () => {
	// TODO: ask if sure
	localStorage.removeItem('USER_TEAMS');
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
	actionsContinueButton.addEventListener('mousedown', () => {
		sessionStorage.setItem('SESSION_ACTIVE', 'true');
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home/index.html'
		});
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const gameStarted = localStorage.getItem('GAME_STARTED');

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

	const sessionActive = sessionStorage.getItem('SESSION_ACTIVE') === 'true';
	if (sessionActive) {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home/index.html'
		});
		return;
	}

	const containerDiv = document.querySelector('.container');
	containerDiv.classList.remove('hidden');

	setupActionsNew({ gameStarted });

	setupActionsContinue({ gameStarted });

	window.parent.postMessage({ _: 'loaded' });
});
