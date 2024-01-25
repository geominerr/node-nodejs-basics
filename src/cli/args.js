import { stdout } from 'process';

const parseArgs = () => {
  const args = process.argv.slice(2);

  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      stdout.write(
        `${arg.slice(2)} is ${args[index + 1] || 'no value'}${
          index >= args.length - 2 ? '' : ','
        }\n`
      );
    }
  });
};

parseArgs();
