"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushUserIdToDataLayer = void 0;
const pushUserIdToDataLayer = (event, user_id) => {
    window.dataLayer = window.dataLayer || [];
    const data = {
        user_id: user_id
    };
    if (event) {
        data.event = event;
    }
    window.dataLayer.push(data);
};
exports.pushUserIdToDataLayer = pushUserIdToDataLayer;
