import { getOpponentTeamCache } from '/utils/cache.js';
import { generateTableHTML } from '/utils/utils.js';

const pageTitle = 'DEFENSE TEAM';

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

	const { defense, ...opponent } = await getOpponentTeamCache();
	console.log({ opponent });

	//TODO: if opponent is not set, must be "ME"

	document.body.innerHTML = `
		<div class="flex-col" style="gap:10px;min-width: 600px;">
			<div>${opponent.name}</div>
			Team A:
			<div>
				${defense?.a ? generateTableHTML(defense.a) : 'no team'}
			</div>
			Team B:
			<div>
				${defense?.b ? generateTableHTML(defense.b) : 'no team'}
			</div>
		</div>
	`;
	document.title = 'TD: ' + pageTitle;

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
		back: params.back
	});

	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
