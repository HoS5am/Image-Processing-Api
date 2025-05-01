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
const sharp_1 = __importDefault(require("../../utilities/sharp"));
const path_1 = __importDefault(require("path"));
const imageDir = path_1.default.resolve(__dirname, `../../../images/original/starrynight.jpg`);
describe('suite for testing sharp module', () => {
    it('expects true if image is correctly resized and all details are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const imagResize = yield (0, sharp_1.default)(300, 350, imageDir, 'starrynight.jpg');
        expect(imagResize).toEqual(true);
    }));
    it('expects false if image is not correctly resized', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageDir = path_1.default.resolve(__dirname, `../../../images/full/starrynight.jpg`);
        const imagResize = yield (0, sharp_1.default)(300, 300, imageDir, 'fjord.jpg');
        expect(imagResize).toEqual(false);
    }));
});
