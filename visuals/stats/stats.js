import { getStats } from '../../user/stats.js';

export const statsElement = async (args) => {
	const {
		container,
		feathers = true,
		gems = true,
		coins = true,
		friendPoints = true,
		menu = true
	} = args;

	container.classList.add('stats');
	const statsClass = Array.from(container.classList).join(' ');

	const userStats = await getStats();

	const withCommas = (x) => {
		return x
			.toLocaleString('en', { useGrouping: true })
			.replaceAll(/,/g, '<span class="comma-span">,</span>');
	};

	//prettier-ignore
	container.outerHTML = `
        <div class="${statsClass}">
            ${ feathers ? `
            <div class="feathers clickable">
                <span class="amount">
                    ${withCommas(userStats.feathers)}
                </span>
                <span class="featherTotal">
                    /${userStats.feathersMax} max
                </span>
            </div>
            `:''}

            ${ gems ? `
            <div class="gems clickable">
                <span class="amount">${withCommas(userStats.gems)}</span>
            </div>
            `:''}

            ${ coins ? `
            <div class="coins clickable">
                <span class="amount">${withCommas(userStats.coins)}</span>
            </div>
            `:''}

            ${ friendPoints ? `
            <div class="friends clickable">
                <span class="amount">${withCommas(userStats.friendPoints)}</span>
            </div>
            `:''}

            ${ menu ? `
            <div class="menu clickable">
                <div class="menuContainer">
                    <svg viewBox="0 0 500 500" preserveAspectRatio="none">
                        <path class="main" d="
                            M 50 115 
                            C 100 31 200 41 250 41 
                            C 300 41 400 31 450 115 
                            L 450 315 
                            C 450 365 300 422 250 452 
                            C 200 422 50 365 50 315 
                            L 50 115 
                            Z
                        " />
                        <path class="arrowDown" d="
                            M 180 200
                            L 250 280
                            L 320 200
                        " />
                    </svg>
                </div>
            </div>
            `:''}
        </div>
    `;
};

export const statsRequest = async (args) => {
	window.parent.postMessage({ _: 'stats', ...args });
};
