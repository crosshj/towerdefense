export const getCurrentVersion = ({ currentHash }) => {
	const currentVersion = '1.0.0';
	const version = currentHash.includes('_HASH')
		? currentVersion
		: currentVersion + '-' + currentHash.slice(0, 7);
	return version;
};

export const versionHandler = ({ currentHash }) => ({
	match: (url) => /\/version$/.test(url),
	async handler(url, options) {
		return { json: { version: getCurrentVersion({ currentHash }) } };
	},
});
