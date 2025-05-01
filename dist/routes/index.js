"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const viewImage_1 = __importDefault(require("./api/viewImage"));
const resize_1 = __importDefault(require("./api/resize"));
const routes = express_1.default.Router();
routes.use('/', images_1.default);
routes.use('/image', viewImage_1.default);
routes.use('/images', resize_1.default);
exports.default = routes;
