import { stdin, stdout } from 'process';
import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, __, cb) {
      this.push(
        `Reversed: ${chunk.toString().trim().split('').reverse().join('')}\n`
      );
      cb();
    },
  });

  stdout.write(
    'Hello!\nTo terminate the program use ctrl + C\nEnter you message: \n'
  );
  stdin.pipe(reverseTransform).pipe(stdout);

  process.on('SIGINT', () => {
    stdout.write(`\nSee you later!`);
    stdin.end();
    process.exit(0);
  });
};

await transform();
