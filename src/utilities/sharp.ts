import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';
import getFileName from './fileName';
import getFileExtension from './fileExtension';

const resizeImg = async (
  width: number,
  height: number,
  inputPath: string,
  name: string,
): Promise<boolean> => {
  try {
    const editedPath = path.resolve(__dirname, `../../images/edited/`);
    const fileName = getFileName(name);
    const newFileName =
      fileName + `-${width}-` + `${height}.` + `${getFileExtension(name)}`;
    const outPath = path.join(editedPath, newFileName);
    const ImgSharpBuffer = await sharp(inputPath)
      .resize(width, height)
      .toBuffer();

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
