export class IDBStorage {
	constructor(dbName = 'imageDB', storeName = 'images') {
		this.dbName = dbName;
		this.storeName = storeName;
		this.db = null;
	}

	async initDB() {
		if (this.db) return this.db;

		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, 1);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName, { keyPath: 'key' });
				}
			};

			request.onsuccess = (event) => {
				this.db = event.target.result;
				resolve(this.db);
			};

			request.onerror = (event) => {
				reject('Database failed to open: ' + event.target.errorCode);
			};
		});
	}

	async set(key, value) {
		await this.initDB();
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(
				[this.storeName],
				'readwrite'
			);
			const store = transaction.objectStore(this.storeName);
			const request = store.put({ key, value });

			request.onsuccess = () => {
				resolve('Item added/updated in DB');
			};

			request.onerror = () => {
				reject('Failed to store item');
			};
		});
	}

	async get(key) {
		await this.initDB();
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(
				[this.storeName],
				'readonly'
			);
			const store = transaction.objectStore(this.storeName);
			const request = store.get(key);

			request.onsuccess = (event) => {
				resolve(event.target.result ? event.target.result.value : null);
			};

			request.onerror = () => {
				reject('Failed to retrieve item');
			};
		});
	}

	async remove(key) {
		await this.initDB();
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(
				[this.storeName],
				'readwrite'
			);
			const store = transaction.objectStore(this.storeName);
			const request = store.delete(key);

			request.onsuccess = () => {
				resolve('Item removed from DB');
			};

			request.onerror = () => {
				reject('Failed to remove item');
			};
		});
	}

	async clear() {
		await this.initDB();
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(
				[this.storeName],
				'readwrite'
			);
			const store = transaction.objectStore(this.storeName);
			const request = store.clear();

			request.onsuccess = () => {
				resolve('Store cleared');
			};

			request.onerror = () => {
				reject('Failed to clear the store');
			};
		});
	}
}
