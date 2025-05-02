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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadImage_1 = __importDefault(require("../../routes/api/uploadImage"));
const app = (0, express_1.default)();
app.use('/upload', uploadImage_1.default);
describe('POST /upload', () => {
    const testImagePath = path_1.default.join(__dirname, '../../test-assets/test.jpg');
    const nonImagePath = path_1.default.join(__dirname, '../../test-assets/test.txt');
    const uploadedImagePath = path_1.default.resolve(__dirname, '../../../images/original/test.jpg');
    beforeAll(() => {
        // Create dummy test image
        fs_1.default.mkdirSync(path_1.default.dirname(testImagePath), { recursive: true });
        fs_1.default.writeFileSync(testImagePath, Buffer.from([0xff, 0xd8, 0xff]), 'binary'); // fake JPEG header
        fs_1.default.writeFileSync(nonImagePath, 'This is a test file.', 'utf-8');
    });
    afterAll(() => {
        // Cleanup uploaded test image
        if (fs_1.default.existsSync(uploadedImagePath)) {
            fs_1.default.unlinkSync(uploadedImagePath);
        }
        fs_1.default.rmSync(path_1.default.dirname(testImagePath), { recursive: true, force: true });
    });
    it('should upload a valid JPEG image successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/upload')
            .attach('image', testImagePath);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: 'Image uploaded successfully!',
            filename: 'test.jpg'
        });
        expect(fs_1.default.existsSync(uploadedImagePath)).toBeTrue();
    }));
    it('should reject non-jpg/jpeg files', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/upload')
            .attach('image', nonImagePath);
        expect(res.status).toBe(500);
    }));
    it('should reject when no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/upload');
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('No file uploaded.');
    }));
});
