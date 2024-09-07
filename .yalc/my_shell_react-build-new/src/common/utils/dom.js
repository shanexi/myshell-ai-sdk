"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStyles = removeStyles;
exports.escapeHTML = escapeHTML;
function removeStyles(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const styleElements = doc.querySelectorAll('style');
    styleElements.forEach(style => style.remove());
    const allElements = doc.querySelectorAll('*');
    allElements.forEach(element => element.removeAttribute('style'));
    return doc.body.innerHTML;
}
function escapeHTML(input) {
    return input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, tag => {
        return tag.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });
}
