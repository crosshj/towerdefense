import { getStats } from '../../user/stats.js';

document.addEventListener('DOMContentLoaded', async () => {
	const stats = await getStats();

	const gemEl = document.querySelector('.stats .gems');
	gemEl.innerText = `G: ${stats.gems}`;

	const friendPointsEl = document.querySelector('.stats .friendPoints');
	friendPointsEl.innerText = `F: ${stats.friendPoints}`;

	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});
