// Utility function to get the current timestamp in milliseconds
const getCurrentTimestamp = () => new Date().getTime();

// The duration of a session in milliseconds (e.g., 1 hour)
const SESSION_DURATION_MS = 3600000;

export const setSessionActive = () => {
	const timestamp = getCurrentTimestamp();
	sessionStorage.setItem('SESSION_ACTIVE', timestamp.toString());
};

export const isSessionActive = () => {
	const sessionValue = sessionStorage.getItem('SESSION_ACTIVE');

	if (!sessionValue) {
		return false;
	}

	// Check if the value is the old "true" string
	if (sessionValue === 'true') {
		sessionStorage.removeItem('SESSION_ACTIVE');
		return false;
	}

	// Parse the timestamp and check if the session is still active
	const timestamp = parseInt(sessionValue, 10);
	const currentTime = getCurrentTimestamp();

	const isActive = currentTime - timestamp <= SESSION_DURATION_MS;

	if (isActive) {
		setSessionActive(); // Refresh the session timestamp
	}

	return isActive;
};
