import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { stdout } from 'process';

const read = async () => {
  const source = 'files/fileToRead.txt';
  const readableStream = fs.createReadStream(
    path.join(path.dirname(fileURLToPath(import.meta.url)), source)
  );

  readableStream.on('data', (chunk) => stdout.write(chunk));
  readableStream.on('end', () => stdout.write('\nFile reading completed!'));
  readableStream.on('error', (err) => {
    throw err;
  });
};

await read();
