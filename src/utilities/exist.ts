import { existsSync } from 'fs';
import getFileExtension from './fileExtension';

function imgExists(imgPath: string) {
  if (
    (existsSync(imgPath) == true && getFileExtension(imgPath) == 'jpg') ||
    getFileExtension(imgPath) == 'jpeg' ||
    getFileExtension(imgPath) == 'JPEG' ||
    getFileExtension(imgPath) == 'JPG'
  ) {
    return true;
  } else {
    return false;
  }
}
export default imgExists;
