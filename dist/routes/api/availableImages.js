"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fileExtension_1 = __importDefault(require("../../utilities/fileExtension"));
const images = express_1.default.Router();
const filePath = path_1.default.resolve(__dirname, `../../../images/original`);
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield fs_1.promises.readdir(filePath);
        const imageFiles = files.filter((file) => {
            const ext = (0, fileExtension_1.default)(file);
            return (typeof ext === 'string' && ['jpg', 'jpeg'].includes(ext.toLowerCase()));
        });
        res.status(200).json(imageFiles);
    }
    catch (err) {
        res.status(500).send(`Cannot read from directory ${err}`);
    }
}));
exports.default = images;
