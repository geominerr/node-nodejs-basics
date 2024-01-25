import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/customError.js';
import { stdout } from 'process';

const read = async () => {
  const source = 'fileToRead.txt';
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, 'files', source);

  fs.readFile(pathToSource)
    .then((data) => stdout.write(data))
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

await read();
