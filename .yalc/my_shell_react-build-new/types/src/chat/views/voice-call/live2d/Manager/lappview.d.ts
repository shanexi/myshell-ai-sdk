import { CubismMatrix44 } from 'live2d_framework/dist/math/cubismmatrix44';
import { CubismViewMatrix } from 'live2d_framework/dist/math/cubismviewmatrix';
import { LAppSprite } from './lappsprite';
import { TouchManager } from './touchmanager';
export declare class LAppView {
    constructor();
    initialize(): void;
    release(): void;
    render(): void;
    initializeSprite(): void;
    onTouchesBegan(pointX: number, pointY: number): void;
    onTouchesMoved(pointX: number, pointY: number): void;
    onTouchesEnded(pointX: number, pointY: number): void;
    transformViewX(deviceX: number): number;
    transformViewY(deviceY: number): number;
    transformScreenX(deviceX: number): number;
    transformScreenY(deviceY: number): number;
    _touchManager: TouchManager;
    _deviceToScreen: CubismMatrix44;
    _viewMatrix: CubismViewMatrix;
    _programId: WebGLProgram;
    _back: LAppSprite;
    _gear: LAppSprite;
    _changeModel: boolean;
    _isClick: boolean;
}
