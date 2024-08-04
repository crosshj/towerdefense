import { getStats } from '../../user/stats.js';
import { menuButton } from './components.js';

const withCommas = (x) => {
	return x
		.toLocaleString('en', { useGrouping: true })
		.replaceAll(/,/g, '<span class="comma-span">,</span>');
};

function minutesAndSeconds(seconds) {
	let minutes = Math.floor(seconds / 60);
	let secs = seconds % 60;
	return `${(minutes + '').padStart(2, ' ')}:${(secs + '').padStart(2, '0')}`;
}

const attachFeatherUpdater = (userStats) => {
	const feathersAmountEl = document.querySelector('.feathers .amount');
	const updateFeathers = (stats) => {
		if (!feathersAmountEl) return;
		feathersAmountEl.innerHTML = withCommas(stats.feathers);
	};

	const featherUpdateEl = document.querySelector('.featherUpdate');
	const refreshUpdate = (timeLeft) => {
		if (typeof timeLeft === 'undefined') {
			featherUpdateEl.innerText = '';
			return;
		}
		if (!featherUpdateEl) return;
		if (timeLeft === -1) {
			featherUpdateEl.innerText = 'max';
		} else {
			featherUpdateEl.innerText = minutesAndSeconds(timeLeft);
		}
	};

	let timeLeft;
	const resetTime = (userStats) => {
		//TODO: time to feather based on user stats
		const timeToFeather = 10 * 60;
		const maxedOut = userStats.feathers >= userStats.feathersMax;
		timeLeft = maxedOut ? -1 : timeToFeather;
	};

	updateFeathers(userStats);
	resetTime(userStats);
	refreshUpdate(timeLeft);

	if (timeLeft !== -1) {
		const updateInterval = setInterval(() => {
			timeLeft--;
			if (timeLeft === 0) {
				userStats.feathers++;
				updateFeathers(userStats);
				resetTime(userStats);
			}
			refreshUpdate(timeLeft);
			if (timeLeft === -1) {
				clearInterval(updateInterval);
			}
		}, 1000);
	}
};

export const statsElement = async (args) => {
	const isHidden = args?.visibility === 'hidden';
	const {
		container,
		feathers = !isHidden,
		gems = !isHidden,
		coins = !isHidden,
		friendPoints = !isHidden,
		menu = !isHidden
	} = args;

	container.classList.add('stats');
	const statsClass = Array.from(container.classList).join(' ');

	const userStats = await getStats();

	//prettier-ignore
	container.outerHTML = `
        <div class="${statsClass}">
            ${ feathers ? `
            <div class="feathers clickable">
                <span class="amount">
                    ${withCommas(userStats.feathers)}
                </span>
                <div class="featherTotal">
                    <span>/${userStats.feathersMax}</span>
                    <span class="featherUpdate"></span>
                </div>
            </div>
            `:''}

            ${ gems ? `
            <div class="gems clickable">
                <span class="amount">
                    ${withCommas(userStats.gems)}
                </span>
            </div>
            `:''}

            ${ coins ? `
            <div class="coins clickable">
                <span class="amount">
                    ${withCommas(userStats.coins)}
                </span>
            </div>
            `:''}

            ${ friendPoints ? `
            <div class="friends clickable">
                <span class="amount">
                    ${withCommas(userStats.friendPoints)}
                </span>
            </div>
            `:''}

            ${ menu ? `
            <div class="menu clickable">
                <div class="menuContainer">
                    ${menuButton()}
                </div>
            </div>
            `:''}
        </div>
    `;

	const menuButtonEl = document.querySelector('.container .stats .menu');
	if (menuButtonEl) {
		menuButtonEl.addEventListener('pointerdown', () => {
			if (!menuButtonEl.classList.contains('open')) {
				menuButtonEl.classList.add('open');
				return;
			}
			menuButtonEl.classList.remove('open');
			window.parent.postMessage({
				_: 'navigate'
			});
		});
		const removeOpenClass = () => {
			console.log('remove open class');
			menuButtonEl.classList.remove('open');
		};
		document.body.addEventListener('modalClose', removeOpenClass);
	}

	attachFeatherUpdater(userStats);
};

export const statsRequest = async (args) => {
	window.parent.postMessage({ _: 'stats', ...args });
};
