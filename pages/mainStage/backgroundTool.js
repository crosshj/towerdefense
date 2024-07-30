const stageDetails = [
	{ name: 'Mythical Pantheon', color: '#8B008B' }, // DarkMagenta
	{ name: 'Industrial Complex', color: '#556B2F' }, // Dark Olive Green
	{ name: 'Frozen Tundra', color: '#B0C4DE' }, // Light Steel Blue (lighter and greyer)
	{ name: 'Thunder Oasis', color: '#FFD700' }, // Gold (less saturated)
	{ name: 'Tropical Graveyard', color: '#9370DB' }, // Medium Purple (less saturated)
	{ name: 'Rocky Highlands', color: '#A9A9A9' }, // DarkGray
	{ name: 'Sakura', color: '#FFB6C1' }, // LightPink
	{ name: 'Coastal', color: '#00BFFF' }, // DeepSkyBlue
	{ name: 'Forest Path', color: '#228B22' }, // ForestGreen
	{ name: 'Meadow', color: '#98FB98' } // PaleGreen
];

// String representation of path with reduced points
const pathString = `
445.500,4500.000;
445.500,4400.000;
501.253,4333.725;
555.634,4312.450;
607.302,4291.175;
654.987,4269.900;
697.513,4248.625;
733.834,4227.350;
763.055,4206.075;
784.457,4184.800;
797.512,4163.525;
801.900,4142.250;
797.512,4120.975;
784.457,4099.700;
763.055,4078.425;
733.834,4057.150;
697.513,4035.875;
654.987,4014.600;
607.302,3993.325;
555.634,3972.050;
501.253,3950.775;
445.500,3929.500;
389.747,3908.225;
335.366,3886.950;
283.698,3865.675;
236.013,3844.400;
193.487,3823.125;
157.166,3801.850;
127.945,3780.575;
106.543,3759.300;
93.488,3738.025;
89.100,3716.750;
93.488,3695.475;
106.543,3674.200;
127.945,3652.925;
157.166,3631.650;
193.487,3610.375;
236.013,3589.100;
283.698,3567.825;
335.366,3546.550;
389.747,3525.275;
445.500,3504.000;
501.253,3482.725;
555.634,3461.450;
607.302,3440.175;
654.987,3418.900;
697.513,3397.625;
733.834,3376.350;
763.055,3355.075;
784.457,3333.800;
797.512,3312.525;
801.900,3291.250;
797.512,3269.975;
784.457,3248.700;
763.055,3227.425;
733.834,3206.150;
697.513,3184.875;
654.987,3163.600;
607.302,3142.325;
555.634,3121.050;
501.253,3099.775;
445.500,3078.500;
389.747,3057.225;
335.366,3035.950;
283.698,3014.675;
236.013,2993.400;
193.487,2972.125;
157.166,2950.850;
127.945,2929.575;
106.543,2908.300;
93.488,2887.025;
89.100,2865.750;
93.488,2844.475;
106.543,2823.200;
127.945,2801.925;
157.166,2780.650;
193.487,2759.375;
236.013,2738.100;
283.698,2716.825;
335.366,2695.550;
389.747,2674.275;
445.500,2653.000;
501.253,2631.725;
555.634,2610.450;
607.302,2589.175;
654.987,2567.900;
697.513,2546.625;
733.834,2525.350;
763.055,2504.075;
784.457,2482.800;
797.512,2461.525;
801.900,2440.250;
797.512,2418.975;
784.457,2397.700;
763.055,2376.425;
733.834,2355.150;
697.513,2333.875;
654.987,2312.600;
607.302,2291.325;
555.634,2270.050;
501.253,2248.775;
445.500,2227.500;
389.747,2206.225;
335.366,2184.950;
283.698,2163.675;
236.013,2142.400;
193.487,2121.125;
157.166,2099.850;
127.945,2078.575;
106.543,2057.300;
93.488,2036.025;
89.100,2014.750;
93.488,1993.475;
106.543,1972.200;
127.945,1950.925;
157.166,1929.650;
193.487,1908.375;
236.013,1887.100;
283.698,1865.825;
335.366,1844.550;
389.747,1823.275;
445.500,1802.000;
501.253,1780.725;
555.634,1759.450;
607.302,1738.175;
654.987,1716.900;
697.513,1695.625;
733.834,1674.350;
763.055,1653.075;
784.457,1631.800;
797.512,1610.525;
801.900,1589.250;
797.512,1567.975;
784.457,1546.700;
763.055,1525.425;
733.834,1504.150;
697.513,1482.875;
654.987,1461.600;
607.302,1440.325;
555.634,1419.050;
501.253,1397.775;
445.500,1376.500;
389.747,1355.225;
335.366,1333.950;
283.698,1312.675;
236.013,1291.400;
193.487,1270.125;
157.166,1248.850;
127.945,1227.575;
106.543,1206.300;
93.488,1185.025;
89.100,1163.750;
93.488,1142.475;
106.543,1121.200;
127.945,1099.925;
157.166,1078.650;
193.487,1057.375;
236.013,1036.100;
283.698,1014.825;
335.366,993.550;
389.747,972.275;
445.500,951.000;
501.253,929.725;
555.634,908.450;
607.302,887.175;
654.987,865.900;
697.513,844.625;
733.834,823.350;
763.055,802.075;
784.457,780.800;
797.512,759.525;
801.900,738.250;
797.512,716.975;
784.457,695.700;
763.055,674.425;
733.834,653.150;
697.513,631.875;
654.987,610.600;
607.302,589.325;
555.634,568.050;
501.253,546.775;
445.500,525.500;
389.747,504.225;
335.366,482.950;
283.698,461.675;
236.013,440.400;
193.487,419.125;
157.166,397.850;
127.945,376.575;
106.543,355.300;
93.488,334.025;
89.100,312.750;
93.488,291.475;
106.543,270.200;
127.945,248.925;
157.166,227.650;
193.487,206.375;
236.013,185.100;
283.698,163.825;
335.366,142.550;
389.747,121.275;
445.500,100.000;
`;

// String representation of stages
const stagesString = `
525, 4327, 1, false;
610, 4290, 2, false;
687.5, 4255, 3, false;
755, 4210, 4, false;
800, 4142.5, 5, false;
755, 4075, 6, false;
687.5, 4030, 7, false;
610, 3998, 8, false;
525, 3959.5, 9, false;
445.5, 3925, 10, true;
445.5,3500,20,true;
445.5,3075,30,true;
445.5,2650,40,true;
445.5,2225,50,true;
445.5,1800,60,true;
445.5,1375,70,true;
445.5,950,80,true;
445.5,525,90,true;
445.5,100,100,true;
`;

function parsePathString(str) {
	return str
		.trim()
		.split(';\n')
		.map((line) => {
			const [x, y] = line.split(',');
			return { x: parseFloat(x), y: parseFloat(y) };
		});
}

function parseStagesString(str) {
	const stages = str
		.trim()
		.split(';\n')
		.map((line) => {
			const [x, y, stageNumber, isBoss] = line.split(',');
			return {
				x: parseFloat(x),
				y: parseFloat(y),
				stageNumber: parseInt(stageNumber),
				isBoss: parseInt(stageNumber) % 10 === 0
			};
		});
	const cloneStages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (const [i] of Object.keys(new Array(9).fill())) {
		for (const stage of stages) {
			if (!cloneStages.includes(stage.stageNumber)) continue;
			const j = Number(i) + 1;
			const axis = 445.5;
			stages.push({
				x: j % 2 ? 2 * axis - stage.x : stage.x,
				y: stage.y - 425.5 * j,
				stageNumber: stage.stageNumber + 10 * j,
				bossStage: false
			});
		}
	}
	return stages;
}

const path = parsePathString(pathString);
const stages = parseStagesString(stagesString);

function hslToHex(h, s, l) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

function numberToColor(num) {
	if (num < 1 || num > 512) {
		throw new Error('Number must be between 1 and 512');
	}
	const hue = (num - 1) * (360 / 512);
	const saturation = 70; // Fixed saturation for better distinction
	const lightness = 50; // Fixed lightness for better distinction
	return hslToHex(hue, saturation, lightness);
}

const onLoaded = () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	const clickMap = params.clickMap === 'true';

	const canvas = document.getElementById('stageCanvas');
	const context = canvas.getContext('2d');
	const canvasWidth = 891;
	const padding = 100;

	const minY = Math.min(...path.map((stage) => stage.y));
	const maxY = Math.max(...path.map((stage) => stage.y)) - 100;
	const canvasHeight = maxY - minY + 2 * padding;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	function getContrastYIQ(hexcolor) {
		hexcolor = hexcolor.replace('#', '');
		const r = parseInt(hexcolor.substr(0, 2), 16);
		const g = parseInt(hexcolor.substr(2, 2), 16);
		const b = parseInt(hexcolor.substr(4, 2), 16);
		const yiq = (r * 299 + g * 587 + b * 114) / 1000;
		return yiq >= 128 ? '#000' : '#FFF';
	}

	// Draw the path
	function drawPath(stages, color, width) {
		context.beginPath();
		context.moveTo(stages[0].x, stages[0].y - minY + padding); // Adjust for minY and padding
		for (let i = 1; i < stages.length; i++) {
			context.lineTo(stages[i].x, stages[i].y - minY + padding); // Adjust for minY and padding
		}
		context.strokeStyle = color;
		context.lineWidth = width;
		context.stroke();
	}

	// Function to draw a circle
	function drawCircle(x, y, radius, color, text) {
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI * 2, false);
		context.fillStyle = clickMap ? numberToColor(text) : color;
		context.fill();

		if (clickMap) return;
		context.lineWidth = 2;
		context.strokeStyle = '#000';
		context.stroke();
		context.fillStyle = '#000';
		context.font = `${radius}px Arial`;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(text, x, y);
	}

	function drawBackgrounds() {
		for (const [_i, detail] of Object.entries(stageDetails)) {
			const i = Number(_i);
			// Draw a background rectangle with a gradient for smoother transitions
			const rectHeight = 425; // Adjusted height
			const yPosition = i * rectHeight + padding;

			const gradient = context.createLinearGradient(
				0,
				yPosition,
				0,
				yPosition + rectHeight
			);
			gradient.addColorStop(0, detail.color);
			gradient.addColorStop(0.8, detail.color);
			gradient.addColorStop(
				1,
				stageDetails[i + 1]?.color || detail.color
			);

			context.fillStyle = gradient;
			context.fillRect(0, yPosition, canvasWidth, rectHeight);

			// Put text in the middle of the screen and area that says the name of the area
			context.fillStyle = getContrastYIQ(detail.color);
			context.font = '20px Arial';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(
				detail.name,
				canvasWidth / 2,
				yPosition + rectHeight / 2
			);
		}
		// Ensure the first color extends to the top of the canvas
		context.fillStyle = stageDetails[0].color;
		context.fillRect(0, 0, canvasWidth, padding);

		// Ensure the last color extends to the bottom of the canvas
		context.fillStyle = stageDetails[9].color;
		context.fillRect(
			0,
			canvasHeight - padding - 200,
			canvasWidth,
			padding + 200
		);
	}
	!clickMap && drawBackgrounds();

	// Draw the path
	const pathColor = '#5d482d';
	!clickMap && drawPath(path, pathColor, 25);

	// Draw stages
	const bossRadius = 25;
	const bossColor = '#ff6666';
	const subRadius = 23;
	const subColor = '#e5cdae';

	stages.forEach((stage) => {
		const radius = stage.isBoss ? bossRadius : subRadius;
		const color = stage.isBoss ? bossColor : subColor;
		drawCircle(
			stage.x,
			stage.y - minY + padding,
			radius,
			color,
			stage.stageNumber
		);
	});

	if (clickMap) {
		const clicks = {};
		for (let i = 1; i <= 100; i++) {
			const color = numberToColor(i);
			let url = 'url';
			if (i <= 10) url = 'openField-' + i;
			if (i <= 20 && i > 10) url = 'forest-' + i; //TODO: 'forest'
			if (i <= 30 && i > 20) url = 'water-' + i;
			if (i <= 40 && i > 30) url = 'sakura-' + i;
			if (i <= 50 && i > 40) url = 'highlands-' + i; //TODO: highlands
			if (i <= 60 && i > 50) url = 'tropical-' + i;
			if (i <= 70 && i > 60) url = 'oasis-' + i; // TODO: thunderOasis
			if (i <= 80 && i > 70) url = 'tundra-' + i; // TODO: tundra
			if (i <= 90 && i > 80) url = 'industrial-' + i; // TODO: industrial
			if (i <= 100 && i > 90) url = 'pantheon-' + i; // TODO: final realm
			clicks[color] = url;
		}
		window.clicks = clicks;
	}
};
document.addEventListener('DOMContentLoaded', onLoaded);
