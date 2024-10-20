import { specialStage } from '/$data/stages.js';

const stageInfo = (number, stage) => `
		<li class="stageHeader">${number}. ${stage.name}: Difficulty - ${stage.difficulty}</li>
		<ul class="stageDetails">
			${stage.featherCost
				.map((x, i) => `<li>Stage ${i + 1}: ${x} Feathers</li>`)
				.join('\n')}
		</ul>
`;

const addPlanetDetails = () => {
	const noticeContent = document.querySelector('.notice-content');
	const content = `
		<h2>[Announcement] Details about entering the Special Stages</h2>
		<ul>
				<li><b>Planets (Always open)</b></li>

				${stageInfo(1, specialStage.evolution)}
				${stageInfo(2, specialStage.wizard)}
				${stageInfo(3, specialStage.immortal)}

				
				<br>
				<li><b>Planets Schedule</b></li>
				<ul>
						<li>Ascension Sphere: Playable on Mondays and Thursdays</li>
						<li>Mystic Tesseract: Playable on Tuesdays and Fridays</li>
						<li>Phantom Obelisk: Playable on Wednesdays and Saturdays</li>
						<li>Collabo Event: Playable on Sundays</li>
				</ul>
				<br>
				<li><b>Event Planets</b></li>
				<li>Leonard's Planet</li>
				<ul>
						<li>Difficulty varies from 1-6</li>
				</ul>
		</ul>
	`;
	noticeContent.innerHTML = content;

	const entries = Object.entries(specialStage);
	for (const entry of entries) {
		console.log(entry[1].name);
	}
	console.log(entries);
};

// Define the closeNotice function to handle navigation
function closeNotice() {
	// const src = '/pages/specialStage/index.html';
	window.parent.postMessage({
		_: 'navigate',
		// src,
	});
}

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	// Add event listener for the close button
	const closeButton = document.querySelector('.close-btn');
	closeButton.addEventListener('click', closeNotice);

	addPlanetDetails();
};

document.addEventListener('DOMContentLoaded', domLoaded);
