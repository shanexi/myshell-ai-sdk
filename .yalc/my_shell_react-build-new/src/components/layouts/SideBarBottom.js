"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideBarBottom;
const jsx_runtime_1 = require("react/jsx-runtime");
const DiscordIcon_1 = __importDefault(require("../../common/components/icons/DiscordIcon.js"));
const sensors_1 = require("../../lib/sensors/index.js");
function SideBarBottom() {
    const sensors = (0, sensors_1.useSensors)();
    const dcLink = 'https://discord.gg/myshell';
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col justify-center items-center !mb-8", children: (0, jsx_runtime_1.jsx)(DiscordIcon_1.default, { className: "w-6 h-6 cursor-pointer text-secondary", onClick: () => {
                sensors?.track('EnterDC', {
                    click_area: 'Navigation'
                });
                window.open(dcLink);
            } }) }));
}
