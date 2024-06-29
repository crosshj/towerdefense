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

const beforeInstallHandler = (event) => {
	event.preventDefault();
	installPrompt = event;
	showInstallButton();
	console.log('beforeInstallHandler');
};

export const installable = () => {
	console.log('installable');
	window.addEventListener('beforeinstallprompt', beforeInstallHandler);
};
