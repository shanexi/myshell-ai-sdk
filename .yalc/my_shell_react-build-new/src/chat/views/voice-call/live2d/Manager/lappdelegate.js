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
exports.LAppDelegate = exports.frameBuffer = exports.gl = exports.s_instance = exports.canvas = void 0;
const live2dcubismframework_1 = require("live2d_framework/dist/live2dcubismframework");
const LAppDefine = __importStar(require("./lappdefine.js"));
const lapplive2dmanager_1 = require("./lapplive2dmanager.js");
const lapppal_1 = require("./lapppal.js");
const lapptexturemanager_1 = require("./lapptexturemanager.js");
const lappview_1 = require("./lappview.js");
exports.canvas = null;
exports.s_instance = null;
exports.gl = null;
exports.frameBuffer = null;
class LAppDelegate {
    static getInstance() {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppDelegate();
        }
        return exports.s_instance;
    }
    static releaseInstance() {
        if (exports.s_instance != null) {
            exports.s_instance.release();
            exports.s_instance = null;
        }
    }
    initialize(param, modelName) {
        if (exports.gl) {
            return true;
        }
        this._isInit = true;
        exports.canvas = document.createElement('canvas');
        if (LAppDefine.CanvasSize === 'auto') {
            this._resizeCanvas();
        }
        else {
            exports.canvas.width = param.modelSize + param.modelHeightDelta;
            exports.canvas.height = param.modelSize + param.modelHeightDelta;
        }
        exports.gl = exports.canvas.getContext('webgl', { alpha: true }) || exports.canvas.getContext('experimental-webgl', { alpha: true });
        if (!exports.gl) {
            alert('Cannot initialize WebGL. This browser does not support.');
            exports.gl = null;
            document.body.innerHTML = 'This browser does not support the <code>&lt;canvas&gt;</code> element.';
            return false;
        }
        if (param.element.firstChild) {
            param.element.insertBefore(exports.canvas, param.element.firstChild);
        }
        else {
            param.element.appendChild(exports.canvas);
        }
        if (!exports.frameBuffer) {
            exports.frameBuffer = exports.gl.getParameter(exports.gl.FRAMEBUFFER_BINDING);
        }
        this.initializeCubism(modelName, param);
        this._view.initialize();
        lapplive2dmanager_1.LAppLive2DManager.getInstance()._models.at(0).onLoad = param.onLive2DModelLoad;
        return true;
    }
    onResize() {
        this._resizeCanvas();
        this._view.initialize();
        this._view.initializeSprite();
        const viewport = [0, 0, exports.canvas.width, exports.canvas.height];
        exports.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
    }
    release() {
        if (this._textureManager) {
            this._textureManager.release();
            this._textureManager = null;
        }
        if (this._view) {
            this._view.release();
            this._view = null;
        }
        this._isInit = false;
        exports.gl.finish();
        exports.gl = null;
        lapplive2dmanager_1.LAppLive2DManager.releaseInstance();
        live2dcubismframework_1.CubismFramework.dispose();
    }
    run() {
        const loop = () => {
            if (exports.s_instance == null) {
                return;
            }
            lapppal_1.LAppPal.updateTime();
            exports.gl.clearColor(0.0, 0.0, 0.0, 0.0);
            exports.gl.enable(exports.gl.DEPTH_TEST);
            exports.gl.depthFunc(exports.gl.LEQUAL);
            exports.gl.clear(exports.gl.COLOR_BUFFER_BIT | exports.gl.DEPTH_BUFFER_BIT);
            exports.gl.clearDepth(1.0);
            exports.gl.enable(exports.gl.BLEND);
            exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
            if (!this._view) {
                return;
            }
            this._view.render();
            requestAnimationFrame(loop);
        };
        loop();
    }
    createShader() {
        const vertexShaderId = exports.gl.createShader(exports.gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create vertexShader');
            return null;
        }
        const vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        exports.gl.shaderSource(vertexShaderId, vertexShader);
        exports.gl.compileShader(vertexShaderId);
        const fragmentShaderId = exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create fragmentShader');
            return null;
        }
        const fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        exports.gl.shaderSource(fragmentShaderId, fragmentShader);
        exports.gl.compileShader(fragmentShaderId);
        const programId = exports.gl.createProgram();
        exports.gl.attachShader(programId, vertexShaderId);
        exports.gl.attachShader(programId, fragmentShaderId);
        exports.gl.deleteShader(vertexShaderId);
        exports.gl.deleteShader(fragmentShaderId);
        exports.gl.linkProgram(programId);
        exports.gl.useProgram(programId);
        return programId;
    }
    getView() {
        return this._view;
    }
    getTextureManager() {
        return this._textureManager;
    }
    constructor() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._isInit = false;
        this._cubismOption = new live2dcubismframework_1.Option();
        this._view = new lappview_1.LAppView();
        this._textureManager = new lapptexturemanager_1.LAppTextureManager();
    }
    initializeCubism(modelName, param) {
        this._cubismOption.logFunction = lapppal_1.LAppPal.printMessage;
        this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
        live2dcubismframework_1.CubismFramework.startUp(this._cubismOption);
        live2dcubismframework_1.CubismFramework.initialize();
        lapplive2dmanager_1.LAppLive2DManager.getInstance(modelName, param);
        lapppal_1.LAppPal.updateTime();
        this._view.initializeSprite();
    }
    _resizeCanvas() {
        exports.canvas.width = window.innerWidth;
        exports.canvas.height = window.innerHeight;
    }
    _cubismOption;
    _view;
    _captured;
    _mouseX;
    _mouseY;
    _isEnd;
    _isInit;
    _textureManager;
}
exports.LAppDelegate = LAppDelegate;
function onClickBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    const posX = e.pageX;
    const posY = e.pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onMouseMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    const posX = e.changedTouches[0].pageX;
    const posY = e.changedTouches[0].pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onTouchMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.changedTouches[0].clientX - rect.left;
    const posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onTouchEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.changedTouches[0].clientX - rect.left;
    const posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchCancel(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.changedTouches[0].clientX - rect.left;
    const posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
