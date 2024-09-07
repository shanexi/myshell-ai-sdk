"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAppView = void 0;
const cubismmatrix44_1 = require("live2d_framework/dist/math/cubismmatrix44");
const cubismviewmatrix_1 = require("live2d_framework/dist/math/cubismviewmatrix");
const LAppDefine = __importStar(require("./lappdefine.js"));
const lappdelegate_1 = require("./lappdelegate.js");
const lapplive2dmanager_1 = require("./lapplive2dmanager.js");
const lapppal_1 = require("./lapppal.js");
const lappsprite_1 = require("./lappsprite.js");
const touchmanager_1 = require("./touchmanager.js");
class LAppView {
    constructor() {
        this._programId = null;
        this._back = null;
        this._gear = null;
        this._touchManager = new touchmanager_1.TouchManager();
        this._deviceToScreen = new cubismmatrix44_1.CubismMatrix44();
        this._viewMatrix = new cubismviewmatrix_1.CubismViewMatrix();
    }
    initialize() {
        const { width, height } = lappdelegate_1.canvas;
        const ratio = width / height;
        const left = -ratio;
        const right = ratio;
        const bottom = LAppDefine.ViewLogicalLeft;
        const top = LAppDefine.ViewLogicalRight;
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        this._viewMatrix.scale(LAppDefine.ViewScale, LAppDefine.ViewScale);
        this._deviceToScreen.loadIdentity();
        if (width > height) {
            const screenW = Math.abs(right - left);
            this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        }
        else {
            const screenH = Math.abs(top - bottom);
            this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
        }
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale);
        this._viewMatrix.setMinScale(LAppDefine.ViewMinScale);
        this._viewMatrix.setMaxScreenRect(LAppDefine.ViewLogicalMaxLeft, LAppDefine.ViewLogicalMaxRight, LAppDefine.ViewLogicalMaxBottom, LAppDefine.ViewLogicalMaxTop);
    }
    release() {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        lappdelegate_1.gl.deleteProgram(this._programId);
        this._programId = null;
    }
    render() {
        lappdelegate_1.gl.useProgram(this._programId);
        if (this._back) {
            this._back.render(this._programId);
        }
        if (this._gear) {
            this._gear.render(this._programId);
        }
        lappdelegate_1.gl.flush();
        const live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.setViewMatrix(this._viewMatrix);
        live2DManager.onUpdate();
    }
    initializeSprite() {
        const width = lappdelegate_1.canvas.width;
        const height = lappdelegate_1.canvas.height;
        const textureManager = lappdelegate_1.LAppDelegate.getInstance().getTextureManager();
        const resourcesPath = LAppDefine.ResourcesPath;
        let imageName = '';
        imageName = LAppDefine.BackImageName;
        const initBackGroundTexture = (textureInfo) => {
            const x = width * 0.5;
            const y = height * 0.5;
            const fwidth = textureInfo.width * 2.0;
            const fheight = height * 0.95;
            this._back = new lappsprite_1.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        };
        imageName = LAppDefine.GearImageName;
        const initGearTexture = (textureInfo) => {
            const x = width - textureInfo.width * 0.5;
            const y = height - textureInfo.height * 0.5;
            const fwidth = textureInfo.width;
            const fheight = textureInfo.height;
            this._gear = new lappsprite_1.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        };
        if (this._programId == null) {
            this._programId = lappdelegate_1.LAppDelegate.getInstance().createShader();
        }
    }
    onTouchesBegan(pointX, pointY) {
        this._touchManager.touchesBegan(pointX, pointY);
    }
    onTouchesMoved(pointX, pointY) {
        const viewX = this.transformViewX(this._touchManager.getX());
        const viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(pointX, pointY);
        const live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(viewX, viewY);
    }
    onTouchesEnded(pointX, pointY) {
        const live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(0.0, 0.0);
        {
            const x = this._deviceToScreen.transformX(this._touchManager.getX());
            const y = this._deviceToScreen.transformY(this._touchManager.getY());
            if (LAppDefine.DebugTouchLogEnable) {
                lapppal_1.LAppPal.printMessage(`[APP]touchesEnded x: ${x} y: ${y}`);
            }
            live2DManager.onTap(x, y);
            if (this._gear.isHit(pointX, pointY)) {
                live2DManager.nextScene();
            }
        }
    }
    transformViewX(deviceX) {
        const screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
    }
    transformViewY(deviceY) {
        const screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
    }
    transformScreenX(deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    }
    transformScreenY(deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    }
    _touchManager;
    _deviceToScreen;
    _viewMatrix;
    _programId;
    _back;
    _gear;
    _changeModel;
    _isClick;
}
exports.LAppView = LAppView;
