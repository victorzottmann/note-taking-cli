import fs from "node:fs/promises";

const readPackageJson = async () => {
  // When using ES modules, the global __dirname is not available (diretory name of the current module's file),
  // so you need to reconstruct the absolute path to a file.
  const path = new URL("../package.json", import.meta.url).pathname;
  // It's also important to read from files asynchronously
  return JSON.parse(await fs.readFile(path, "utf-8"));
};

const writeFile = async () => {
  const newFile = new URL("./output.js", import.meta.url).pathname;
  const content = await readPackageJson();
  /**
   * The content to be written is a console.log() with the content so that
   * when the script is run, it outputs the data from package.json.
   * The content must be stringified because readPackageJson() returns an object
   */
  const output = `console.log(${JSON.stringify(content)})`;
  await fs.writeFile(newFile, output);
};

/**
 * Run the following in the terminal:
 * node ./src/files && node ./src/output.js
 *
 * Although output.js doesn't exist yet, if writeFile executes normally,
 * output.js will be created and executed.
 */
writeFile();
