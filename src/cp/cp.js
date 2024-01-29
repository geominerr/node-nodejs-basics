import path from 'path';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const pathToScript = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'files',
    'script.js'
  );
  const childProcess = fork(pathToScript, args, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  childProcess
    .on('exit', (code) => {
      console.log(`Child process exit with code: ${code}`);
    })
    .on('error', (err) => {
      console.error(`Error: ${err.message}`);
    });

  process.stdin
    .on('end', () => {
      console.log('sdfdsfsdfsfd');
      childProcess.stdin.end();
    })
    .on('error', (err) => {
      console.error(`Error: ${err.message}`);
    });
};

spawnChildProcess(
  process.argv.slice(2).length ? process.argv.slice(2) : ['arg1', 'arg2']
);
