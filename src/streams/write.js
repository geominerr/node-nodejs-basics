import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { stdin, stdout } from 'process';

const exitHandler = (message) => {
  stdout.write(`\n${message}`);
  stdin.end();
  process.exit(0);
};

const write = async () => {
  const dest = 'files/fileToWrite.txt';
  const writableStream = fs.createWriteStream(
    path.join(path.dirname(fileURLToPath(import.meta.url)), dest)
  );
  const exitCommands = [':q', ':quit', ':exit'];

  stdout.write(
    `To terminate the program, enter ${exitCommands.join(
      ' / '
    )} and press Enter\nEnter you message: \n`
  );

  stdin.on('data', (line) => {
    if (exitCommands.includes(line.toString().trim())) {
      return exitHandler('See you later!');
    }

    writableStream.write(line);
  });

  process.on('SIGINT', () =>
    exitHandler('Oops! Forced termination, last input not recorded! ')
  );
};

await write();
