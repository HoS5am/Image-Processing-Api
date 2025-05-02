import express, { Request, Response } from 'express';
import imgExists from '../../utilities/exist';
import path from 'path';

const viewImage = express.Router();

// Route: GET /image
// Return the original image file if it exists
viewImage.get('/', async (req: Request, res: Response): Promise<void> => {
  // Get filename from query
  const fileParam = req.query.filename as string;

  // Construct the full path to the image file
  const filePath = path.resolve(
    __dirname,
    `../../../images/original/${fileParam}`,
  );

  // Check if the image file exists
  if (!imgExists(filePath)) {
    res
      .status(400)
      .send(
        'Image does not exist in folder, Please try inputting an image name that exists',
      );
    return;
  }
  res.status(200).sendFile(filePath);
});

export default viewImage;
