document.addEventListener('DOMContentLoaded', async () => {
	const errorMessage = document.getElementById('errorMessage');
	const contentDiv = document.getElementById('content');
	const retryButton = document.getElementById('retry');

	retryButton.addEventListener('pointerdown', () => {
		errorMessage.style.display = 'none';
		contentDiv.style.display = 'block';
	});

	document
		.getElementById('loginForm')
		.addEventListener('submit', async function (event) {
			event.preventDefault();

			const name = document.getElementById('name').value;
			const password = document.getElementById('password').value;

			await fetch('https://datamosh.vercel.app/api/teedee/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, password })
			})
				.then((response) => response.json())
				.then((data) => {
					localStorage.setItem(
						'GAME_STARTED',
						new Date().toISOString()
					);
					localStorage.setItem('USER_TOKEN', data.token);
					document.location = '/';
				})
				.catch((error) => {
					console.log(error);
					errorMessage.style.display = 'block';
					contentDiv.style.display = 'none';
				});
		});
	if (window.parent) {
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
		window.parent.postMessage({ _: 'loaded' });
	}
});
