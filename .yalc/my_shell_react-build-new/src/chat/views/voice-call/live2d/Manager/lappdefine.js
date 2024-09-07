"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTargetHeight = exports.RenderTargetWidth = exports.CubismLoggingLevel = exports.DebugTouchLogEnable = exports.DebugLogEnable = exports.MOCConsistencyValidationEnable = exports.PriorityForce = exports.PriorityNormal = exports.PriorityIdle = exports.PriorityNone = exports.HitAreaNameBody = exports.HitAreaNameHead = exports.MotionGroupTapBody = exports.MotionGroupIdle = exports.ModelDirSize = exports.ModelName = exports.ModelDir = exports.PowerImageName = exports.GearImageName = exports.BackImageName = exports.ResourcesPath = exports.ViewLogicalMaxTop = exports.ViewLogicalMaxBottom = exports.ViewLogicalMaxRight = exports.ViewLogicalMaxLeft = exports.ViewLogicalTop = exports.ViewLogicalBottom = exports.ViewLogicalRight = exports.ViewLogicalLeft = exports.ViewMinScale = exports.ViewMaxScale = exports.ViewScale = exports.CanvasSize = void 0;
const live2dcubismframework_1 = require("live2d_framework/dist/live2dcubismframework");
exports.CanvasSize = { height: 400, width: 400 };
exports.ViewScale = 1.0;
exports.ViewMaxScale = 2.0;
exports.ViewMinScale = 0.8;
exports.ViewLogicalLeft = -1.0;
exports.ViewLogicalRight = 1.0;
exports.ViewLogicalBottom = -1.0;
exports.ViewLogicalTop = 1.0;
exports.ViewLogicalMaxLeft = -2.0;
exports.ViewLogicalMaxRight = 2.0;
exports.ViewLogicalMaxBottom = -2.0;
exports.ViewLogicalMaxTop = 2.0;
exports.ResourcesPath = 'https://d33slbe5e7735s.cloudfront.net/voice_call_live2d_model/';
exports.BackImageName = 'back_class_normal.png';
exports.GearImageName = 'icon_gear.png';
exports.PowerImageName = 'CloseNormal.png';
exports.ModelDir = [
    'BCSZ',
    'RaidenEi',
];
exports.ModelName = [
    "Yae Miko",
    "Raiden⚡Shogun️",
];
exports.ModelDirSize = exports.ModelDir.length;
exports.MotionGroupIdle = 'Idle';
exports.MotionGroupTapBody = 'TapBody';
exports.HitAreaNameHead = 'Head';
exports.HitAreaNameBody = 'Body';
exports.PriorityNone = 0;
exports.PriorityIdle = 1;
exports.PriorityNormal = 2;
exports.PriorityForce = 3;
exports.MOCConsistencyValidationEnable = true;
exports.DebugLogEnable = false;
exports.DebugTouchLogEnable = false;
exports.CubismLoggingLevel = live2dcubismframework_1.LogLevel.LogLevel_Verbose;
exports.RenderTargetWidth = 1900;
exports.RenderTargetHeight = 1000;
