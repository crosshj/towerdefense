// export const getVersionString = async () => {
// 	const currentVersion = '0.0.1';
// 	const currentHash = '{GIT_COMMIT_HASH}'; //will be replace with GH Action
// 	if (currentHash.includes('_HASH')) {
// 		return currentVersion;
// 	}
// 	return currentVersion + '-' + currentHash.slice(0, 7);
// };

const currentHash = '{GIT_COMMIT_HASH}';

export const getVersionString = async () => {
	const { version } = await fetch('/version').then((response) =>
		response.json()
	);
	let localString = '';
	if (currentHash.includes('_HASH')) {
		localString = ' (local)';
	}
	return 'v' + version + localString;
};
