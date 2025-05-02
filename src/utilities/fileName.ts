// Function: getFileName
// Extracts the base name of a file, excluding the extension (e.g., 'verse.jpg' -> 'verse')

function getFileName(name: string) {
  // Split the name by '.' and get the first part (filename)
  const fileName = name.split('.').shift();
  return fileName;
}

export default getFileName;
