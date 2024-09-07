"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExampleChangedByUser = isExampleChangedByUser;
const constants_1 = require("../../../common/constants/constants.js");
function isExampleChangedByUser(text) {
    const isChange = text &&
        (Object.values(constants_1.TTS_EXAMPLE_DEFAULT_TEXT_MAP).includes(text) ||
            Object.values(constants_1.TTS_SUCCESS_EXAMPLE_DEFAULT_TEXT_MAP).includes(text));
    return !isChange;
}
