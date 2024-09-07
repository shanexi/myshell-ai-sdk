"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMemberStatus = exports.RoomStatus = exports.LocalRoomStatus = void 0;
var LocalRoomStatus;
(function (LocalRoomStatus) {
    LocalRoomStatus["OTHER_SIDE_NO_ENERGY"] = "OTHER_SIDE_NO_ENERGY";
})(LocalRoomStatus || (exports.LocalRoomStatus = LocalRoomStatus = {}));
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["OPEN"] = "CHANNEL_STATUS_OPEN";
    RoomStatus["CLOSED"] = "CHANNEL_STATUS_CLOSED";
})(RoomStatus || (exports.RoomStatus = RoomStatus = {}));
var RoomMemberStatus;
(function (RoomMemberStatus) {
    RoomMemberStatus["ACTIVE"] = "CHANNEL_MEMBER_STATUS_ACTIVE";
    RoomMemberStatus["LEAVE"] = "CHANNEL_MEMBER_STATUS_LEAVE";
})(RoomMemberStatus || (exports.RoomMemberStatus = RoomMemberStatus = {}));
