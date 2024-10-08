import { MaterialsStore } from '../../user/material.js';

const pageDone = ({ params }) => {
	window.parent.postMessage({
		_: 'title',
		title: 'MATERIALS',
		visibility: 'visible',
		back: params.back,
	});
	const args = {
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });
	window.parent.postMessage({ _: 'loaded' });
};

const attachMaterials = ({ materials }) => {
	const materialsEl = document.querySelector('.currentMaterials');
	materialsEl.innerHTML = '';
	console.log({ materials });
	Object.entries(materials).forEach(([k, v]) => {
		const materialEl = document.createElement('div');
		materialEl.classList.add('material');
		materialEl.innerHTML = `
			<div class="" style="display:inline">${k}</div>
			<div class="" style="display:inline">${v}</div>
		`;
		materialsEl.appendChild(materialEl);
	});
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const materials = MaterialsStore.lsGet();
	attachMaterials({ materials });

	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', domLoaded);
