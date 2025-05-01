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
const exist_1 = __importDefault(require("../../utilities/exist"));
const path_1 = __importDefault(require("path"));
describe('Image exists module suite tests', () => {
    it('expects true since starrynight.jpg from original directory exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageDir = path_1.default.resolve(__dirname, `../../../images/original/starrynight.jpg`);
        const img = (0, exist_1.default)(imageDir);
        expect(img).toEqual(true);
    }));
    it('expects false since test.jpg from original directory does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageDir = path_1.default.resolve(__dirname, `../../../images/full/test.jpg`);
        const img = (0, exist_1.default)(imageDir);
        expect(img).toEqual(false);
    }));
});
