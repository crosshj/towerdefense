// index.js
document.addEventListener('DOMContentLoaded', function () {
	const spinner = document.getElementById('spinner');
	const content = document.getElementById('content');
	const errorMessage = document.getElementById('errorMessage');

	// Extract the verification code from the URL
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');

	// Make the POST request to verify the account
	fetch('https://datamosh.vercel.app/api/teedee/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ code: code })
	})
		.then((response) => response.json())
		.then((data) => {
			// Hide the spinner and show the content if verification is successful
			if (data.success) {
				spinner.style.display = 'none';
				content.style.display = 'block';
			} else {
				// Show error message if verification fails
				spinner.style.display = 'none';
				errorMessage.style.display = 'block';
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			// Show error message if there is an error
			spinner.style.display = 'none';
			errorMessage.style.display = 'block';
		});
});
