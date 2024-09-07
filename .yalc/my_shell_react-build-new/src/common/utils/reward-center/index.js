"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueFromSubType = getValueFromSubType;
function getValueFromSubType(subType) {
    const match = subType.match(/\d+/);
    return !!match?.length ? match[match?.length - 1] : '';
}
