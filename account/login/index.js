const submitLogin = async ({ name, password }) => {
	const url = 'https://datamosh.vercel.app/api/teedee/login';
	const opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, password })
	};
	const response = await fetch(url, opts)
		.then((x) => x.json())
		.catch((fetchError) => ({ error: { fetchError } }));
	return response;
};

const attachLogin = ({ loginForm, errorMessage, contentDiv }) => {
	const nameField = document.getElementById('name');
	const passwordfield = document.getElementById('password');

	loginForm.addEventListener('submit', async function (event) {
		event.preventDefault();
		const response = await submitLogin({
			name: nameField.value,
			password: passwordfield.value
		});

		if (response.error) {
			console.log(response.error);
			errorMessage.style.display = 'block';
			contentDiv.style.display = 'none';
			return;
		}

		localStorage.setItem('GAME_STARTED', new Date().toISOString());
		localStorage.setItem('USER_TOKEN', response.token);
		localStorage.setItem(
			'USER_INFO',
			JSON.stringify({
				exp: response.exp || 0,
				rank: response.rank || 1
			})
		);
		document.location = '/';
	});
};

const onLoaded = async () => {
	const loginForm = document.getElementById('loginForm');
	const errorMessage = document.getElementById('errorMessage');
	const contentDiv = document.getElementById('content');
	const retryButton = document.getElementById('retry');

	attachLogin({
		contentDiv,
		loginForm,
		errorMessage
	});

	retryButton.addEventListener('pointerup', () => {
		errorMessage.style.display = 'none';
		contentDiv.style.display = 'block';
	});

	if (window.parent) {
		window.parent.postMessage({
			_: 'stats',
			visibility: 'hidden'
		});
		window.parent.postMessage({
			_: 'title',
			title: '',
			visibility: 'hidden'
		});
		window.parent.postMessage({ _: 'loaded' });
	}
};

document.addEventListener('DOMContentLoaded', onLoaded);
