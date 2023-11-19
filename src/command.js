import yargs from "yargs"
import { hideBin } from "yargs/helpers"

// hideBin hides the first two arguments of the argv array (note, filename)
yargs(hideBin(process.argv))
  // add a command to the cli: note curl <url>, where note is the cli, curl the command, and <url> the arg
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()
