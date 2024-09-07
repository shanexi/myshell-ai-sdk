"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotExtraInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const GithubInfo_1 = __importDefault(require("./GithubInfo.js"));
const ModelInfo_1 = __importDefault(require("./ModelInfo.js"));
const OfficialBot_1 = __importDefault(require("./OfficialBot.js"));
const TgInfo_1 = __importDefault(require("./TgInfo.js"));
function BotExtraInfo({ isOfficial, logoUrl, tgName, model, githubUrl }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(OfficialBot_1.default, { isOfficial: isOfficial }), (0, jsx_runtime_1.jsx)(TgInfo_1.default, { tgName: tgName, logoUrl: logoUrl }), (0, jsx_runtime_1.jsx)(ModelInfo_1.default, { model: model }), (0, jsx_runtime_1.jsx)(GithubInfo_1.default, { githubUrl: githubUrl })] }));
}
