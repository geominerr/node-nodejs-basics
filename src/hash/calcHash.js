import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const source = 'files/fileToCalculateHashFor.txt';
  const hash = crypto.createHash('sha256');
  const readableStream = fs.createReadStream(
    path.join(path.dirname(fileURLToPath(import.meta.url)), source)
  );

  readableStream.on('data', (data) => {
    hash.update(data);
  });

  readableStream.on('end', () => {
    stdout.write(`SHA-256 hash: ${hash.digest('hex')}`);
  });

  readableStream.on('error', (err) => {
    throw err;
  });
};

await calculateHash();
