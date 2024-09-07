"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellPoint = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_themes_1 = require("next-themes");
const general_point_icon_3x_png_1 = __importDefault(require("./assets/images/general_point_icon@3x.png"));
const general_point_icon_dark_3x_png_1 = __importDefault(require("./assets/images/general_point_icon_dark@3x.png"));
const creator_point_icon_3x_png_1 = __importDefault(require("./assets/images/creator_point_icon@3x.png"));
const creator_point_icon_dark_3x_png_1 = __importDefault(require("./assets/images/creator_point_icon_dark@3x.png"));
const advocator_point_icon_3x_png_1 = __importDefault(require("./assets/images/advocator_point_icon@3x.png"));
const advocator_point_icon_dark_3x_png_1 = __importDefault(require("./assets/images/advocator_point_icon_dark@3x.png"));
const investor_point_icon_3x_png_1 = __importDefault(require("./assets/images/investor_point_icon@3x.png"));
const investor_point_icon_dark_3x_png_1 = __importDefault(require("./assets/images/investor_point_icon_dark@3x.png"));
const task_1 = require("../../../../common/constants/enums/task.js");
const PointMap = {
    [task_1.PointTypeEnum.USER_POINT_TYPE_GENERAL]: {
        icon: general_point_icon_3x_png_1.default,
        icon_dark: general_point_icon_dark_3x_png_1.default,
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_CREATOR]: {
        icon: creator_point_icon_3x_png_1.default,
        icon_dark: creator_point_icon_dark_3x_png_1.default,
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR]: {
        icon: investor_point_icon_3x_png_1.default,
        icon_dark: investor_point_icon_dark_3x_png_1.default,
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_INVESTOR]: {
        icon: advocator_point_icon_3x_png_1.default,
        icon_dark: advocator_point_icon_dark_3x_png_1.default,
    }
};
;
const ShellPoint = ({ type, size, className }) => {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    return ((0, jsx_runtime_1.jsx)("img", { alt: "shell point", width: size, height: size, src: !isDark ? PointMap[type].icon.src : PointMap[type].icon_dark.src, className: className }));
};
exports.ShellPoint = ShellPoint;
