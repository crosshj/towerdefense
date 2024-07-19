/*
in the future, this will be where we get information about a given user
for now, this will return an example user's info
*/

/* TODO: this will be a call to backend to get user details */
export const getUser = async () => {
	const thisUser = {
		auto: localStorage.getItem('auto') === 'true',
		level: 1, //TODO: get level from experience
		experience: 0,
		grade: 'legend'
	};
	return thisUser;
};
