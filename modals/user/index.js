import { userIconsMap } from '../../assets/userIcons/$map.js';
import { getUser, updateUserFromAPI } from '../../user/user.js';

const originalIcons = [
	'https://i.pinimg.com/736x/8b/f3/e2/8bf3e286d71421d3e8f22e13aeddbdca.jpg',
	'https://img.freepik.com/premium-vector/cute-rabbit-mascot-vector-cartoon-style_912383-1002.jpg',
	'https://i.pinimg.com/564x/01/83/ce/0183ce46c1e0a556a39075a53abdec4c.jpg',
	'https://ih1.redbubble.net/image.4957503155.2631/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
	'https://momoandsasa.com/cdn/shop/files/75B7B136-3AC1-4FB4-A751-AFA463C5C0D3.jpg?v=1719804521',
	'https://external-preview.redd.it/panda-bear-we-baby-bears-someone-like-you-ai-cover-of-song-v0-kWShZJ4lFKGak1xuk9O0w8m4touu-H1nU_LDvXquvWI.png?format=pjpg&auto=webp&s=7fe1b6c9b63d9e4159ad6031439f7a32691bcb09',
	'https://cn.i.cdn.ti-platform.com/content/2167/we-baby-bears/showpage/fr/webabybears-icon.0c2de198.0c2de198.png',
	'https://i.pinimg.com/564x/f2/71/4d/f2714ddbb7fed05c363a40dce542116e.jpg',
	'https://img.freepik.com/premium-photo/adorable-2d-cartoon-anime-dachshund-savors-bowl-food-white-background_983420-189515.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRorqUZhgGxIMV6ER6HBNyh85pgxUbGu3Nk_NW1XdsLFabrcLpO_n-8UM-Wql7e8liszhE&usqp=CAU',
	'https://cdn.hero.page/pfp/4674d997-cd06-4dae-a434-4bbea59173c3-spooky-bats-matching-halloween-animal-profile-pictures-right-side-Left-PFP.png',
	'https://otakuusamagazine.com/wp-content/uploads/2018/12/hamtaro.png',
	'https://alchetron.com/cdn/mirmo-597b9e3a-53ea-4997-828b-8744dc7b754-resize-750.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDNi9syX-VaToVXMrRCkDieSVpm5PYKz-LRzfkC2MZDojwhHhXWhD0_MBnJ7uRu6Fd3k&usqp=CAU',
	'https://i.ytimg.com/vi/-Yo480gE_Pk/hqdefault.jpg',
	'https://i.pinimg.com/736x/c1/dd/55/c1dd552f209a6623c2b9a2f3427ef38c.jpg',
	'https://img.clipart-library.com/2/clip-cute-anime-animals/clip-cute-anime-animals-34.png',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjfH0aLRJhdTfhJzFxWSLROnsFnt8WhvIsxSVi1oL3Hg1Y8TqjFOpQ1Hv5eSjQczng0Q8&usqp=CAU',
	'https://cdn.hero.page/pfp/47021e41-9831-440d-898b-1b32664d4339-cute-peeking-otter-anime-profile-picture-matching-cute-animal-pfp-set-3.png',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlMzGPYzh6jLV024RJ9Eitb9W1EmsjzSgP_g&s',
];

const UserIcon = (userIconCurrent) => (src, index) => {
	const classList = ['profile-item'];
	if (index + '' === userIconCurrent + '') {
		classList.push(' selected ');
	}
	return `
	<div class="${classList.join(' ')}" data-index="${index}">
		<img src="${src}">
	</div>
`;
};
const attachUserIcons = async ({ user }) => {
	const userIconCurrent = user?.data?.image || 0;
	const icons = await userIconsMap();
	const grid = document.querySelector('.profile-grid');
	grid.innerHTML = icons.map(UserIcon(userIconCurrent)).join('\n');

	grid.addEventListener('pointerdown', (e) => {
		const currentSelected = grid.querySelector('.selected');
		currentSelected && currentSelected.classList.remove('selected');
		e.target.classList.add('selected');
	});
};

const attachActions = async ({ user }) => {
	const equipButton = document.querySelector('.equip-button');
	equipButton.addEventListener('pointerdown', async () => {
		const currentSelected = document.querySelector(
			'.profile-grid .selected'
		);
		const { index: image } = currentSelected?.dataset || {};
		await updateUserFromAPI({
			...user.data,
			image: Number(image),
		});
		window.parent.postMessage({
			_: 'broadcastUserIconUpdate',
		});
	});
};

const domLoaded = async () => {
	const { apiUser: user } = await getUser();
	await attachUserIcons({ user });
	await attachActions({ user });
	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
};

document.addEventListener('DOMContentLoaded', domLoaded);
