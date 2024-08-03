import { getUserLevelInfo } from '../utils/experience.js';
import { clone } from '../utils/utils.js';

const LS_NAME = 'USER_INFO';

const rankToGrade = {
	1: 'normal',
	2: 'master',
	3: 'smaster',
	4: 'umaster',
	5: 'legend'
};

const defaultValue = {
	rank: 1,
	exp: 0
};

export const getUserFromAPI = async () => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken)
			throw new Error('missing token, cannot get user from API');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token: userToken })
		};
		const user = await fetch(
			'https://datamosh.vercel.app/api/teedee/players/getByToken',
			opts
		).then((x) => x.json());
		if (user.error) throw new Error(user.error);
		return user;
	} catch (e) {
		console.log(e);
		return;
	}
};

export const updateUserFromAPI = async (data) => {
	try {
		const userToken = localStorage.getItem('USER_TOKEN');
		if (!userToken)
			throw new Error('missing token, cannot get user from API');
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: userToken,
				...data
			})
		};
		const user = await fetch(
			'https://datamosh.vercel.app/api/teedee/players/setByToken',
			opts
		).then((x) => x.json());
		if (user.error) throw new Error(user.error);
		return user;
	} catch (e) {
		return;
	}
};

const getUserImage = async () => {
	const whiteUserIcon =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAIAAAAnX375AAAACXBIWXMAAC4jAAAuIwF4pT92AAAEkElEQVRYCb1XS0xbRxR9/2djv5cYB+zgD2DMz67BBoJJrEgkLYI6i4pWbSNV6aaqRDdt1UWVrlopm0ZqK2XRLiKkVFGkZBGlUvpRQpsECRJ+TlRjg6HhUzCxC44Tx3yNjV8ncvUwfuNPTMrTXdy59845945n7oxRCbYf2duP4OJbe8uIEChJ7jklhudI2Wxtsh09bLHU1xqqtVrN6tra9NSM2zU+MuTovdPn8/lzxEGlBYqsoW1txz/+9CObrYVMsySLi0tXLl89f/7C/Jw3KxrKSEsyBInFotNffNbV9QFQMoQlXE6n+8yZsz03b2eOxGnRfgTFoCJl2O9/+PbUqZM0TWVGSXiVyuIjtpanobDLPQEFTBhxUYEMxVConP36y3fe7iRJIhe+RAzLMtU1lT6//+H0LBQTGHFaIodmdPLdt05//glFvfB+lhfK5HL5qNsTCD6FIuMi5gCKYSkiLij4sfscmIyiaO4l8pGlpZonoWf994ZTYBNDDMEgcsLeplGr8uMDxGCixWzq6HgVCg6WFheKtbkhr/L4OhGlovhIyyEhMrAQzxMRfE0N9RjMLghMa1Aoig43N0LBCRTWfXRl2rxXNZHFPpbRV5RBwf/PHguyhnUrDMFxoczOL3Acl3bVcnCEl1emZueEyMAC3z6O0fF4fFeUi4Hg0AMXdPtgKEkJZcTl4ZDdUT5+MugcEyIDC4FSkP554+7Ign+pVKXMbxOBH+XPyameAQcUHFRJCyUSR765cCUWy/PB0OcYvd47KIRNWHCmwgRdcc+st1guM+rL8Rc8oNNe37lL14bHJqGwwIgzVeZ0viH3pE6l1KlLcmf1BYLfXbr2c/9wOsznlGxNYzp3NM7dcrgokqjTlxHgLGX73NNzX3Vf/nXgQTrA/+yqzg+zQSGtFmPXG+0txsp0xIFQ+GrvwMUbvd6lYFY0vKTWTCFcZllcCvz9yL+6sQEuOYogwKUNOnCc49YjkUeB4KDLc/GXP3661RcOPcuMk/CiTZ3vZ8irqFBma6izml/RaVRiES2iaRo8uUhQLR6Px6PR2GY0GtncXNuI/BMIOlzj/fed0/MLGQCBC2198z1oBAA+ZrO2tx7VaTUsI83lYlleWfX6/HeH79+5N+RfXILCAiNxEIkIfSUqVVtHe1Nzc6G8MPduwEglhiq9Wlls1pf9frPHMza2tQU52YQUiaVQlldWHbPbLVYrTWd/SKbMBUOWZc0NFpaR3BKREy7XxvpaSgyg3JGIQq15zf66ydpC0XRKaO5DkqL0NbVoLEZzsYejzs3IjoUkmJ2Ux+0njE2HdsOXyAzsL53BsLm6zIVD3klPcrqEBl3nxwcN9ZVGo6hAwlt2oxAkpdVVROoMB2Irj2f+4qGIcmSbUmcyiSUvhy9BwBQr1drSfdG1uRnnNmVZUpXKaiMpEvO+3Svg4SpTaxkRjV7v5tGIItP2v2iRrhLNa5fycEKFVJSQMlkyC8Haa7bjJCyCZm/f2/E5aCgtQQg8mYUI/zbBT2QbIW9a3pu3wsW2lpNYiIArxGOBGnn9JSocgiWz/AvWKnAh05mxyAAAAABJRU5ErkJggg==';
	const orangeFunky =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAIAAAAnX375AAAACXBIWXMAAC4jAAAuIwF4pT92AAAJ00lEQVRYCaVXeWwcVxl/7825u7Oz6yt24kS2k5Q0qd0jtKRHAgmlbZASaKEqoi1CApWmLf0LCalFQqJ/IEAqolwS6SFCqXoqNEBpmxLofYWmieKkdWM7dZzDXnuv2dmdex6/mdlsbIc/aDqanX3zrt/3/b7jfUMP3KeRsy6BUVmiqsTaMiJjZw3/Hx2uz41GwP/XTHFBpyRQRWYiIEWaUdm54WFPLNdSzLTCs1HPQEKztMLwVGWaloVzBmvpAJKgq+MtBG1CAkwWGcjMxKitZZ+ykVWFMAy8+QSLUCsikFJNZap8TnaL5WKDd9Gl1xIlP1dKbozlDz9kHH3N8c/oyrQUQD8dntrOBu8mXZcRKT0XD22qdrEVX9eHbhYEoTUUEQtTn7t+sk4XraPLbwgJGxk7fuzEzEVrBrq72poAGO26VGhbneekevCxICBQFr5JoGhLhE/UoOkeku2jy64llD369J77t+8MQy4Kwrq1q+77wa1ngMWMNHRne210Zuwd7M+yEbGfCOjMZLr0GihB29bU6vbvdvw9CELOuef7r797aPtjL5yZF7U4W3svjYFEsDp/7JO8gbeeq4igPrfnlYblYCViq39Zd81sXLCqb/5GlKidUC4M+Jm4nDuDnf8d0j5IIJU1S5wyZOTGOJ98ce6cqK12kMwS/L+x9zD0QyMIw2s2XHLjlvVgGCrDMaNpp6+mlqdfm/9UH2BfeIgwgfCQhD7RHW5NEXOSUkazA3z8KW6XWkto2wXwSryqipx0AsMwG9+442eu5z/wk9vXXbKqNRkNPw7QhYHINj5MmAiJhz+a3Ln7vZFJI9RW0t6rcRNBpv3XY+i0QtysW0ZhzKpOb7t1cy6bwabQ7PFdrxTLBobKVXMuHtoxEWQesREejbz3kSd2P/DwrogZRjddceH9P75NVDto3xY+9abXc7V37CVJIJYbBuUJQkWHyXlJfuQX2267Z3upUoNAsOimqy7adOWFcyA58RrwU+g5D5LmViSTHvvLv2EVtIOA7z1wpGLUO9t1Iii050qnNEX5S8jWikgbky9wrZ92rg09t0P2n/j13XveOeK5/tqhlRdfsJzGpvNdi/NAkjPByB+THD8PMjFMhBTjteezn798cO3gyrZc84DjVPKVbgmxJWuyqinm24QV6+Q8l2ZJGMpe4eatV4hyMweFgW8URj3LIDzQacU59ESS9BZANpno7emYLRm24/7wjhsLs1WEmiBEDuK7dTBJxLTQv4Vme8TGyWDiH9njT9f7v2XbLhFT5ePDlInQD/QGrhX6NvHMoDJanHyOwR/jawEk5Ig8cHBV/4HDRy3bveabP3Jc73u3fPmub29BP4fnM5ko7VRpi14WrZMp96feSu+/11l0Q5hbY5slzzYQqZywaLJdZMV9qjXGhGhb/FI4jGPg5oNXx2huJV5u2rrhyb+96vtBvWFDZCsOc2D4Tr12fF+G6llRZF2Xcb/md3xWdCt+7VTm5E7742csK2Bw6RBzEZREEnHUMxLjYVso5HjhvCAJX/4ueMfYyv4l93z/pq6OXF7PbP3S5+6MVXRtozjxvvfBDibrgldmgsDVbtdxnVAgPVdxJFKR6mkBhyDqgXxG6NTFDk3MqiwlI6ibWsGDaP3BzuZb/BenggcJg4vAXUNwkdQHdm3WmBox3vpp0Jht7xloW35FOqOXjg8HVpkGNpNT1Le4OYlVYAUAuMXTyiX7ez5vuCE65xEbwVSPGk9tooN3iUvW45XjUPddmCcsvBeO7JD8UJKZoC+jVDCnDoXmqUR6jpO/XkBEI/uggkFnclZULOHZD/LPj+iTFdkLacQsRElEaD2Rk2xUK+//NrrnX4h9rEkp0baSwBrGdDzOw8YsDW2BERQ7CMXAp/sm0ruO5PaeTDdq7NKytbFRX6Szk9XqYeJVJGkhZKQ4Q1zOQ8NG6A9CmshOi++7fJpYhSjOfDslciax0COFMen5t/PDk6rnsrzjbjNLWTg4Id0Xrll57cZT+4fP3/PKcL22EBI2yGsizoEWZmKbmhU08QjRJCesjotRso2O+MBlw4dT73ykjY8r1A57zFrG8zROdCrRiGPi1euB58npVOdA/3kTEwvdp4W0oFE2fT9WXU8xRYr83Cqz2rTwxsfa7hHdMRlOy6FSpc12ohxLqEJojola5EaRR2U62wdv+qqoqnsefXyhllDPgtfDMPOrvbQimHagSBR4CDvzhPDeeOZP+9r7ZuzrakYWrg+OCT9BSJEEKmEhZR7CmDC0A2SiUnnmwyO5Zb0di3to7Q+dbhDCa5BWUemiIQhRPsYPTCLOYjkjnYFkzQjx4UWe3Zt/9YB2faGqcprubM90d5VHj4qKovctLU4cG6+WihzANEVZiggosuDMS9L6Jbd8TcnpwrZNMopMP4jwYDDYUIL/xJkCu6Nyj7wwxqtNil6dTk3Lv/rnImtE3Fw0pdhU539lc9+Gdeb0zOK1QwNfXM9dj0yc6qSizcMKCWTEE2IPdSQnAoQuVeAE0QV/Ma0AngJd8fmixgQm3wvRMCf1k4Jn0z2j2df2aZdW7GWOF/XHV2nsKOznO27b8r7AcVL5XPfQ6sKhkT6iaNyf5G4eilJiBt7U/oNYEdkSZBZrPpZpqoAiDT2OT9o0Bsh4T+JUWbUq/P71rtqU0Ot4S+fgYcKJ/+w/te+gpKUdo+Y1rM7Vn8ku6SmNT3j1RgcVDRLUeJDjUaOdRLWd6PmhYYXgEp8KCR520VNCC8+36IkJ+ecvd1s1ttj3LjasxPUTaaInJ2EQONXa8JO7lFx21dbrfMuOvCNKNaSXSodxjlEk4shAuKBHFPugFLZMMgDAOvSmJ3smLYxLv3xtUbEhZhx7aamIBYktkvVzn269ASRZy6h5vfeyi/o2XC4oskJYNxWBp3EWZS9oidMEAecgmSFmKYd+oDeRx6kwMPmbN7vKFTo0M42SAinOoSFKknYq6BTfGTQu+QkayZJGsTTy1xcFWRq4er2S0azZ4swHR3IRn5GjoCTR4E23b5TxCZjUXkDV0yKOHqQ3a5bhfuZg28EJZfV0wfWcRDmbhFUS4OkSbhNeIyH0kJqIYIBbpXKjVFZzOb13sZhSZz8chU8m+oEhRABDEp+b3pDFkMMAZpfYhzPqv0azK2aKtu+2yEw2N3hQx6EfW+tspmGhqQOHjJNTlaPHQhQxsF10oFHkCpdzETXcXHv4Pnfr1ClBFLb93U4d6REl2twZcRtmgB+qlKVRbxG/g0uplqLxBHOqsP/PTxE/+kpBh8Spi0iMcpPXDIPWnrCriQ8CQg5Op2ZdMXCbfLYmtEzgMjCMlBaAYYfE+bc1KW4Enl9GvR9fMbEU4MiM/wV3ysqPgoD2YQAAAABJRU5ErkJggg==';
	return orangeFunky;
};

export const getUser = async () => {
	const apiUser = await getUserFromAPI();
	const lsValue = localStorage.getItem(LS_NAME);
	let user;
	try {
		user = {
			...clone(defaultValue),
			...JSON.parse(lsValue)
		};
	} catch (e) {
		user = clone(defaultValue);
	}

	if (apiUser) {
		user.rank = apiUser.data.rank || user.rank;
		user.exp = apiUser.data.exp || user.exp;
		localStorage.setItem(
			LS_NAME,
			JSON.stringify({
				rank: user.rank,
				exp: user.exp
			})
		);
	}

	const image = await getUserImage();

	const thisUser = {
		auto: localStorage.getItem('auto') === 'true',
		grade: rankToGrade[user.rank],
		levelInfo: getUserLevelInfo(user.exp, user.rank),
		image,
		apiUser
	};
	return thisUser;
};

export const addUserExperience = async (expAmount) => {
	const apiUser = await getUserFromAPI();
	const lsValue = localStorage.getItem(LS_NAME) || '';
	let value = clone(defaultValue);
	try {
		value = JSON.parse(lsValue);
	} catch (e) {}
	value.exp += expAmount;

	await updateUserFromAPI({
		...(apiUser.data || {}),
		rank: value.rank,
		exp: value.exp,
		expModifiedDate: new Date()
	});
	//TODO: when exp causes rank to bump

	localStorage.setItem(LS_NAME, JSON.stringify(value));
};
