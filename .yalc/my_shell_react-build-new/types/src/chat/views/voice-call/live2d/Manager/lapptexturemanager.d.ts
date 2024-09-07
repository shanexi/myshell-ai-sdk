import { csmVector } from 'live2d_framework/dist/type/csmvector';
export declare class LAppTextureManager {
    constructor();
    release(): void;
    createTextureFromPngFile(fileName: string, usePremultiply: boolean, callback: (textureInfo: TextureInfo) => void): void;
    releaseTextures(): void;
    releaseTextureByTexture(texture: WebGLTexture): void;
    releaseTextureByFilePath(fileName: string): void;
    _textures: csmVector<TextureInfo>;
}
export declare class TextureInfo {
    img: HTMLImageElement;
    id: WebGLTexture;
    width: number;
    height: number;
    usePremultply: boolean;
    fileName: string;
}
