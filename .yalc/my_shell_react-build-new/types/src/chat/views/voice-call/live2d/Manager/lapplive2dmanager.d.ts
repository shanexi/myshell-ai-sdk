import { CubismMatrix44 } from 'live2d_framework/dist/math/cubismmatrix44';
import { ACubismMotion } from 'live2d_framework/dist/motion/acubismmotion';
import { csmVector } from 'live2d_framework/dist/type/csmvector';
import * as LAppDefine from './lappdefine';
import { LAppModel } from './lappmodel';
export declare let s_instance: LAppLive2DManager;
export declare class LAppLive2DManager {
    static getInstance(modelName?: string, param?: LAppDefine.ModelParam): LAppLive2DManager;
    static releaseInstance(): void;
    getModel(no: number): LAppModel;
    releaseAllModel(): void;
    onDrag(x: number, y: number): void;
    onTap(x: number, y: number): void;
    onUpdate(): void;
    nextScene(): void;
    changeScene(index: number): void;
    changeSceneByName(modelName: string, param: LAppDefine.ModelParam): void;
    setViewMatrix(m: CubismMatrix44): void;
    constructor(modelName: string, param: LAppDefine.ModelParam);
    _viewMatrix: CubismMatrix44;
    _models: csmVector<LAppModel>;
    _sceneIndex: number;
    _finishedMotion: (self: ACubismMotion) => void;
}
