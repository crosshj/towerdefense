export class UserDataStorage {
	constructor({ name, lsName, apiName, fromAPI, toAPI, fromLS }) {
		this.lsName = lsName || name.toUpperCase();
		this.apiName = apiName || name.toLowerCase();
		this.fromAPI = fromAPI;
		this.toAPI = toAPI;
		this.fromLS = fromLS || ((x) => x);

		this.lsGet = this.lsGet.bind(this);
		this.lsUpdate = this.lsUpdate.bind(this);
		this.lsRemove = this.lsRemove.bind(this);
		this.lsAdd = this.lsAdd.bind(this);

		this.apiGet = this.apiGet.bind(this);
		this.apiPost = this.apiPost.bind(this);
	}

	lsGet() {
		let lsValue = localStorage.getItem(this.lsName);
		lsValue = lsValue === null ? {} : JSON.parse(lsValue);
		return this.fromLS(lsValue);
	}
	lsUpdate(data) {
		localStorage.setItem(this.lsName, JSON.stringify(data));
	}
	lsRemove(key, qty = 1) {
		const lsValue = this.lsGet();
		lsValue[key] = lsValue[key] || 0;
		lsValue[key] -= qty;
		if (lsValue[key] === 0) {
			delete lsValue[key];
		}
		this.lsUpdate(lsValue);
	}
	lsAdd(key, qty = 1) {
		const lsValue = this.lsGet();
		lsValue[key] = lsValue[key] || 0;
		lsValue[key] += qty;
		if (lsValue[key] === 0) {
			delete lsValue[key];
		}
		this.lsUpdate(lsValue);
	}

	apiGet(apiUser) {
		apiUser.data[this.apiName] = this.fromAPI(
			apiUser?.data?.[this.apiName], //currentAPI
			this.lsGet() //currentLS
		);
		return apiUser;
	}
	apiPost(apiUserData) {
		apiUserData[this.apiName] = this.toAPI(
			this.lsGet() // currentLS
		);
		return apiUserData;
	}
}
