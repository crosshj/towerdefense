const {
	Slot,
	TextureData,
	TextureAtlasData,
	BaseFactory,
	BaseObject,
	Armature
} = dragonBones;

const log =
	(which, that) =>
	(...args) => {
		if (!that.debug) return;
		console.log(`[${which}]:`, ...args);
	};

export class POJEventManager {
	constructor() {
		this.debug = true;
		this.log = log('EventManager', this);
	}
	dbInit() {
		this.log('dbInit');
	}
	dbClear() {
		this.log('dbClear');
	}
	dbUpdate() {
		this.log('dbUpdate');
	}
	dispatchDBEvent(eventType, eventObj) {
		this.log({ eventType, eventObj });
	}
}

class POJArmatureDisplay {
	constructor(...args) {
		this.debug = true;
		this.log = log('ArmatureDisplay', this);
		this.log({ args });
	}
	dbInit() {
		this.log('dbInit');
	}
	dbUpdate() {
		this.log('dbUpdate');
	}
	dispatchDBEvent(eventType, eventObj) {
		this.log({ eventType, eventObj });
	}
}

class POJSlot extends Slot {
	static toString() {
		return '[class dragonBones.POJSlot]';
	}
	constructor(...args) {
		super(...args);
		this.debug = true;
		this.log = log('Slot', this);
		this.log({ args });
	}
	_initDisplay(initDisplayValue, _isRetain) {
		this.log({ initDisplayValue });
	}
	_onUpdateDisplay(...onUpdateDisplayArgs) {
		this.log({ onUpdateDisplayArgs });
	}
	_addDisplay(...addDisplayArgs) {
		this.log({ addDisplayArgs });
	}
	_updateDisplayData() {
		this.log({ _: 'this is dumb..', slot: this });
		// debugger;
		super._updateDisplayData();
		this._textureDirty = true;
		this._transformDirty = true;
	}
	_updateFrame(..._updateFrameArgs) {
		this.log({ _updateFrameArgs });
	}
}

class POJTextureData extends TextureData {
	static toString() {
		return '[class dragonBones.POJTextureData]';
	}
	constructor(...args) {
		super();
		this.debug = false;
		this.log = log('TextureData', this);
		this.log({ args });
	}

	renderTexture = null; // Initial value.

	_onClear() {
		super._onClear();

		if (this.renderTexture !== null) {
			this.renderTexture.destroy(false);
		}

		this.renderTexture = null;
	}
}

class POJTextureAtlasData extends TextureAtlasData {
	static toString() {
		return '[class dragonBones.POJTextureAtlasData]';
	}
	constructor(...args) {
		super();
		this.debug = false;
		this.log = log('TextureAtlasData', this);
		this.log({ args });
	}
	createTexture() {
		return dragonBones.BaseObject.borrowObject(POJTextureData);
	}
}

export class POJFactory extends BaseFactory {
	constructor(dbInstance) {
		super();
		this._dragonBones = dbInstance;
	}
	advanceTime(passedTime) {
		this._dragonBones.advanceTime(passedTime);
	}
	async loadData({ skeleton, atlas, texture }) {
		const skeletonData = fetch(skeleton).then((x) => x.json());
		const atlasData = await fetch(atlas).then((x) => x.json());
		const textureData = new Promise((resolve) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.src = texture;
		});
		this.parseDragonBonesData(await skeletonData);
		this.parseTextureAtlasData(await atlasData, await textureData);
	}
	_buildTextureAtlasData(textureAtlasData, textureAtlas) {
		if (textureAtlasData !== null) {
			textureAtlasData.renderTexture = textureAtlas;
		} else {
			textureAtlasData = BaseObject.borrowObject(POJTextureAtlasData);
		}

		return textureAtlasData;
	}
	_getTextureData() {}
	_buildArmature(dataPackage) {
		const armature = BaseObject.borrowObject(Armature);
		const armatureDisplay = new POJArmatureDisplay(this._scene);

		armature.init(
			dataPackage.armature,
			armatureDisplay,
			armatureDisplay,
			this._dragonBones
		);

		return armature;
	}
	_buildSlot(dataPackage, slotData, armature) {
		const slot = BaseObject.borrowObject(POJSlot);
		// const rawDisplay =
		// 	this._scene.dragonbone.createSlotDisplayPlaceholder();
		// const meshDisplay =
		// 	this._scene.dragonbone.createMeshDisplayPlaceholder();
		const rawDisplay = () => {};
		const meshDisplay = () => {};

		slot.init(slotData, armature, rawDisplay, meshDisplay);

		return slot;
	}
	buildArmatureDisplay(
		armatureName,
		dragonBonesName,
		skinName = '',
		textureAtlasName = '',
		textureScale = 1.0
	) {
		// this.log({
		// 	armatureName,
		// 	dragonBonesName,
		// 	skinName,
		// 	textureAtlasName
		// });
		const armature = this.buildArmature(
			armatureName,
			dragonBonesName,
			skinName,
			textureAtlasName
		);

		return armature;
	}
	buildDragonBonesData(dragonBonesName, textureScale = 1.0) {
		let data = this._dragonBonesDataMap[dragonBonesName];
		return data;
	}
}
