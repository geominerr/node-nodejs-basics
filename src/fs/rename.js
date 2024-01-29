import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/customError.js';

const rename = async () => {
  const source = 'wrongFilename.txt';
  const renamedFile = 'properFilename.md';
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, 'files', source);
  const pathToDest = path.join(currentPath, 'files', renamedFile);

  fs.access(pathToDest)
    .then(() => {
      throw new CustomError({
        message: 'FS operation failed',
        name: 'FileAlreadyExists',
        path: pathToDest,
        description: `File '${renamedFile}' has already been created!`,
      });
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        return fs
          .rename(pathToSource, pathToDest)
          .then(() =>
            console.log(`${source} succeffuly renamed to ${renamedFile}`)
          )
          .catch((err) => {
            if (err.code === 'ENOENT') {
              throw new CustomError({
                message: 'FS operation failed',
                name: 'FileDoesntExist',
                path: pathToSource,
                description: `File '${source}' doesn't exist`,
              });
            }
          });
      }

      throw err;
    });
};

await rename();
