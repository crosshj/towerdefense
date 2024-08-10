import { exampleNotices } from './examplenotices.js';

const setupNotices = async () => {
	const noticeEl = document.querySelector(`.tab-pane.notice`);

	const notices = exampleNotices;
	noticeEl.innerHTML = notices
		.map((x) => {
			return `
				<div class="noticeContainer">
					<div class="noticeTitleRow">
						<div class="noticeTitleBox">
							<div class="noticeTitle">${x.title}</div>
							<div class="noticeDate">${x.date}</div>
						</div>
						<div class="noticeCollapser closed"></div>
					</div>
					<div class="noticeContent closed">
						${x.content}
					</div>
				</div>
			`;
		})
		.join('\n');

	noticeEl.addEventListener(`click`, (event) => {
		const collapser = event.target.querySelector('.noticeCollapser');
		collapser.classList.toggle('closed');
		const content = event.target.querySelector('.noticeContent');
		content.classList.toggle('closed');
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const chooserEl = document.querySelector('.chooser');
	const itemsListEl = document.querySelector('.items-list');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');

		const currentPane = itemsListEl.querySelector('.selected');
		currentPane.classList.remove('selected');
		const newPane = itemsListEl.querySelector(
			`.tab-pane.${e.target.dataset.tab}`
		);
		newPane.classList.add('selected');
	});

	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});

	await setupNotices();
});
