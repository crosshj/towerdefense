import { getUserLevelInfo } from '../utils/experience.js';

const rankToGrade = {
	1: 'Normal',
	2: 'Master',
	3: 'Super Master',
	4: 'Ultra Master',
	5: 'Legend'
};

document.addEventListener('DOMContentLoaded', () => {
	const ranks = [1, 2, 3, 4, 5];
	const cachedData = getCachedData();

	const datasets = ranks.map((rank) => {
		let expData;

		if (cachedData[rank]) {
			expData = cachedData[rank];
		} else {
			expData = generateExpDataForRank(rank);
			cachedData[rank] = expData;
			setCachedData(cachedData);
		}

		return {
			label: rankToGrade[rank],
			data: expData,
			borderColor: getRandomColor(),
			borderWidth: 1,
			fill: false
		};
	});

	createChart(datasets);
});

function generateExpDataForRank(rank) {
	const expData = [];
	let totalExp = 0;
	while (expData.length < 99) {
		const { level } = getUserLevelInfo(totalExp, rank);
		if (!expData[level - 1]) {
			expData[level - 1] = totalExp;
		}
		totalExp += 100;
	}
	return expData;
}

function createChart(datasets) {
	const ctx = document.getElementById('chart').getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: Array.from({ length: 99 }, (_, i) => i + 1),
			datasets: datasets
		},
		options: {
			responsive: true,
			scales: {
				x: {
					title: {
						display: true,
						text: 'Level'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Experience Required'
					}
				}
			}
		}
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
