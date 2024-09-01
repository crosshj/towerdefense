document.addEventListener('DOMContentLoaded', async () => {
	document
		.getElementById('signupForm')
		.addEventListener('submit', async function (event) {
			event.preventDefault();

			const name = document.getElementById('username').value;
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;

			const response = await fetch(
				'https://datamosh.vercel.app/api/teedee/signUp',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: name,
						email: email,
						password: password,
					}),
				}
			);

			if (response.ok) {
				document.body.innerHTML =
					'Your account was created.  Check your email to verify.';
			} else {
				document.body.innerHTML = 'Signup failed.';
			}
		});

	if (window.parent) {
		window.parent.postMessage({
			_: 'stats',
			visibility: 'hidden',
		});
		window.parent.postMessage({
			_: 'title',
			title: '',
			visibility: 'hidden',
		});
		window.parent.postMessage({ _: 'loaded' });
	}
});
