import fs from "fs";
import { program } from "commander";

import md2html from './md2html'

program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);

const filePath = program.args[0];
const options = program.opts();
const cliOptions = {
  gfm: options.gfm ?? false,
};

fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  const html = md2html(file, cliOptions);
  console.log(html);
});
