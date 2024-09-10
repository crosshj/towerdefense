const colors = [
	{ hex: '#1E3FA9' },
	{ hex: '#6A5ACD' },
	{ hex: '#4682B4' },
	{ hex: '#00CED1' },
	{ hex: '#5F9EA0' },
	{ hex: '#6495ED' },
	{ hex: '#2E8B57' }, // Sea green
	{ hex: '#3B5998' }, // Different shade of blue
	{ hex: '#4B0082' }, // Indigo
	{ hex: '#007BA7' }, // Deep cerulean
];

const container = document.getElementById('color-container');

colors.forEach((color) => {
	const swatch = document.createElement('div');
	swatch.className = 'swatch';

	const colorBox = document.createElement('div');
	colorBox.className = 'color-box';
	colorBox.style.backgroundColor = color.hex;

	const label = document.createElement('span');
	label.textContent = color.hex;

	swatch.appendChild(colorBox);
	swatch.appendChild(label);
	container.appendChild(swatch);
});
