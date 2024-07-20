export const getVersionString = () => {
	const currentVersion = '0.0.1';
	const currentHash = '{GIT_COMMIT_HASH}'; //will be replace with GH Action
	if (currentHash.includes('_HASH')) {
		return currentVersion;
	}
	return currentVersion + '-' + currentHash.slice(0, 10);
};
