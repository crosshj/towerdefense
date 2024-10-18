/**
 * Function to parse data from API.
 * @typedef {(
 *   apiData: any,
 *   currentLS: any,
 *   helpers: { lsUpdate: Function }
 * ) => any} FromAPIFunction
 *
 * Function to prepare data for API.
 * @typedef {(
 *   currentLS: any
 * ) => any} ToAPIFunction
 *
 * Function to parse data from local storage.
 * @typedef {(
 *   lsData: any
 * ) => any} FromLSFunction
 *
 * Options for the UserDataStorage class.
 * @typedef {Object} UserDataStorageOptions
 * @property {string} name - The name of the storage.
 * @property {string} [lsName] - The local storage name.
 * @property {string} [apiName] - The API name.
 * @property {FromAPIFunction} fromAPI - User-provided function to parse data from API.
 * @property {ToAPIFunction} toAPI - User-provided function to prepare data for API.
 * @property {FromLSFunction} [fromLS] - User-provided function to parse data from local storage.
 */

/**
 * @remarks
 * Class representing a user data storage.
 * @example
 * // myStore.js
 * const fromAPI = (api, ls, helpers) => {
 *    // decompress api as needed
 *    const apiParsed = {};
 *    // determine if api is newer
 *    const apiIsNewer = true;
 *    if (apiIsNewer) {
 *      helpers.lsUpdate(apiParsed);
 *    }
 *    return apiParsed;
 * });
 * const toAPI = (ls = {}) => {
 *    // compress ls as needed
 *    return currentLS;
 * };
 * export const MyStore = new Store({
 *    name: 'exampleName',
 *    fromAPI,
 *    toAPI,
 * });
 *
 * // gamePage.js
 * MyStore.lsGet();
 * MyStore.lsAdd('key', 3);
 * MyStore.lsRemove('key', 2);
 *
 * // user.js
 * MyStore.apiGet(apiUser);
 * MyStore.apiPost(apiUser.data);
 *
 *
 * @class UserDataStorage
 * @param {UserDataStorageOptions} options - The options for the storage.
 * @property {string} name - The local storage name.
 * @property {string} [lsName] - The local storage name.
 * @property {string} [apiName] - The API name.
 * @property {FromAPIFunction} fromAPI - Function to parse data from API.
 * @property {ToAPIFunction} toAPI - Function to prepare data for API.
 * @method lsGet - Retrieves data from local storage.
 * @method lsRemove - Removes a specified quantity of an item from local storage.
 * @method lsAdd - Adds a specified quantity of an item to local storage.
 * @method apiGet - Retrieves data from the API and updates local storage.
 * @method apiPost - Prepares data for the API and updates the API user data.
 */
export class UserDataStorage {
	constructor(options) {
		const { name } = options;
		if (!name && !(options.lsName && options.apiName)) {
			throw new Error(
				'lsName and apiName are required if storage name is not provided'
			);
		}
		this.lsName = options.lsName || name.toUpperCase();
		this.apiName = options.apiName || name.toLowerCase();
		this.fromAPI = options.fromAPI;
		this.toAPI = options.toAPI;
		this.fromLS = options.fromLS;
		this.toLS = options.toLS;

		this.lsGet = this.lsGet.bind(this);
		this.lsUpdate = this.lsUpdate.bind(this);
		this.lsRemove = this.lsRemove.bind(this);
		this.lsAdd = this.lsAdd.bind(this);

		this.apiGet = this.apiGet.bind(this);
		this.apiPost = this.apiPost.bind(this);
	}

	/**
	 * Retrieves entire this.lsName data from local storage.
	 * @returns {any} The data from local storage.
	 */
	lsGet() {
		let lsValue = localStorage.getItem(this.lsName);
		lsValue = lsValue === null ? {} : JSON.parse(lsValue);
		if (typeof this.fromLS !== 'function') return lsValue;
		return this.fromLS(lsValue);
	}
	/**
	 * Updates entire this.lsName data in local storage.
	 * @param {any} data - The data to be stored.
	 */
	lsUpdate(data) {
		localStorage.setItem(this.lsName, JSON.stringify(data));
	}
	/**
	 * Removes a specified quantity of an item from local storage.
	 * @param {string} key - The key of the item to remove.
	 * @param {number} [qty=1] - The quantity to remove.
	 */
	lsRemove(key, qty = 1) {
		let lsValue = this.lsGet();
		lsValue =
			typeof this.toLS === 'function' ? this.toLS(lsValue) : lsValue;
		lsValue[key] = lsValue[key] || 0;
		lsValue[key] -= qty;
		if (lsValue[key] === 0) {
			delete lsValue[key];
		}
		this.lsUpdate(lsValue);
	}
	/**
	 * Adds a specified quantity of an item to local storage.
	 * @param {string} key - The key of the item to add.
	 * @param {number} [qty=1] - The quantity to add.
	 */
	lsAdd(key, qty = 1) {
		let lsValue = this.lsGet();
		lsValue =
			typeof this.toLS === 'function' ? this.toLS(lsValue) : lsValue;
		lsValue[key] = lsValue[key] || 0;
		lsValue[key] += qty;
		if (lsValue[key] === 0) {
			delete lsValue[key];
		}
		this.lsUpdate(lsValue);
	}

	/**
	 * Applies fromAPI to apiUser.data[this.apiName].
	 * @param {Object} apiUser - The API user data.
	 * @returns {Object} The updated API user data.
	 */
	apiGet(apiUser) {
		if (typeof this.fromAPI !== 'function') return apiUser;
		let lsValue = this.lsGet();
		lsValue =
			typeof this.toLS === 'function' ? this.toLS(lsValue) : lsValue;
		apiUser.data[this.apiName] = this.fromAPI(
			apiUser?.data?.[this.apiName], //currentAPI
			lsValue, //currentLS
			{ lsUpdate: this.lsUpdate }
		);
		return apiUser;
	}
	/**
	 * Applies toAPI to LS data and adds to apiUseData[this.apiName].
	 * @param {Object} apiUserData - The API user data.
	 * @returns {Object} The updated API user data.
	 */
	apiPost(apiUserData) {
		if (typeof this.toAPI !== 'function') return apiUserData;
		let lsValue = this.lsGet();
		lsValue =
			typeof this.toLS === 'function' ? this.toLS(lsValue) : lsValue;
		apiUserData[this.apiName] = this.toAPI(
			lsValue // currentLS
		);
		return apiUserData;
	}
}
