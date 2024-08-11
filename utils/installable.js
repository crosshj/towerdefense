let installPrompt;
let installButton;

const hideInstallButton = () => {
	installPrompt = null;
	installButton.classList.add('hidden');
};

const showInstallButton = (args) => {
	if (installButton) {
		return;
	}
	installButton = document.createElement('button');
	installButton.innerHTML = 'INSTALL';
	installButton.classList.add('styled-button');
	installButton.addEventListener('mousedown', async () => {
		if (!installPrompt) return;
		await installPrompt.prompt();
		const userChoice = await installPrompt.userChoice;
		console.log({ userChoice });
		if (userChoice?.outcome !== 'dismissed') {
			hideInstallButton();
			localStorage.setItem('APP_INSTALLED', 'true');
			args.onInstall();
		}
	});
	const splash = document.querySelector('.splash');
	splash.append(installButton);
};

const beforeInstallHandler = (args) => async (event) => {
	event.preventDefault();
	localStorage.setItem('APP_INSTALLED', 'false');
	installPrompt = event;
	showInstallButton(args);
	// console.log('beforeInstallHandler');
};

export const installable = async (args) => {
	// TODO: is this desktop or mobile?
	// TODO: is this installed or not?
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return 'standalone';
	}
	if (window.matchMedia('(display-mode: fullscreen)').matches) {
		return 'fullscreen';
	}

	try {
		//TODO: do something with this?
		const relatedApps = await navigator.getInstalledRelatedApps();
		//console.log({ relatedApps: Array.from(relatedApps) });
	} catch (e) {
		//console.log(e);
	}

	window.addEventListener('beforeinstallprompt', beforeInstallHandler(args));

	// const isInstalled = localStorage.getItem('APP_INSTALLED') === 'true';
	// if (isInstalled) {
	// 	return 'installed';
	// }
};
