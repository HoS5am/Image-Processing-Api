import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import getFileExtension from '../../utilities/fileExtension';

const images = express.Router();
const filePath = path.resolve(__dirname, `../../../images/original`);

// Route: GET /availableImages
// Returns a list of all .jpg or .jpeg images in the original images directory

images.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    // Read all filenames in the original images directory
    const files: string[] = await fsPromises.readdir(filePath);

    // Filter for .jpg or .jpeg files only
    const imageFiles = files.filter((file: string) => {
      const ext = getFileExtension(file);
      return (
        typeof ext === 'string' && ['jpg', 'jpeg'].includes(ext.toLowerCase())
      );
    });

    // Send the filtered filenames as a JSON response
    res.status(200).json(imageFiles);
  } catch (err) {
    // If directory cannot be read, send a 500 error
    res.status(500).send(`Cannot read from directory ${err}`);
  }
});

export default images;
