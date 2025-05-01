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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('suite for testing Image Resize Parameters /api/images', () => {
    it('expects 400 status if image parameters are not completely present e.g. no filename or height/width not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/images?filename=starrynight.jpg&height=asd&width=300');
        expect(response.status).toBe(400);
    }));
    it('expects 400 status if image parameters height or width are negative', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/images?filename=starrynight.jpg&height=-300&width=600');
        expect(response.status).toBe(400);
    }));
});
