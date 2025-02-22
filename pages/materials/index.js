import { MaterialsStore } from '../../user/material.js';

const pageDone = ({ params }) => {
	window.parent.postMessage({
		_: 'title',
		title: 'MY MATERIALS',
		visibility: 'visible',
		back: params.back,
	});
	const args = {
		feathers: false,
		gems: true,
		coins: true,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });
	window.parent.postMessage({ _: 'loaded' });
};

const attachMaterials = ({ materials, pageSize = 9 }) => {
	let currentPage = 0;
	const materialsEl = document.querySelector('.materials .currentPage');
	const prevButton = document.querySelector('.materials .prevPage');
	const nextButton = document.querySelector('.materials .nextPage');
	const pageNumber = document.querySelector('.controls .pageNumber');

	let materialEntries;

	const sortEntries = (reverse = false) => {
		materialEntries = Object.entries(materials).sort(
			([k1, v1], [k2, v2]) => {
				// Sort by grade and name
				if (v1.grade !== v2.grade) {
					return v1.grade - v2.grade;
				}
				if (v1.name < v2.name) return -1;
				if (v1.name > v2.name) return 1;
				return 0;
			}
		);
		if (reverse) {
			materialEntries = materialEntries.reverse();
		}
	};

	const renderPage = () => {
		const totalPages = Math.ceil(materialEntries.length / pageSize);
		const start = currentPage * pageSize;
		const end = start + pageSize;
		const currentMaterials = materialEntries.slice(start, end);

		materialsEl.innerHTML = '';
		currentMaterials.forEach(([k, v]) => {
			const materialEl = document.createElement('div');
			materialEl.classList.add('material');
			materialEl.innerHTML = `
				<div class="graphic">
					<img class="thumbnail" src="${v.image}" alt="${k}" />
					<div class="stars textOutlined">${'★'.repeat(v.grade)}</div>
				</div>
				<div class="details">
					<div class="">${v.name}</div>
					<div class="count">x${v.count}</div>
				</div>
		`;
			materialsEl.appendChild(materialEl);
		});

		// Calculate the number of spacer elements needed
		const spacerCount = pageSize - currentMaterials.length;
		for (let i = 0; i < spacerCount; i++) {
			const spacerEl = document.createElement('div');
			spacerEl.classList.add('material', 'spacer');
			spacerEl.innerHTML = `
				<div class="graphic"></div>
				<div class="details"></div>
			`;
			materialsEl.appendChild(spacerEl);
		}

		if (currentPage === 0) {
			prevButton.classList.add('disabled');
		} else {
			prevButton.classList.remove('disabled');
		}

		if (currentPage >= totalPages - 1) {
			nextButton.classList.add('disabled');
		} else {
			nextButton.classList.remove('disabled');
		}

		pageNumber.textContent = `${currentPage + 1} / ${totalPages}`;
	};

	// Attach event listeners once
	prevButton.addEventListener('click', () => {
		if (currentPage > 0) {
			currentPage--;
			renderPage();
		}
	});

	nextButton.addEventListener('click', () => {
		if (
			currentPage <
			Math.ceil(Object.entries(materials).length / pageSize) - 1
		) {
			currentPage++;
			renderPage();
		}
	});

	const updatePage = ({ reverse } = {}) => {
		sortEntries(reverse);
		renderPage();
		console.log({ materialEntries });
	};
	updatePage({ reverse: true });

	return {
		updatePage,
	};
};

const attachControls = ({ updatePage }) => {
	const gradeSort = document.querySelector('.controls .grade');
	gradeSort.addEventListener('click', () => {
		const gradeReverse = gradeSort.classList.contains('reverse');
		if (gradeReverse) {
			gradeSort.classList.remove('reverse');
		} else {
			gradeSort.classList.add('reverse');
		}
		updatePage({ reverse: !gradeReverse });
	});
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const materials = MaterialsStore.getHydrated();
	const { updatePage } = attachMaterials({ materials });

	attachControls({ updatePage });

	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', domLoaded);
