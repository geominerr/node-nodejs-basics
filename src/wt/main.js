import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import HandlerWorkers from '../utils/handlerWorkers.js';

const performCalculations = async () => {
  const magicNumber = 10;
  const workerPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'worker.js'
  );
  const logicalCores = os.cpus();
  const handlerWorkers = new HandlerWorkers(logicalCores.length);

  logicalCores.forEach((__, index) =>
    new Worker(workerPath, { workerData: magicNumber + index })
      .on('message', (data) => handlerWorkers.resolve(index, data))
      .on('error', () => handlerWorkers.reject(index))
  );
};

await performCalculations();
