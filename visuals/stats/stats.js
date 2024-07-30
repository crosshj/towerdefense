import { getStats } from '../../user/stats.js';

export const statsElement = async (args) => {
	const {
		container,
		feathers = true,
		gems = true,
		coins = true,
		friendPoints = true
	} = args;

	container.classList.add('stats');
	const statsClass = Array.from(container.classList).join(' ');

	const userStats = await getStats();

	const withCommas = (number) => {
		return `2<span class="comma-span">,</span>529`;
	};

	//prettier-ignore
	container.outerHTML = `
        <div class="${statsClass}">
            ${ feathers ? `
            <div class="feathers clickable">
                <span class="amount">${withCommas(userStats.feathers)}</span><span class="featherTotal">/${40 || userStats.feathersMax} max</span>
            </div>
            `:''}

            ${ gems ? `
            <div class="gems clickable">
                <span class="amount">${43 || userStats.gems}</span>
            </div>
            `:''}

            ${ coins ? `
            <div class="coins clickable">
                <span class="amount">${'715,624' || userStats.coins}</span>
            </div>
            `:''}

            ${ friendPoints ? `
            <div class="friends clickable">
                <span class="amount">${80 || userStats.friendPoints}</span>
            </div>
            `:''}
        </div>
    `;
};

export const statsRequest = async (args) => {
	window.parent.postMessage({ _: 'stats', ...args });
};
