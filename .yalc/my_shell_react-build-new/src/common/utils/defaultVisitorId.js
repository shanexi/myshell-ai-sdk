"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultVisitorId = void 0;
const common_helper_1 = require("../../common/utils/common-helper");
const defaultVisitorId = () => (0, common_helper_1.generateUUID)().replace(/-/g, '');
exports.defaultVisitorId = defaultVisitorId;
