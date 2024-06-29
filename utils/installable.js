let installPrompt;
let installButton;

const hideInstallButton = () => {
	installPrompt = null;
	installButton.classList.add('hidden');
};

const showInstallButton = () => {
	if (installButton) {
		return;
	}
	installButton = document.createElement('button');
	installButton.innerHTML = 'INSTALL';
	installButton.classList.add('styled-button');
	installButton.addEventListener('mousedown', async () => {
		if (!installPrompt) return;
		await installPrompt.prompt();
		hideInstallButton();
		localStorage.setItem('APP_INSTALLED', true);
	});
	const splash = document.querySelector('.splash');
	splash.append(installButton);
};

const beforeInstallHandler = async (event) => {
	event.preventDefault();
	localStorage.setItem('APP_INSTALLED', false);
	installPrompt = event;
	showInstallButton();
	console.log('beforeInstallHandler');
};

export const installable = async () => {
	console.log('installable');
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return 'standalone';
	}
	const relatedApps = await navigator.getInstalledRelatedApps();
	console.log({ relatedApps: Array.from(relatedApps) });

	window.addEventListener('beforeinstallprompt', beforeInstallHandler);
};
