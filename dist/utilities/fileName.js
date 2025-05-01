"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFileName(name) {
    // get file name
    const fileName = name.split('.').shift();
    return fileName;
}
exports.default = getFileName;
