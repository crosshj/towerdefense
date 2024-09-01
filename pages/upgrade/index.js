document.addEventListener('DOMContentLoaded', async () => {
	window.parent.postMessage({
		_: 'title',
		title: 'UPGRADE',
		visibility: 'visible',
	});
	const args = {
		feathers: false,
		gems: true,
		coins: true,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });

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
	window.parent.postMessage({ _: 'loaded' });
});
