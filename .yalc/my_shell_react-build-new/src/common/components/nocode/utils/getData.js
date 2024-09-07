"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = getData;
exports.getDataByNodeName = getDataByNodeName;
function getData(path, { attrs }) {
    const data = attrs[path];
    return data;
}
function getDataByNodeName(name, { tree, attrs, nodes }) {
    const path = Object.entries(nodes).find(([, item]) => item.name === name)?.[0];
    return path ? getData(path, { tree, nodes, attrs }) : undefined;
}
