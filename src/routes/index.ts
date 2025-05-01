import express from 'express';
import images from './api/images';
import viewImage from './api/viewImage';
import imgResize from './api/resize';

const routes = express.Router();

routes.use('/', images);
routes.use('/image', viewImage);
routes.use('/images', imgResize);

export default routes;