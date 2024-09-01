import { SVGIcons } from '../assets/icons.svg.js';
import { getThumbnail } from './objects/unit.js';
import ScreenInfo from './screen.js';

const progressClasses = [
	'p-0',
	'p-10',
	'p-20',
	'p-30',
	'p-40',
	'p-50',
	'p-60',
	'p-70',
	'p-80',
	'p-90',
	'p-100',
];

const updateProgress = (el, amount) => {
	el.classList.remove(...progressClasses);
	el.classList.add(`p-${amount}`);
};

const getDomRoot = () => {
	const prevControls = document.getElementById('controls');
	if (prevControls) {
		document.body.removeChild(prevControls);
	}
	const root = document.createElement('div');
	root.id = 'controls';
	document.body.appendChild(root);
	return root;
};

const createTopControls = ({
	root,
	controls,
	pauseScreen,
	showEffects,
	state,
} = {}) => {
	const top = document.createElement('div');
	top.classList.add('controls-top');

	const effects = showEffects
		? `
			<div data-effect="teamSwitch" class="progress p-100">A</div>
			<div data-effect="callFriend" class="callFriend">
				${SVGIcons.userMultiGo()}
			</div>
			<div data-effect="meteor" class="meteor">
				${SVGIcons.meteor()}
			</div>
			<div data-effect="ice" class="iceStorm">
				${SVGIcons.iceStorm()}
			</div>
			<div data-effect="tornado" class="tornado">
				${SVGIcons.tornado()}
			</div>
			<div data-effect="invincible" class="invincible">
				${SVGIcons.invincibility()}
			</div>
		`
		: '';

	top.innerHTML = `
		<div class="effects">
			${effects}
		</div>
		<div class="mineral">
			<span class="mineralIcon">${SVGIcons.mineral()}</span>
			<span class="currentAmount"></span>
			/
			<span class="maxAmount"></span>
		</div>
		<div
			style="position: relative;"
		>
			<div class="pause button">I I</div>
			<div class="auto button">AUTO</div>
		</div>
	`;

	const pauseButton = top.querySelector('.pause.button');
	pauseButton.addEventListener('pointerup', () => {
		// pauseButton.innerText = state.paused ? 'I I' : '▶';
		// pauseButton.style.backgroundColor = state.paused ? '' : '#478347';
		// pauseButton.style.color = state.paused ? '' : 'white';
		pauseScreen.show();
		state.actions.pauseToggle();
	});

	const autoButton = top.querySelector('.auto.button');
	if (state.auto) {
		autoButton.classList.add('active');
	}
	autoButton.addEventListener('pointerup', () => {
		if (state.auto) {
			autoButton.classList.remove('active');
		} else {
			autoButton.classList.add('active');
		}
		state.actions.autoToggle();
	});

	const effectsContainer = top.querySelector('.effects');
	effectsContainer.addEventListener('pointerup', (e) => {
		const { effect = 'none' } = e?.target?.dataset;
		if (effect === 'none') return;
		if (effect === 'teamSwitch' && !e.target.classList.contains('p-100')) {
			return;
		}
		state.actions.triggerEffect({
			effect,
			controls,
			disableEffect: () => {
				e.target.classList.add('disabled');
			},
			//this could be done without needing state actions to do it?
			updateTeamSwitcher: () => {
				const newText = e.target.innerText === 'A' ? 'B' : 'A';
				e.target.innerText = newText;
				let currentProgress = 0;
				updateProgress(e.target, currentProgress);
				const thisInterval = setInterval(() => {
					currentProgress += 10;
					if (currentProgress > 100) {
						clearInterval(thisInterval);
						return;
					}
					if (currentProgress === 100) {
						clearInterval(thisInterval);
					}
					updateProgress(e.target, currentProgress);
				}, 1000);
			},
		});
	});

	const mineralEl = top.querySelector('.mineral');
	const mineralCurrentAmount = top.querySelector('.mineral .currentAmount');
	const mineralMaxAmount = top.querySelector('.mineral .maxAmount');
	top.updateMineral = (amount, total) => {
		requestAnimationFrame(() => {
			if (mineralCurrentAmount.innerText !== amount + '') {
				mineralCurrentAmount.innerText = amount;
			}
			if (mineralMaxAmount.innerText !== total + '') {
				mineralMaxAmount.innerText = total;
			}
		});
	};
	root.insertAdjacentElement('beforeend', top);
	return top;
};

const createBottomControls = ({ root, state }) => {
	const bottom = document.createElement('div');
	bottom.classList.add('controls-bottom');
	bottom.innerHTML = `
        <div class="missile button">
			<div class="missileIcon">
				${SVGIcons.missile45Degrees()}
			</div>
			<div class="progress p-0 vertical orange"></div>
			<div class="missileLabel">missile</div>
		</div>
        <div class="team"></div>
		<div class="team"></div>
		<div class="team"></div>
		<div class="team"></div>
		<div class="team"></div>
		<div class="mineral button">
			<div class="mineralIcon">
				${SVGIcons.mineralGroup()}
			</div>
			<div class="progress p-0 vertical blue"></div>
			<div class="levelIndicator">Lv.1</div>
		</div>
    `;

	const missileButton = bottom.querySelector('.missile.button');
	const missileButtonProgress = bottom.querySelector(
		'.missile.button .progress'
	);
	missileButton.addEventListener('pointerup', () => {
		if (!missileButtonProgress.classList.contains(`p-100`)) return;
		state.actions.missileFire();
	});
	const mineralButton = bottom.querySelector('.mineral.button');
	const mineralButtonProgress = bottom.querySelector(
		'.mineral.button .progress'
	);
	const mineralButtonLevelIndicator = bottom.querySelector(
		'.mineral.button .levelIndicator'
	);
	mineralButton.addEventListener('pointerup', () => {
		if (!mineralButtonProgress.classList.contains(`p-100`)) return;
		state.actions.mineralLevel({
			updateLevel: (levelNumber) => {
				let levelText = `Lv.${levelNumber}`;
				if (levelNumber === 8) {
					levelText = 'MAX';
					mineralButtonProgress.style.display = 'none';
				}
				mineralButtonLevelIndicator.innerText = levelText;
			},
		});
	});

	const attackerTower = state.towers.find((x) => x.type === 'attacker');
	const currentTeam =
		attackerTower?.teams?.[0]?.[attackerTower.selectedTeam] ||
		attackerTower.team;
	const unitElements = Array.from(bottom.querySelectorAll('.team')).map(
		(el, index) => {
			const unit = currentTeam[index];

			el.innerHTML = `
				<div class="thumbnail">
					<div class="unit"></div>
					<div class="rank"></div>
					<div class="cost">
						<div class="indicator">
							<span class="mineralIcon">${SVGIcons.mineral()}</span>
							<span class="number"></span>
						</div>
						<div class="progress hidden">
							<div class="progress-bar" style="width: 100%;"></div>
						</div>
					</div>
				</div>
				`;
			const element = {
				el,
				image: el.querySelector('.unit'),
				rank: el.querySelector('.rank'),
				cost: el.querySelector('.cost .indicator'),
				costAmount: el.querySelector('.cost .indicator .number'),
				progress: el.querySelector('.cost .progress'),
				progressBar: el.querySelector('.cost .progress-bar'),
			};
			return element;
		}
	);

	const updateTeam = (currentState) => {
		const attackerTower = currentState.towers.find(
			(x) => x.type === 'attacker'
		);
		const currentTeam =
			attackerTower?.teams?.[0]?.[attackerTower.selectedTeam] ||
			attackerTower.team;
		for (const [i, unitEl] of Object.entries(unitElements)) {
			const unit = currentTeam[Number(i)];
			if (typeof unit === 'undefined') {
				unitEl.el.classList.add('empty');
				unitEl.el.dataset.id = undefined;
				continue;
			}
			unitEl.el.dataset.id = unit?.unit;
			unitEl.rank.innerHTML = new Array(unit?.rank || 0)
				.fill('★')
				.join('');
			unitEl.costAmount.innerHTML = unit?.mineralCost || '---';
			const thumbnailDataUri = getThumbnail(unit, currentState);
			unitEl.image.style.backgroundImage = `url(${thumbnailDataUri})`;
			//TODO: update progress/cooldown/candeploy, how?
		}
	};
	bottom.updateTeam = updateTeam;
	updateTeam(state);

	bottom.updateUnitCooldown = (unit) => {
		const { index } = unit;
		const unitEl = unitElements[index];
		const coolDownProgress =
			100 - Math.floor((100 * unit.spawnTicker) / unit.respawn);
		if (coolDownProgress === 100) {
			unitEl.el.classList.remove('cooldown');
			unitEl.cost.classList.remove('hidden'); // TODO: do with csss instead
			unitEl.progress.classList.add('hidden'); // TODO: do with csss instead
		} else {
			unitEl.el.classList.add('cooldown');
			unitEl.cost.classList.add('hidden'); // TODO: do with csss instead
			unitEl.progress.classList.remove('hidden'); // TODO: do with csss instead
			requestAnimationFrame(() => {
				unitEl.progressBar.style.width = coolDownProgress + '%';
			});
		}
	};

	bottom.updateUnitCanDeploy = (unit, state) => {
		const { index } = unit;
		const unitEl = unitElements[index];
		const { amount: mineralAmount } = state.mineral;
		const canDeploy = unit.mineralCost <= mineralAmount;
		const mineralShort = unitEl.el.classList.contains('mineralShort');
		if (mineralShort && canDeploy) {
			unitEl.el.classList.remove('mineralShort');
		}
		if (!canDeploy && !mineralShort) {
			unitEl.el.classList.add('mineralShort');
		}
	};

	bottom.addEventListener('pointerup', (e) => {
		const { target } = e;
		if (target.classList.contains('team')) {
			const isLocked =
				target.classList.contains('cooldown') ||
				target.classList.contains('mineralShort');
			if (isLocked) {
				return;
			}
			const id = target.dataset.id;
			state.actions.deployUnit({
				unitId: id,
				tower: attackerTower,
			});
		}
	});

	root.insertAdjacentElement('beforeend', bottom);
	return bottom;
};

const createTicker = (root) => {
	const ticker = document.createElement('div');
	ticker.classList.add('controls-ticker');
	root.append(ticker);
	return ticker;
};

export default class Controls {
	constructor({
		state,
		pauseScreen,
		showTicker,
		showScreenInfo,
		showEffects,
	} = {}) {
		const root = getDomRoot();

		this.showTicker = showTicker;
		if (showTicker) {
			this.ticker = createTicker(root);
		}
		if (showScreenInfo) {
			ScreenInfo(root);
		}
		this.top = createTopControls({
			root,
			state,
			controls: this,
			pauseScreen,
			showEffects,
		});
		this.bottom = createBottomControls({ root, state });

		this.updateMineral = this.top.updateMineral;
	}
	updateTicker(count) {
		if (!this.showTicker) return;
		this.ticker.innerHTML = count;
	}
	updateProgress(which, amount) {
		const el = this.bottom.querySelector(`.${which} .progress`);
		if (el.classList.contains(`p-${amount}`)) return;
		updateProgress(el, amount);
	}
	updateTeam(state) {
		if (state.paused) return;
		const attackerTower = state.towers.find((x) => x.type === 'attacker');
		const currentTeam =
			attackerTower?.teams?.[0]?.[attackerTower.selectedTeam] ||
			attackerTower.team;
		if (!currentTeam) return;
		for (const [unitIndex, unit] of Object.entries(currentTeam)) {
			this.bottom.updateUnitCanDeploy(
				{
					...unit,
					index: unitIndex,
				},
				state
			);
			if (typeof unit.spawnTicker === 'undefined') {
				continue;
			}
			this.bottom.updateUnitCooldown({
				...unit,
				index: unitIndex,
			});
		}
	}
}
