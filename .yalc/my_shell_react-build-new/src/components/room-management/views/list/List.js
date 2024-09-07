"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = List;
const jsx_runtime_1 = require("react/jsx-runtime");
const RoomItem_1 = __importDefault(require("./RoomItem.js"));
function List({ roomList }) {
    if (!roomList.length)
        return null;
    return roomList.map(room => ((0, jsx_runtime_1.jsx)(RoomItem_1.default, { id: room.channelId, name: room.channelName, invitationUrl: room.invitationUrl, invitationImgUrl: room.invitationImgUrl }, room.channelId)));
}
