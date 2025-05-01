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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const exist_1 = __importDefault(require("../../utilities/exist"));
const fileExtension_1 = __importDefault(require("../../utilities/fileExtension"));
const fileName_1 = __importDefault(require("../../utilities/fileName"));
const sharp_1 = __importDefault(require("../../utilities/sharp"));
const imgResize = express_1.default.Router();
imgResize.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const widthParam = parseInt(req.query.width, 10);
    const fileParam = req.query.filename;
    const heightParam = parseInt(req.query.height, 10);
    if (!heightParam || !widthParam || !fileParam) {
        res.status(400).send('Error!please check that your width,height are numbers and filename is a valid string');
        return;
    }
    if (widthParam <= 0 || heightParam <= 0) {
        res.status(400).send('Error!please check that your width and height parameters are positive and are numbers');
        return;
    }
    const fullDir = path_1.default.resolve(__dirname, `../../../images/original/${fileParam}`);
    const editedDir = path_1.default.resolve(__dirname, `../../../images/edited`);
    if (!(0, exist_1.default)(fullDir)) {
        res.status(400).send('Error!, image does not exist in folder, Please try inputting an image name that exists');
        return;
    }
    try {
        yield fs_1.promises.access(editedDir);
    }
    catch (_a) {
        yield fs_1.promises.mkdir(editedDir);
        console.log(`${editedDir} is created.`);
    }
    const newFileName = (0, fileName_1.default)(fileParam);
    const editedPath = path_1.default.resolve(__dirname, `../../../images/edited/${newFileName}-${widthParam}-${heightParam}.${(0, fileExtension_1.default)(fileParam)}`);
    if (!(0, exist_1.default)(editedPath)) {
        const imageResized = yield (0, sharp_1.default)(widthParam, heightParam, fullDir, fileParam);
        if (!imageResized) {
            res.status(400).send('Error! cannot display the resized image');
        }
    }
    res.status(200).sendFile(editedPath);
}));
exports.default = imgResize;
