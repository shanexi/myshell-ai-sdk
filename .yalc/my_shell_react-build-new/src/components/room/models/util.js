"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomClosedMessage = createRoomClosedMessage;
exports.createRoomOtherSideNoEnergyMessage = createRoomOtherSideNoEnergyMessage;
function createRoomClosedMessage(isCreator = false, memberName) {
    return {
        id: 'room-closed',
        userId: '0',
        entityId: '0',
        createdDateUnix: new Date().getTime().toString(),
        updatedDateUnix: new Date().getTime().toString(),
        type: isCreator ? 'ROOM_CLOSED' : 'OTHER_SIDE_LEFT',
        text: memberName,
        status: 'DONE',
        source: 'OTHER',
        msgDisplayType: 'NOTIFICATION',
        contextMenuItems: []
    };
}
function createRoomOtherSideNoEnergyMessage() {
    return {
        id: 'room-closed',
        userId: '0',
        entityId: '0',
        createdDateUnix: new Date().getTime().toString(),
        updatedDateUnix: new Date().getTime().toString(),
        type: 'OTHER_SIDE_NO_ENOUGH_ENERGY',
        status: 'DONE',
        source: 'OTHER',
        msgDisplayType: 'NOTIFICATION',
        contextMenuItems: []
    };
}
