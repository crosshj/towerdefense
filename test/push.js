const setupPushNotifications = async (subscription) => {
	console.log({ subscription });
	// await updateUserFromAPI({
	// 	pushSubscription: subscription
	// });

	await fetch('https://datamosh.vercel.app/api/teedee/notification/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			subscription,
			payload: 'I ❤️ Aileen!'
		})
	});
};

const sub2 = {};

const onLoaded = async () => {
	await setupPushNotifications(sub2);
};

document.addEventListener('DOMContentLoaded', onLoaded);
