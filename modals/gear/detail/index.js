import { attachTap } from '../../../utils/pointerEvents.js';

const icons = {};

const attachCloseButtons = () => {
	const buttons = document.querySelectorAll('.closeButton');
	for (const button of buttons) {
		attachTap(button, () => {
			window.parent.postMessage({
				_: 'navigate',
			});
		});
	}
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	attachCloseButtons();
};
document.addEventListener('DOMContentLoaded', domLoaded);
