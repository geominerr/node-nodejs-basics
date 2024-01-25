import { stdout } from 'process';

const parseEnv = () => {
  const envVariables = process.env;

  Object.keys(envVariables)
    .filter((key) => key.startsWith('RSS_'))
    .forEach((key) => stdout.write(`${key}=${envVariables[key]};\n`));
};

parseEnv();
