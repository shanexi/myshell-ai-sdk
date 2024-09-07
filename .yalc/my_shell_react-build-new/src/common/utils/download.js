"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = downloadFile;
const file_saver_1 = require("file-saver");
async function download(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject('Could not download file');
        };
        xhr.send();
    });
}
async function downloadFile(link, fileName) {
    const url = `${link}?v=${Date.now()}`;
    await download(url).then((val) => {
        const file = new File([val], fileName, { type: val.type });
        (0, file_saver_1.saveAs)(file);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
}
