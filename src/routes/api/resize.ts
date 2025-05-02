import express, { Request, Response } from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import imgExists from '../../utilities/exist';
import getFileExtension from '../../utilities/fileExtension';
import getFileName from '../../utilities/fileName';
import resizeImg from '../../utilities/sharp';

const imgResize = express.Router();

// Route: GET /images
//Resizes a requested image with given width and height, and returns the resized image file

imgResize.get('/', async (req: Request, res: Response): Promise<void> => {
  // Extract and parse query parameters
  const widthParam: number = parseInt(req.query.width as string, 10);
  const fileParam = req.query.filename as string;
  const heightParam: number = parseInt(req.query.height as string, 10);

  // Validate required parameters: filename, width, height
  if (!fileParam || isNaN(widthParam) || isNaN(heightParam)) {
    res.status(400).json({
      error: 'Please ensure that width and height are valid numbers and filename is a valid string.',
    });
    return;
  }

  // Validate dimensions: must be greater than zero
  if (widthParam <= 0 || heightParam <= 0) {
    res.status(400).json({
      error: 'Width and height must be positive numbers greater than zero.',
    });
    return;
  }

  // Construct full paths for original and edited image directories
  const fullDir = path.resolve(
    __dirname,
    `../../../images/original/${fileParam}`,
  );
  const editedDir = path.resolve(__dirname, `../../../images/edited`);

  // Check if original image exists
  if (!imgExists(fullDir)) {
    res.status(404).json({
      error: 'Image could not be found. Please ensure the image name exists.',
    });
    return;
  }

  try {
    // Ensure the edited images directory exists, create if not
    await fsPromises.access(editedDir);
  } catch {
    await fsPromises.mkdir(editedDir);
    console.log(`${editedDir} is created.`);
  }

  // Construct path for resized image using file name and dimensions
  const newFileName = getFileName(fileParam);
  const editedPath = path.resolve(
    __dirname,
    `../../../images/edited/${newFileName}-${widthParam}-${heightParam}.${getFileExtension(
      fileParam,
    )}`,
  );
  // If the resized image does not exist, perform resizing
  if (!imgExists(editedPath)) {
    const imageResized = await resizeImg(
      widthParam,
      heightParam,
      fullDir,
      fileParam,
    );

    if (!imageResized) {
      res.status(400).send('An error occurred while resizing the image.');
    }
  }
  // Send the resized image as the response
  res.status(200).sendFile(editedPath);
});

export default imgResize;
