import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import CustomError from '../utils/customError.js';

const decompress = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, 'files', 'archive.gz');
  const pathToDest = path.join(currentPath, 'files', 'fileToCompress.txt');

  try {
    await fs.promises.access(pathToSource);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new CustomError({
        message: 'ZIP operation failed',
        name: 'SourceDoesntExist',
        path: pathToSource,
        description: `File 'archive.gz' doesnt exist`,
      });
    }

    process.exit(1);
  }

  const readableStream = fs.createReadStream(pathToSource);
  const writableStream = fs.createWriteStream(pathToDest);

  pipeline(readableStream, createGunzip(), writableStream, (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }

    console.log(`File successfully decompressed!`);

    fs.promises.unlink(pathToSource);
  });
};

await decompress();
