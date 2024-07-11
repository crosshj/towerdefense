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

	//prettier-ignore
	container.outerHTML = `
        <div class="${statsClass}">
            ${ feathers ? `
            <div class="feathers clickable">
                F: ${userStats.feathers}/${userStats.feathersMax} max
            </div>
            `:''}

            ${ gems ? `
            <div class="gems clickable">
                G: ${userStats.gems}
            </div>
            `:''}

            ${ coins ? `
            <div class="coins clickable">
                C: ${userStats.coins}
            </div>
            `:''}

            ${ friendPoints ? `
            <div class="friends clickable">
                FP: ${userStats.friendPoints}
            </div>
            `:''}
        </div>
    `;
};

export const statsRequest = async (args) => {
	window.parent.postMessage({ _: 'stats', ...args });
};
