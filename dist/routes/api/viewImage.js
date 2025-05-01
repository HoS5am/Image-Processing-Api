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
const exist_1 = __importDefault(require("../../utilities/exist"));
const path_1 = __importDefault(require("path"));
const viewImage = express_1.default.Router();
viewImage.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileParam = req.query.filename;
    const filePath = path_1.default.resolve(__dirname, `../../../images/original/${fileParam}`);
    if (!(0, exist_1.default)(filePath)) {
        res.status(400).send('Error!, image does not exist in folder, Please try inputing an image name that exists');
        return;
    }
    res.status(200).sendFile(filePath);
}));
exports.default = viewImage;
