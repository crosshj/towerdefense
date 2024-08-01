import { getStats } from '../../user/stats.js';
import { menuButton } from './components.js';

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
};

export const statsRequest = async (args) => {
	window.parent.postMessage({ _: 'stats', ...args });
};
