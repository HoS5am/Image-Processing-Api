import express, { Request, Response } from 'express';
import imgExists from '../../utilities/exist';
import path from 'path';

const viewImage = express.Router();

viewImage.get('/', async (req: Request, res: Response): Promise<void> => {
    const fileParam = req.query.filename as string;
    const filePath = path.resolve(__dirname,`../../../images/original/${fileParam}`
    );
    if (!imgExists(filePath)) {
        res.status(400).send(
            'Error!, image does not exist in folder, Please try inputing an image name that exists'
        );
        return;
    }
    res.status(200).sendFile(filePath);
});

export default viewImage;
