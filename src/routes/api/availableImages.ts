import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import getFileExtension from '../../utilities/fileExtension';

const images = express.Router();
const filePath = path.resolve(__dirname, `../../../images/original`);

images.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const files: string[] = await fsPromises.readdir(filePath);

    const imageFiles = files.filter((file: string) => {
      const ext = getFileExtension(file);
      return (
        typeof ext === 'string' && ['jpg', 'jpeg'].includes(ext.toLowerCase())
      );
    });

    res.status(200).json(imageFiles);
  } catch (err) {
    res.status(500).send(`Cannot read from directory ${err}`,);
  }
});

export default images;
