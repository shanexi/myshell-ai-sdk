import { generateUUID } from '../../common/utils/common-helper.js';
export const defaultVisitorId = () => generateUUID().replace(/-/g, '');
