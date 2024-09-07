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
exports.LAppLive2DManager = exports.s_instance = void 0;
const cubismmatrix44_1 = require("live2d_framework/dist/math/cubismmatrix44");
const csmvector_1 = require("live2d_framework/dist/type/csmvector");
const LAppDefine = __importStar(require("./lappdefine.js"));
const lappdelegate_1 = require("./lappdelegate.js");
const lappmodel_1 = require("./lappmodel.js");
const lapppal_1 = require("./lapppal.js");
exports.s_instance = null;
class LAppLive2DManager {
    static getInstance(modelName = "", param = {}) {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppLive2DManager(modelName, param);
        }
        return exports.s_instance;
    }
    static releaseInstance() {
        if (exports.s_instance != null) {
            exports.s_instance = void 0;
        }
        exports.s_instance = null;
    }
    getModel(no) {
        if (no < this._models.getSize()) {
            return this._models.at(no);
        }
        return null;
    }
    releaseAllModel() {
        for (let i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    }
    onDrag(x, y) {
        for (let i = 0; i < this._models.getSize(); i++) {
            const model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    }
    onTap(x, y) {
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage(`[APP]tap point: {x: ${x.toFixed(2)} y: ${y.toFixed(2)}}`);
        }
        for (let i = 0; i < this._models.getSize(); i++) {
            if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage(`[APP]hit area: [${LAppDefine.HitAreaNameHead}]`);
                }
                this._models.at(i).setRandomExpression();
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage(`[APP]hit area: [${LAppDefine.HitAreaNameBody}]`);
                }
                this._models
                    .at(i)
                    .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, this._finishedMotion);
            }
        }
    }
    onUpdate() {
        const { width, height } = lappdelegate_1.canvas;
        const modelCount = this._models.getSize();
        for (let i = 0; i < modelCount; ++i) {
            const projection = new cubismmatrix44_1.CubismMatrix44();
            const model = this.getModel(i);
            if (model.getModel()) {
                if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
                    model.getModelMatrix().setWidth(2.0);
                    projection.scale(1.0, width / height);
                }
                else {
                    projection.scale(height / width, 1.0);
                }
                if (this._viewMatrix != null) {
                    projection.multiplyByMatrix(this._viewMatrix);
                }
            }
            model.update();
            model.draw(projection);
        }
    }
    nextScene() {
        const no = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
        this.changeScene(no);
    }
    changeScene(index) {
        this._sceneIndex = index;
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage(`[APP]model index: ${this._sceneIndex}`);
        }
        const model = LAppDefine.ModelDir[index];
        const modelPath = LAppDefine.ResourcesPath + model + '/';
        let modelJsonName = LAppDefine.ModelDir[index];
        modelJsonName += '.model3.json';
        this.releaseAllModel();
        this._models.pushBack(new lappmodel_1.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName);
    }
    changeSceneByName(modelName, param) {
        const modelPath = LAppDefine.ResourcesPath + modelName + '/';
        const modelJsonName = `${modelName}.model3.json`;
        this.releaseAllModel();
        this._models.pushBack(new lappmodel_1.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName, param);
    }
    setViewMatrix(m) {
        for (let i = 0; i < 16; i++) {
            this._viewMatrix.getArray()[i] = m.getArray()[i];
        }
    }
    constructor(modelName, param) {
        this._viewMatrix = new cubismmatrix44_1.CubismMatrix44();
        this._models = new csmvector_1.csmVector();
        this.changeSceneByName(modelName, param);
    }
    _viewMatrix;
    _models;
    _sceneIndex;
    _finishedMotion = (self) => {
        lapppal_1.LAppPal.printMessage('Motion Finished:');
    };
}
exports.LAppLive2DManager = LAppLive2DManager;
