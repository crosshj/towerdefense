import { attachTap } from '../../../utils/pointerEvents.js';

const setup = async () => {
	const upgradeModalCloseButton = document.querySelector(
		'.upgradeLevels .closeButton'
	);
	attachTap(upgradeModalCloseButton, () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
};

document.addEventListener('DOMContentLoaded', setup);
