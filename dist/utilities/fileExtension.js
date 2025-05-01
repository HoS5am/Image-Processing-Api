"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFileExtension(fileName) {
    // get file extension
    const extension = fileName.split('.').pop();
    return extension;
}
exports.default = getFileExtension;
