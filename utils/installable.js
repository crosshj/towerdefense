let installPrompt;
let installButton;

const hideInstallButton = () => {
	installPrompt = null;
	installButton.classList.add('hidden');
};

const showInstallButton = () => {
	installButton = document.createElement('button');
	installButton.addEventListener('mousedown', async () => {
		if (!installPrompt) return;
		await installPrompt.prompt();
		hideInstallButton();
	});
	//TODO: add installButton to dom
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
		console.log('running in standalone mode');
	}
	const relatedApps = await navigator.getInstalledRelatedApps();
	console.log({ relatedApps });
	window.addEventListener('beforeinstallprompt', beforeInstallHandler);
};
