// Собирает список файлов в указанной директории и выводит его в консоль
const path = require('path');
const fs = require('fs');
const imagesDirectory = process.argv[2];

const getAllFiles = (dirPath: string, arrayOfFiles?: any | never, relativePath: string = '') => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file: any) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles, `${file}/`);
    } else {
      arrayOfFiles.push(`/${relativePath}${file}`);
    }
  });

  return arrayOfFiles;
};

console.log('export default', getAllFiles(imagesDirectory), ';\n');
