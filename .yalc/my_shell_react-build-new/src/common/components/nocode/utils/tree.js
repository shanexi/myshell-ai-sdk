"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = exports.remove = exports.count = exports.append = void 0;
const append = (root, target, tree) => {
    const children = root.path === target ? [...root.children, tree] : root.children.map(child => append(child, target, tree));
    return {
        ...root,
        children
    };
};
exports.append = append;
const remove = (path, tree) => {
    const children = tree.children.find(child => child.path === path)
        ? tree.children.filter(child => child.path !== path)
        : tree.children.map(child => remove(path, child));
    return {
        ...tree,
        children
    };
};
exports.remove = remove;
const count = (root, target) => {
    if (root.path === target) {
        return root.children.length;
    }
    return root.children.find(child => count(child, target) !== 0)?.children.length || 0;
};
exports.count = count;
const interchange = (children, start, end) => {
    const result = Array.from(children);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);
    return result;
};
const reorder = (root, path, startIndex, endIndex) => {
    const children = root.children.find(child => child.path === path)
        ? interchange(root.children, startIndex, endIndex)
        : root.children.map(child => reorder(child, path, startIndex, endIndex));
    return {
        ...root,
        children
    };
};
exports.reorder = reorder;
