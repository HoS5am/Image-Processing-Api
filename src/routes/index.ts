import express from 'express';
import availableImages from './api/availableImages';
import viewImage from './api/viewImage';
import imgResize from './api/resize';

const routes = express.Router();

routes.use('/availableImages', availableImages);
routes.use('/image', viewImage);
routes.use('/images', imgResize);

export default routes;
