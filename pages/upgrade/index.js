import { statsElement } from '../../visuals/stats/stats.js';

document.addEventListener('DOMContentLoaded', async () => {
	const statsContainer = document.querySelector('.container .currency');
	statsElement({
		container: statsContainer,
		gems: true,
		feathers: false,
		friendPoints: false,
		coins: true
	});

	const upgradeEls = Array.from(
		document.querySelectorAll('.upgrades-list .upgrade')
	);
	for (const upgradeEl of upgradeEls) {
		const title = upgradeEl.innerText;
		const level = 'Level 1 / 99';
		const description = 'TODO: Describe what this is';
		const iconClass = 'none';
		upgradeEl.outerHTML = `
			<div class="upgrade">
				<div class="background"></div>
				<div class="content">
					<div class="title">${title}</div>
					<div class="level">${level}</div>
					<div class="details">
						<div class="icon ${iconClass}"></div>
						<div class="description">${description}</div>
					</div>
					<button>Upgrade</button>
				</div>
			</div>
		`;
	}

	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	document.body.addEventListener('mousedown', (event) => {
		// console.log(event.target);
		if (event.target.classList.contains('back-button')) {
			// window.fadingNavigate(params.back || '/');
			window.history.back();
		}
	});
});
