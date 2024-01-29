import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/customError.js';

const remove = async () => {
  const source = 'fileToRemove.txt';
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, 'files', source);

  fs.rm(pathToSource)
    .then(() => console.log(`File ${source} deleted successffuly`))
    .catch((err) => {
      if (err.code === 'ENOENT') {
        throw new CustomError({
          name: 'FileDoesntExist',
          path: pathToSource,
          description: `File '${source}' doesn't exist`,
        });
      }
    });
};

await remove();
