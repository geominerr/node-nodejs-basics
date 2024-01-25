import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/customError.js';

const list = async () => {
  const source = 'files';
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, source);

  fs.readdir(pathToSource)
    .then((files) => console.log(files))
    .catch((err) => {
      if (err.code === 'ENOENT') {
        throw new CustomError({
          name: 'DirectoryDoesntExist',
          path: pathToSource,
          description: `Directory '${source}' doesn''t exist`,
        });
      }
    });
};

await list();
