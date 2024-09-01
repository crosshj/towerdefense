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
			_: 'navigate',
		});
	});

	await setupNotices();
});

// delete this if it doesn't work

document.addEventListener('DOMContentLoaded', function () {
	// Random image functionality
	const randomImgElement = document.getElementById('random-img');
	const randomImages = [
		'https://i.pinimg.com/564x/70/6e/44/706e44c917df61beec7f1f855087266a.jpg',
		'https://i.pinimg.com/736x/dd/34/3d/dd343d45bc3a4d3633f85fa7252b6dbb.jpg',
		'https://i.pinimg.com/originals/db/0b/99/db0b99668fd82624e8f8e88c2842ee9b.png',
	];
	const randomImage =
		randomImages[Math.floor(Math.random() * randomImages.length)];
	randomImgElement.src = randomImage;

	// Slideshow functionality
	let currentSlide = 0;
	const slides = document.querySelectorAll('.image-slideshow img');

	function showNextSlide() {
		slides[currentSlide].style.opacity = 0;
		currentSlide = (currentSlide + 1) % slides.length;
		slides[currentSlide].style.opacity = 1;
	}

	setInterval(showNextSlide, 3000); // Change slide every 3 seconds
});
