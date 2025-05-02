// imports all the routes

import express from 'express';
import availableImages from './api/availableImages';
import viewImage from './api/viewImage';
import imgResize from './api/resize';
import uploadImage from './api/uploadImage';

const routes = express.Router();

// use all the routes

routes.use('/availableImages', availableImages);
routes.use('/image', viewImage);
routes.use('/images', imgResize);
routes.use('/upload', uploadImage);

export default routes;
