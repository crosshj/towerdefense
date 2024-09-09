import { userIconsMap } from '../../assets/userIcons/$map.js';
import { getUser, updateUserFromAPI } from '../../user/user.js';

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
			forced: true,
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
