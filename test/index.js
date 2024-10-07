const links = [
	{ href: '/assets/stage/main/background.html', label: 'Main Map' },
	{ href: '/assets/stage/candy/background.html', label: 'Candy Map' },
	{ href: 'characters/index.html', label: 'Characters Animation Test' },
	{ href: 'characters/sprites/index.html', label: 'Sprites Tool' },
	{ href: 'characters/dragonbones/index.html', label: 'DragonBones Tool' },
	{ label: 'assets' },
	{ label: 'audio' },
	{ label: 'colors' },
	{ label: 'compress' },
	{ label: 'compressChars' },
	{ label: 'effects' },
	{ label: 'experience' },
	{ label: 'gear' },
	{ label: 'push' },
	{ label: 'pvp' },
	{ label: 'render' },
	{ label: 'Stage Tracking', href: 'stageTrack.html' },
	{ label: 'svgIcons' },
	{ label: 'Unit Leveling' },
	{ label: 'userHandler' },
	{ label: 'Vendor (and other dependencies)', href: 'vendor.html' },
	{ label: 'Webcam' },
];

const domLoaded = async () => {
	document.body.innerHTML += links
		.map(
			(link) =>
				`<a href="${link.href || link.label + '.html'}">${link.label}</a>`
		)
		.join('\n');
};
document.addEventListener('DOMContentLoaded', domLoaded);
