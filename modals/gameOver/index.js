document.addEventListener('DOMContentLoaded', async () => {
	const winSplash = document.querySelector('.win-splash');
	const loseSplash = document.querySelector('.lose-splash');
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	if (params.status === 'win') {
		winSplash.classList.remove('hidden');
	} else {
		loseSplash.classList.remove('hidden');
	}
});
