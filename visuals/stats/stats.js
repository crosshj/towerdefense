import { getStats } from '../../user/stats.js';
import { clone } from '../../utils/utils.js';
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

const modifyUserStats = (userStats) => {
	const now = new Date();

	let {
		feathers = 0,
		feathersMax = 0,
		feathersUpdate = -1,
	} = userStats || {};

	if (feathersUpdate === -1 || feathers >= feathersMax) return userStats;

	feathersUpdate = new Date(feathersUpdate);

	while (feathers < feathersMax && feathersUpdate <= now) {
		if (feathersUpdate > now) break;
		feathers++;
		feathersUpdate.setMinutes(feathersUpdate.getMinutes() + 10);
	}
	return {
		...userStats,
		feathers,
		feathersMax,
		feathersUpdate: feathersUpdate.toISOString(),
	};
};

const attachFeatherUpdater = (userStats) => {
	const moddedUserStats = modifyUserStats(userStats);
	const feathersAmountEl = document.querySelector('.feathers .amount');
	const updateFeathers = (stats) => {
		if (!feathersAmountEl) return;
		feathersAmountEl.innerHTML = withCommas(stats.feathers);
	};

	const featherUpdateEl = document.querySelector('.featherUpdate');
	const refreshUpdate = (timeLeft) => {
		if (!featherUpdateEl) return;
		if (typeof timeLeft === 'undefined') {
			featherUpdateEl.innerText = '';
			return;
		}
		if (timeLeft === -1) {
			featherUpdateEl.innerText = 'max';
		} else {
			featherUpdateEl.innerText = minutesAndSeconds(timeLeft);
		}
	};

	let timeLeft;
	const resetTime = (userStats) => {
		const feathersUpdateDate = new Date(userStats.feathersUpdate);
		let apiTimeLeft;
		try {
			const now = new Date();
			apiTimeLeft = Math.floor((feathersUpdateDate - now) / 1000);
			apiTimeLeft = apiTimeLeft > 0 ? apiTimeLeft : 10 * 60 + apiTimeLeft;
			apiTimeLeft =
				Math.abs(apiTimeLeft) <= 10 * 60
					? apiTimeLeft
					: apiTimeLeft % (10 * 60);
		} catch (e) {}
		if (!apiTimeLeft || apiTimeLeft === -1) return -1;

		//console.log({ apiTimeLeft, userStats, feathersUpdateDate });
		const maxedOut = userStats.feathers >= userStats.feathersMax;
		timeLeft = maxedOut ? -1 : apiTimeLeft;
	};

	updateFeathers(moddedUserStats);
	resetTime(moddedUserStats);
	refreshUpdate(timeLeft);

	let updateInterval;
	const drawStats = () => {
		timeLeft--;
		if (timeLeft === 0) {
			moddedUserStats.feathers++;
			updateFeathers(moddedUserStats);
			resetTime(moddedUserStats);
		}
		refreshUpdate(timeLeft);
		if (timeLeft === -1) {
			clearInterval(updateInterval);
		}
	};

	if (timeLeft !== -1) {
		updateInterval = setInterval(drawStats, 1000);
	}

	window.minusFeathers = (feathersToSubtract) => {
		const startsTimer =
			moddedUserStats.feathers === moddedUserStats.feathersMax;
		moddedUserStats.feathers -= feathersToSubtract;
		updateFeathers(moddedUserStats);

		if (startsTimer) {
			const now = new Date();
			moddedUserStats.feathersUpdate = new Date(
				now.getTime() + 10 * 60000
			).toISOString();
			resetTime(moddedUserStats);
			refreshUpdate(timeLeft);
			updateInterval = setInterval(drawStats, 1000);
		}
	};
};

let prevArgs;
export const refreshStats = async ({ container }) => {
	if (!prevArgs) return;
	return statsElement({
		...prevArgs,
		container,
	});
};

export const statsElement = async (args) => {
	prevArgs = clone(args);
	const isHidden = args?.visibility === 'hidden';
	const {
		container,
		feathers = !isHidden,
		gems = !isHidden,
		coins = !isHidden,
		friendPoints = !isHidden,
		menu = !isHidden,
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
				_: 'navigate',
			});
		});
		const removeOpenClass = () => {
			menuButtonEl.classList.remove('open');
		};
		document.body.addEventListener('modalClose', removeOpenClass);
	}

	attachFeatherUpdater(userStats);
};

export const statsRequest = async (args) => {
	window.parent.postMessage({ _: 'stats', ...args });
};
