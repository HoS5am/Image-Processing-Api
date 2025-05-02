import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';
import getFileName from './fileName';
import getFileExtension from './fileExtension';

// Function: resizeImg
// Resizes an image to the specified width and height using Sharp, and saves it to the edited images folder
const resizeImg = async (
  width: number,
  height: number,
  inputPath: string,
  name: string,
): Promise<boolean> => {
  try {
    // Define output folder path
    const editedPath = path.resolve(__dirname, `../../images/edited/`);

    // Extract filename and extension separately
    const fileName = getFileName(name);
    const newFileName =
      fileName + `-${width}-` + `${height}.` + `${getFileExtension(name)}`;

    // Build full path for output file
    const outPath = path.join(editedPath, newFileName);

    // Use Sharp to resize image and store it in memory buffer
    const ImgSharpBuffer = await sharp(inputPath)
      .resize(width, height)
      .toBuffer();

    // Write the resized image to disk using file system module
    await fsPromises.writeFile(outPath, ImgSharpBuffer).then(() => {
      return true;
    });
    console.log(
      `${fileName} has been resized to width: ${width}, and height: ${height} successfully!`,
    );
    return true;
  } catch {
    return false;
  }
};
export default resizeImg;
