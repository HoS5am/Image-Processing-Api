"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fileExtension_1 = __importDefault(require("./fileExtension"));
function imgExists(imgPath) {
    if (((0, fs_1.existsSync)(imgPath) == true && (0, fileExtension_1.default)(imgPath) == 'jpg') ||
        (0, fileExtension_1.default)(imgPath) == 'jpeg' ||
        (0, fileExtension_1.default)(imgPath) == 'JPEG' ||
        (0, fileExtension_1.default)(imgPath) == 'JPG') {
        return true;
    }
    else {
        return false;
    }
}
exports.default = imgExists;
