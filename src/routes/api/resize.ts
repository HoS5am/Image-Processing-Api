import express, { Request, Response } from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import imgExists from '../../utilities/exist';
import getFileExtension from '../../utilities/fileExtension';
import getFileName from '../../utilities/fileName';
import resizeImg from '../../utilities/sharp';

const imgResize = express.Router();

imgResize.get('/', async (req: Request, res: Response): Promise<void> => {
  const widthParam: number = parseInt(req.query.width as string, 10);
  const fileParam = req.query.filename as string;
  const heightParam: number = parseInt(req.query.height as string, 10);

  if (!heightParam || !widthParam || !fileParam) {
    res
      .status(400)
      .send(
        'Please check that your width and height parameters are numbers ,and filename is a valid string',
      );
    return;
  }

  if (widthParam <= 0 || heightParam <= 0) {
    res
      .status(400)
      .send(
        'Please check that your width and height parameters are positive numbers',
      );
    return;
  }

  const fullDir = path.resolve(
    __dirname,
    `../../../images/original/${fileParam}`,
  );
  const editedDir = path.resolve(__dirname, `../../../images/edited`);

  if (!imgExists(fullDir)) {
    res
      .status(400)
      .send(
        'Image could not be found, Please try inputting an image name that exists',
      );
    return;
  }

  try {
    await fsPromises.access(editedDir);
  } catch {
    await fsPromises.mkdir(editedDir);
    console.log(`${editedDir} is created.`);
  }

  const newFileName = getFileName(fileParam);
  const editedPath = path.resolve(
    __dirname,
    `../../../images/edited/${newFileName}-${widthParam}-${heightParam}.${getFileExtension(
      fileParam,
    )}`,
  );
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
  res.status(200).sendFile(editedPath);
});

export default imgResize;
