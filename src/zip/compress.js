import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import CustomError from '../utils/customError.js';

const compress = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, 'files', 'fileToCompress.txt');
  const pathToDest = path.join(currentPath, 'files', 'archive.gz');

  try {
    await fs.promises.access(pathToSource);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new CustomError({
        message: 'ZIP operation failed',
        name: 'SourceDoesntExist',
        path: pathToSource,
        description: `File 'fileToCompress.txt' doesnt exist`,
      });
    }

    process.exit(1);
  }

  const readableStream = fs.createReadStream(pathToSource);
  const writableStream = fs.createWriteStream(pathToDest);

  pipeline(readableStream, createGzip(), writableStream, (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }

    console.log(`File successfully compressed!`);

    fs.promises.unlink(pathToSource);
  });
};

await compress();
