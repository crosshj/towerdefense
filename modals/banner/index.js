import { getUser } from '../../user/user.js';

const withCommas = (x) => {
	return x.toLocaleString('en', { useGrouping: true });
};

const friendlyGradName = {
	normal: 'Normal',
	master: 'Master',
	smaster: 'Super Master',
	umaster: 'Ultra Master',
	legend: 'Legend'
};

const updateUserInfo = async () => {
	const user = await getUser();
	const { level, totalExp, expForNextLevel } = user.levelInfo;

	const grade = document.querySelector('.gradeName');
	const levelNumb = document.querySelector('.levelNumber');
	const exp = document.querySelector('.currentExp');
	const expTotal = document.querySelector('.expToLevel');

	grade.innerHTML = friendlyGradName[user.grade];
	levelNumb.innerHTML = level;
	exp.innerHTML = withCommas(totalExp);
	expTotal.innerHTML = withCommas(expForNextLevel);
};

document.addEventListener('DOMContentLoaded', async () => {
	await updateUserInfo();
	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', (e) => {
		e.preventDefault();
		e.stopPropagation();
		window.parent.postMessage({
			_: 'navigate'
		});
	});
	document.body.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});
