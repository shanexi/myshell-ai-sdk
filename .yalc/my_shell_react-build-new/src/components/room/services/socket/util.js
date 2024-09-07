"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = socketEventHandler;
const util_1 = require("../../../../chat-new/util.js");
const definitions_1 = require("../../models/definitions.js");
const definitions_2 = require("./model/definitions.js");
function socketErrorHandler(error, updateRoomStatus, userId) {
    const { reason, message, userId: errorUserId } = error;
    switch (reason) {
        case definitions_2.ErrorReason.NO_ENOUGH_ENERGY:
            if (userId !== errorUserId) {
                updateRoomStatus(definitions_1.LocalRoomStatus.OTHER_SIDE_NO_ENERGY);
            }
            break;
        default:
            break;
    }
}
function socketEventHandler(socketMsg, addMessage, replaceDraftMessage, setEnergyInfo, updateRoomStatus, getList, updateDetail, onReceivedReward, userId) {
    let msgData;
    try {
        msgData = JSON.parse(socketMsg);
    }
    catch (e) {
        throw new Error('JSON parse error');
    }
    const { event, err, message, userEnergyInfo } = msgData;
    if (err) {
        socketErrorHandler(err, updateRoomStatus, userId);
        console.error(err.message);
    }
    else {
        switch (event) {
            case definitions_2.SocketEvent.SENT_MESSAGE_CREATED:
                if (message.userId === userId) {
                    replaceDraftMessage((0, util_1.serverMessageParser)(message, 'room'));
                }
                else {
                    addMessage((0, util_1.serverMessageParser)(message, 'room'));
                }
                break;
            case definitions_2.SocketEvent.REPLYING:
            case definitions_2.SocketEvent.TEXT_STREAM:
            case definitions_2.SocketEvent.AUDIO_TO_TEXT_DONE:
            case definitions_2.SocketEvent.REPLIED:
            case definitions_2.SocketEvent.CREATE_WHOLE_MESSAGE:
                if (message.type === 'GREETING' && userId !== message.userId) {
                    getList();
                    updateDetail();
                }
                addMessage((0, util_1.serverMessageParser)(message, 'room'));
                break;
            case definitions_2.SocketEvent.CONSUME_ENERGY:
                if (userEnergyInfo.userId === userId) {
                    setEnergyInfo(userEnergyInfo);
                }
                break;
            case definitions_2.SocketEvent.ROOM_CLOSED:
                updateRoomStatus(definitions_1.RoomStatus.CLOSED);
                break;
            case definitions_2.SocketEvent.RECEIVE_REWARDS:
                onReceivedReward();
                break;
            case definitions_2.SocketEvent.NEW_MEMBER_ENTER:
                getList();
                updateDetail();
                break;
            default:
        }
    }
}
