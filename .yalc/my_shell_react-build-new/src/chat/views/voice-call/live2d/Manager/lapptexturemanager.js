"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureInfo = exports.LAppTextureManager = void 0;
const csmvector_1 = require("live2d_framework/dist/type/csmvector");
const lappdelegate_1 = require("./lappdelegate.js");
class LAppTextureManager {
    constructor() {
        this._textures = new csmvector_1.csmVector();
    }
    release() {
        for (let ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            lappdelegate_1.gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    }
    createTextureFromPngFile(fileName, usePremultiply, callback) {
        for (let ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            if (ite.ptr().fileName == fileName && ite.ptr().usePremultply == usePremultiply) {
                ite.ptr().img = new Image();
                ite.ptr().img.onload = () => callback(ite.ptr());
                ite.ptr().img.src = fileName;
                return;
            }
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const tex = lappdelegate_1.gl.createTexture();
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, tex);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MIN_FILTER, lappdelegate_1.gl.LINEAR_MIPMAP_LINEAR);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MAG_FILTER, lappdelegate_1.gl.LINEAR);
            if (usePremultiply) {
                lappdelegate_1.gl.pixelStorei(lappdelegate_1.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            }
            lappdelegate_1.gl.texImage2D(lappdelegate_1.gl.TEXTURE_2D, 0, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.UNSIGNED_BYTE, img);
            lappdelegate_1.gl.generateMipmap(lappdelegate_1.gl.TEXTURE_2D);
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, null);
            const textureInfo = new TextureInfo();
            if (textureInfo != null) {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                textureInfo.img = img;
                textureInfo.usePremultply = usePremultiply;
                this._textures.pushBack(textureInfo);
            }
            callback(textureInfo);
        };
        img.crossOrigin = 'anonymous';
        img.src = fileName;
    }
    releaseTextures() {
        for (let i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    }
    releaseTextureByTexture(texture) {
        for (let i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    }
    releaseTextureByFilePath(fileName) {
        for (let i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    }
    _textures;
}
exports.LAppTextureManager = LAppTextureManager;
class TextureInfo {
    img;
    id = null;
    width = 0;
    height = 0;
    usePremultply;
    fileName;
}
exports.TextureInfo = TextureInfo;
