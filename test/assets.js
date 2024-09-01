import { append } from '../utils/htmlToElement.js';
import { loadAssets } from '../visuals/assets/assets.js';

const testSlices = async () => {
	const { images } = await loadAssets({ root: '../' });
	const showImage = (k, img, i) => {
		const { width, height } = img;
		if (typeof i === 'undefined') {
			append(`<pre>${k}: ${[width, height].join(' x ')}</pre>`);
			document.body.append(img.cloneNode(true));
			return;
		}
		let container = document.querySelector(`#${k}`);
		if (!container) {
			append(`<pre>${k}: ${[width, height].join(' x ')}</pre>`);
			container = append(`<div id="${k}" style="display:flex"></div>`);
		}
		container.append(img.cloneNode(true));
	};
	const allImages = Object.entries(images);
	const onlyTee = Object.entries(images).filter(([k, v]) =>
		k.includes('tee')
	);
	for (var [k, value] of allImages) {
		if (Array.isArray(value)) {
			value.forEach((v, i) => showImage(k, v, i));
			continue;
		}
		showImage(k, value);
	}
};

const testTeeRun = async () => {
	const {
		images: { teeRunBlue: teeRun },
	} = await loadAssets({ root: '../' });
	let { width, height } = teeRun[0];
	[width, height] = [width, height].map((x) => x * 0.5);
	append(`<pre>teeRun animated</prev>`);
	const canvas = append(`<canvas></canvas>`);
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	let i = 0;
	const frame = () => {
		if (!teeRun[i]) i = 0;
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(teeRun[i], 0, 0, width, height);
		i++;
	};
	const animate = () => {
		requestAnimationFrame(() => {
			frame();
			setTimeout(animate, 125);
		});
	};
	animate();
};

const testTeeAttack = async () => {
	const {
		images: { teeAttackBlue: teeAttack },
	} = await loadAssets({ root: '../' });
	let { width, height } = teeAttack[0];
	[width, height] = [width, height].map((x) => x * 0.5);
	append(`<pre>teeAttack animated</prev>`);
	const canvas = append(`<canvas></canvas>`);
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	let i = 0;
	const frame = () => {
		if (!teeAttack[i]) i = 0;
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(teeAttack[i], 0, 0, width, height);
		i++;
	};
	const animate = () => {
		requestAnimationFrame(() => {
			frame();
			setTimeout(animate, 125);
		});
	};
	animate();
};

(async () => {
	await testSlices();
	await testTeeRun();
	await testTeeAttack();
})();
