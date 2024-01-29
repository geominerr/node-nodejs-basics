import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/customError.js';

const readDir = async (pathToSource, source) => {
  try {
    return await fs.readdir(pathToSource);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new CustomError({
        name: 'DirectoryDoesntExist',
        path: pathToSource,
        description: `Directory '${source}' doesn't exist`,
      });
    }
  }
};

const createDir = async (pathToDest, dest) => {
  try {
    await fs.mkdir(pathToDest);
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new CustomError({
        name: 'DirectoryAlreadyExists',
        path: pathToDest,
        description: `Directory '${dest}' has already been created`,
      });
    }
  }
};

const copy = async () => {
  const source = 'files';
  const dest = 'files_copy';
  const currentPath = path.dirname(fileURLToPath(import.meta.url));
  const pathToSource = path.join(currentPath, source);
  const pathToDest = path.join(currentPath, dest);

  try {
    const files = await readDir(pathToSource, source);
    await createDir(pathToDest, dest);

    files.forEach((file) =>
      fs
        .copyFile(path.join(pathToSource, file), path.join(pathToDest, file))
        .then(() =>
          console.log(
            `File ${file} from '${source}' copied successfully to '${dest}'`
          )
        )
    );
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
  }
};

await copy();
