import { SVGIcons } from '../assets/icons.svg.js';
import { getUserLevelInfo } from '../utils/experience.js';

const rankToGrade = {
	1: 'Normal',
	2: 'Master',
	3: 'Super Master',
	4: 'Ultra Master',
	5: 'Legend',
};

function createChart(datasets) {
	const ctx = document.getElementById('chart').getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: Array.from({ length: 99 }, (_, i) => i + 1),
			datasets: datasets,
		},
		options: {
			responsive: true,
			scales: {
				x: {
					title: {
						display: true,
						text: 'Level',
					},
				},
				y: {
					title: {
						display: true,
						text: 'Experience Required',
					},
				},
			},
		},
	});
}

function getCachedData() {
	const data = localStorage.getItem('expDataCache');
	return data ? JSON.parse(data) : {};
}

function setCachedData(data) {
	localStorage.setItem('expDataCache', JSON.stringify(data));
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const domLoaded = async () => {
	const ranks = [1, 2, 3, 4, 5];
	const cachedData = getCachedData();

	const loadingEl = document.querySelector('.loading');
	loadingEl.innerHTML = `
		<div>generating</div>
		${SVGIcons.animatedSpinner()}
	`;

	if (Object.keys(cachedData).length !== 5) {
		loadingEl.classList.remove('hidden');
	}

	const datasets = [];
	const workerPromises = ranks.map((rank) => {
		if (cachedData[rank]) {
			return Promise.resolve({ rank, expData: cachedData[rank] });
		} else {
			return new Promise((resolve) => {
				const worker = new Worker('experience.worker.js', {
					type: 'module',
				});
				worker.postMessage({ rank });
				worker.onmessage = function (e) {
					const { rank, expData } = e.data;
					cachedData[rank] = expData;
					worker.terminate();
					resolve({ rank, expData });
				};
			});
		}
	});

	const results = await Promise.all(workerPromises);

	results.forEach(({ rank, expData }) => {
		datasets.push({
			label: rankToGrade[rank],
			data: expData,
			borderColor: getRandomColor(),
			borderWidth: 1,
			fill: false,
		});
	});

	setCachedData(cachedData);
	createChart(datasets);
	loadingEl.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', domLoaded);
