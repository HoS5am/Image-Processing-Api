"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const originalImagesDir = path_1.default.resolve(__dirname, '../../../images/original');
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, originalImagesDir);
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    },
});
const fileFilter = (_req, file, cb) => {
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg'].includes(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only .jpg, .jpeg files are allowed.'));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
const uploadImage = express_1.default.Router();
uploadImage.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    return res.status(200).json({
        message: 'Image uploaded successfully!',
        filename: req.file.filename,
    });
});
exports.default = uploadImage;
