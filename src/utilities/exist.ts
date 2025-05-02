import { existsSync } from 'fs';
import getFileExtension from './fileExtension';


// Function: imgExists
// Checks whether an image file exists at a given path AND that it has a valid image extension

function imgExists(imgPath: string) {
  if (
    (existsSync(imgPath) == true && getFileExtension(imgPath) == 'jpg') ||
    getFileExtension(imgPath) == 'jpeg' ||
    getFileExtension(imgPath) == 'JPEG' ||
    getFileExtension(imgPath) == 'JPG'
  ) {
    return true; // Valid image exists
  } else {
    return false; // File does not exist or not valid type
  }
}
export default imgExists;
