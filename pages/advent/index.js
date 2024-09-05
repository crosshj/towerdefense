const pageTitle = 'ADVENT';

const pageDone = () => {
	document.title = 'TD: ' + pageTitle;
	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

const SelectorItem = (item, i) => `
	<div class="selectorItem">
		<div class="element">
			<div class="icon"></div>
		</div>
		<div class="professorPoints">
			<div class="container">
				<div class="label">MY</div>
				<div class="icon">P</div>
				<div class="amount">0</div>
			</div>
		</div>
		<div class="expires">
			<span>TIME</span>
			<span>00:00:00</span>
		</div>
		<div class="unit">
			<img >
			<div class="grade"></div>
		</div>
		<div class="actions">
			<button>ENTER</button>
		</div>
		<div class="name">
			advent-${i + 1}
		</div>
	</div>
`;

const attachSelector = async () => {
	const el = document.querySelector('.selector');
	const items = new Array(5).fill();
	el.innerHTML = items.map(SelectorItem).join('\n');
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	await attachSelector();

	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
