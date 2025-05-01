import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import getFileExtension from '../../utilities/fileExtension';

const images = express.Router();
const filePath = path.resolve(__dirname, `../../../images/original`);

images.get('/', async (req: Request, res: Response): Promise<void> => {
    let fileList = '';
    try {
        const files: string[] = await fsPromises.readdir(filePath);
        files.forEach((file: string) => {
                if(
                    getFileExtension(file) == 'jpg' ||
                    getFileExtension(file) == 'jpeg' ||
                    getFileExtension(file) == 'JPEG' ||
                    getFileExtension(file) == 'JPG'
                ) {
                    fileList = fileList + `<p>${file}</p>`;
                }
        });
        res.status(200).send(fileList);
    } catch (err) {
        res.status(500).send('Error! Cannot read from Directory');
    }
});

export default images;