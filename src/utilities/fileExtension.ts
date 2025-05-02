// Function: getFileExtension
// Extracts the file extension from a given filename (e.g., 'verse.jpg' -> 'jpg')
function getFileExtension(fileName: string) {
  // Split the filename by '.' and get the last part which is the extension
  const extension = fileName.split('.').pop();
  return extension;
}

export default getFileExtension;
