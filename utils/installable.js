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
	installButton.addEventListener('mousedown', async () => {
		if (!installPrompt) return;
		await installPrompt.prompt();
		hideInstallButton();
	});
	const splash = document.querySelector('.splash');
	splash.append(installButton);
};

const beforeInstallHandler = async (event) => {
	event.preventDefault();
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
