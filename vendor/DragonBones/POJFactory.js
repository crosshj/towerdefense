const {
	Slot,
	TextureData,
	TextureAtlasData,
	BaseFactory,
	BaseObject,
	Armature,
	Transform
} = window.dragonBones;

const log =
	(which, that) =>
	(...args) => {
		if (!that.debug) return;
		console.log(`[${which}]:`, ...args);
	};

class Bitmap {
	constructor(canvas, name) {
		this._canvas = canvas;
		this.name = name;
	}
	putImage() {
		if (!this.drawable) {
			//console.log(`no drawable for: ${this.name}`);
			return;
		}
		const ctx = this._canvas.getContext('2d');
		// console.log(this);
		ctx.save();
		ctx.translate(
			this._canvas.width / 2 + this.x,
			this._canvas.height + this.y
		);
		ctx.rotate((this.rotation * Math.PI) / 180);
		ctx.drawImage(this.drawable, 0, 0);
		ctx.restore();
		//console.log({ image, rect });
	}
	setImage(image, [offsetX, offsetY, width, height]) {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(
			image,
			offsetX,
			offsetY,
			width,
			height,
			0,
			0,
			canvas.width,
			canvas.height
		);
		this.drawable = canvas;
		// this.drawable = new Image();
		// this.drawable.src = canvas.toDataURL();
	}
}

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

export class POJArmatureDisplay {
	debugDraw = false;
	_debugDraw = false;
	_armature = null;

	constructor(...args) {
		this.debug = false;
		this.log = log('ArmatureDisplay', this);
		this.log({ args });
	}
	dbInit(armature) {
		this.log('dbInit');
		this._armature = armature;
	}
	dbClear() {
		this._armature = null;
	}
	dbUpdate() {
		this.log('dbUpdate');
		//const drawed = DragonBones.debugDraw || this.debugDraw;
		const drawed = this.debugDraw;
		if (drawed || this._debugDraw) {
		} else {
		}
		const slots = this._armature.getSlots();
		for (const slot of slots) {
			//console.log({ displays: slot.displayList });
			slot.displayList[0].putImage();
		}
	}
	dispose(disposeProxy = true) {
		disposeProxy;

		if (this._armature !== null) {
			this._armature.dispose();
			this._armature = null;
		}
	}
	dispatchDBEvent(eventType, eventObj) {
		// this.log({ eventType, eventObj });
		this.fire(eventType, eventObj);
	}
	hasDBEventListener(type) {
		const listeners = this._listeners;
		return listeners && type in listeners;
	}
	addDBEventListener(type, listener, target) {
		// tslint:disable-next-line:no-unused-expression
		target;
		this.on(type, listener, false);
	}
	removeDBEventListener(type, listener, target) {
		target;
		this.off(type, listener);
	}

	get armature() {
		return this._armature;
	}
	get animation() {
		return this._armature.animation;
	}
	hasEvent(type) {
		return this.hasDBEventListener(type);
	}
	addEvent(type, listener, target) {
		this.addDBEventListener(type, listener, target);
	}
	removeEvent(type, listener, target) {
		this.removeDBEventListener(type, listener, target);
	}

	//Hilo specific?
	addChild() {
		this.log('addChild');
	}
	addChildAt() {
		this.log('addChildAt');
	}
	swapChildren() {
		this.log('swapChildren');
	}
	removeChild() {
		this.log('removeChild');
	}
}

class POJSlot extends Slot {
	static toString() {
		return '[class dragonBones.POJSlot]';
	}
	_textureScale;
	_renderDisplay;

	_onClear() {
		super._onClear();
		this._textureScale = 1.0;
		this._renderDisplay = null;
	}
	_initDisplay(initDisplayValue, isRetain) {
		initDisplayValue;
		isRetain;
	}
	_disposeDisplay(initDisplayValue, isRetain) {
		initDisplayValue;
		isRetain;
	}
	_onUpdateDisplay() {
		// console.log({
		// 	display: this.display,
		// 	rawDisplay: this._rawDisplay,
		// 	keys: Object.keys(this._rawDisplay)
		// });
		this._renderDisplay = this._display ? this._display : this._rawDisplay;
	}
	_addDisplay() {
		const container = this._armature.display;
		container.addChild(this._renderDisplay);
	}
	_replaceDisplay(value) {
		const container = this._armature.display;
		const prevDisplay = value;
		container.addChild(this._renderDisplay);
		container.swapChildren(this._renderDisplay, prevDisplay);
		container.removeChild(prevDisplay);
		this._textureScale = 1.0;
	}
	_removeDisplay() {
		this._renderDisplay.parent.removeChild(this._renderDisplay);
	}
	_updateZOrder() {
		const container = this._armature.display;
		const index = container.getChildIndex(this._renderDisplay);
		if (index === this._zOrder) {
			return;
		}
		container.addChildAt(this._renderDisplay, this._zOrder);
	}
	_updateVisible() {
		this._renderDisplay.visible = this._parent.visible && this._visible;
	}
	_updateBlendMode() {}
	_updateColor() {
		const alpha = this._colorTransform.alphaMultiplier * this._globalAlpha;
		const color =
			(Math.round(this._colorTransform.redMultiplier * 0xff) << 16) +
			(Math.round(this._colorTransform.greenMultiplier * 0xff) << 8) +
			Math.round(this._colorTransform.blueMultiplier * 0xff);
		this._renderDisplay.alpha = alpha;
		this._renderDisplay.tint = color;
	}

	// _updateDisplayData() {
	// 	this.log({ _: 'this is dumb..', slot: this });
	// 	// debugger;
	// 	super._updateDisplayData();
	// 	this._textureDirty = true;
	// 	this._transformDirty = true;
	// }
	_updateFrame() {
		let currentTextureData = this._textureData;

		if (
			this._displayIndex >= 0 &&
			this._display !== null &&
			currentTextureData !== null
		) {
			let currentTextureAtlasData = currentTextureData.parent;

			if (this._armature.replacedTexture !== null) {
				// Update replaced texture atlas.
				if (this._armature._replaceTextureAtlasData === null) {
					currentTextureAtlasData =
						BaseObject.borrowObject(HiloTextureAtlasData);
					currentTextureAtlasData.copyFrom(currentTextureData.parent);
					currentTextureAtlasData.renderTexture =
						this._armature.replacedTexture;
					this._armature._replaceTextureAtlasData =
						currentTextureAtlasData;
				} else {
					currentTextureAtlasData =
						this._armature._replaceTextureAtlasData;
				}

				currentTextureData = currentTextureAtlasData.getTexture(
					currentTextureData.name
				);
			}

			const renderTexture = currentTextureAtlasData.renderTexture;
			if (renderTexture !== null) {
				if (this._geometryData !== null) {
					// Mesh.
					// TODO
				} else {
					// Normal texture.
					this._textureScale =
						currentTextureData.parent.scale *
						this._armature._armatureData.scale;
					const normalDisplay = this._renderDisplay;
					// console.log({
					// 	normalDisplay,
					// 	currentTextureData,
					// 	renderTexture
					// });
					normalDisplay.setImage(renderTexture, [
						currentTextureData.region.x,
						currentTextureData.region.y,
						currentTextureData.region.width,
						currentTextureData.region.height
					]);
				}

				this._visibleDirty = true;
				return;
			}
		}

		if (this._geometryData !== null) {
			// TODO
		} else {
			const normalDisplay = this._renderDisplay;
			// normalDisplay.setImage(null);
			normalDisplay.x = 0.0;
			normalDisplay.y = 0.0;
			normalDisplay.visible = false;
		}
	}
	_updateMesh(..._updateMeshArgs) {
		//this.log({ _updateMeshArgs });
	}
	_updateTransform(..._updateTransformArgs) {
		//console.log({ _updateTransformArgs });
		this.updateGlobalTransform(); // Update transform.

		const transform = this.global;

		if (
			this._renderDisplay === this._rawDisplay ||
			this._renderDisplay === this._meshDisplay
		) {
			const x =
				transform.x -
				(this.globalTransformMatrix.a * this._pivotX +
					this.globalTransformMatrix.c * this._pivotY);
			const y =
				transform.y -
				(this.globalTransformMatrix.b * this._pivotX +
					this.globalTransformMatrix.d * this._pivotY);
			this._renderDisplay.x = x;
			this._renderDisplay.y = y;
			this._renderDisplay.rotation =
				transform.rotation * Transform.RAD_DEG;
			this._renderDisplay.skew = transform.skew;
			this._renderDisplay.scaleX = transform.scaleX * this._textureScale;
			this._renderDisplay.scaleY = transform.scaleY * this._textureScale;
		} else {
			this._renderDisplay.x = transform.x;
			this._renderDisplay.y = transform.y;
			this._renderDisplay.rotation =
				transform.rotation * Transform.RAD_DEG;
			this._renderDisplay.skew = transform.skew;
			this._renderDisplay.scaleX = transform.scaleX * this._textureScale;
			this._renderDisplay.scaleY = transform.scaleY * this._textureScale;
		}
	}
	_identityTransform() {
		this._renderDisplay.x = 0.0;
		this._renderDisplay.y = 0.0;
		this._renderDisplay.rotation = 0.0;
		this._renderDisplay.skew = 0.0;
		this._renderDisplay.scaleX = 1.0;
		this._renderDisplay.scaleY = 1.0;
	}
}

class POJTextureData extends TextureData {
	static toString() {
		return '[class dragonBones.POJTextureData]';
	}
}

class POJTextureAtlasData extends TextureAtlasData {
	static toString() {
		return '[class dragonBones.POJTextureAtlasData]';
	}
	_renderTexture;

	constructor(...args) {
		super();
		this.debug = false;
		this.log = log('TextureAtlasData', this);
		this.log({ args });
	}
	createTexture() {
		return dragonBones.BaseObject.borrowObject(POJTextureData);
	}

	_onClear() {
		super._onClear();

		if (this._renderTexture !== null) {
			// this._renderTexture.dispose();
		}

		this._renderTexture = null;
	}

	get renderTexture() {
		return this._renderTexture;
	}
	set renderTexture(value) {
		if (this._renderTexture === value) {
			return;
		}
		this._renderTexture = value;
	}
}

export class POJFactory extends BaseFactory {
	constructor(dbInstance, canvas) {
		super();
		this._dragonBones = dbInstance;
		dbInstance.tick = (passedTime) => {
			dbIntance.advanceTime(passedTime * 0.001);
		};
		this.canvas = canvas;
	}
	_isSupportMesh() {
		console.warn('no support for mesh.');
		return false;
	}
	advanceTime(passedTime) {
		this.canvas.getContext('2d').reset();
		this._dragonBones.advanceTime(passedTime);
	}
	async loadData({ skeleton, atlas, texture }) {
		const skeletonData = fetch(skeleton).then((x) => x.json());
		const atlasData = await fetch(atlas).then((x) => x.json());
		const textureData = new Promise((resolve) => {
			const image = new Image();
			image.onload = () => {
				//new Bitmap(this.canvas).putImage(image, [0, 0]);
				resolve(image);
			};
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
	// _getTextureData() {}

	_buildArmature(dataPackage) {
		const armature = BaseObject.borrowObject(Armature);
		const armatureDisplay = new POJArmatureDisplay(null);

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
		// console.log({ slotData, armature });
		const rawDisplay = new Bitmap(this.canvas, slotData.name);

		slot.init(slotData, armature, rawDisplay, rawDisplay);

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
		if (armature !== null) {
			this._dragonBones.clock.add(armature);
			return armature.display;
		}

		return null;
	}
	// getTextureDisplay(textureName, textureAtlasName = null) {
	// 	console.log({ textureName, textureAtlasName });
	// 	const textureData = this._getTextureData(
	// 		textureAtlasName !== null ? textureAtlasName : '',
	// 		textureName
	// 	);
	// 	if (textureData !== null) {
	// 		const texture = textureData.parent.renderTexture;
	// 		if (texture) {
	// 			const bitmap = new Bitmap(this.canvas);
	// 			console.log({ textureData });
	// 			bitmap.setImage(texture, textureData.region);

	// 			return bitmap;
	// 		}
	// 	}
	// 	return null;
	// }
	buildDragonBonesData(dragonBonesName, textureScale = 1.0) {
		let data = this._dragonBonesDataMap[dragonBonesName];
		return data;
	}
}
