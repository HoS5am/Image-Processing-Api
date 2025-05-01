function getFileName(name: string) {
    // get file name
    const fileName = name.split('.').shift();
    return fileName;
}

export default getFileName;