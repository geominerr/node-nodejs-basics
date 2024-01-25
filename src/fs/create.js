import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/customError.js';

const create = async () => {
  const fileName = 'fresh.txt';
  const data = 'I am fresh and young';
  const options = { encoding: 'UTF-8' };
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(currentPath, 'files', fileName);

  fs.promises
    .access(filePath)
    .then(() => {
      throw new CustomError({
        name: 'FileExists',
        path: filePath,
        description: `This file '${fileName}' already exists`,
      });
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        return fs.promises
          .writeFile(filePath, data, options)
          .then(() => console.log(`${fileName} file created successfully`))
          .catch((err) => console.error(err));
      }

      throw err;
    });
};

await create();
