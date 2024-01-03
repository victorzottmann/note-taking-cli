import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  createNote,
  getAllNotes,
  findNotes,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { listNotes } from "./utils.js";

// hideBin hides the first two arguments of the argv array (note, filename)
yargs(hideBin(process.argv))
  /**
   * Command name followed by any args for it (<> means it's required), command description, yargs.
   * yargs is a new instance of yargs, but it's limited to this scope, not the one being imported.
   * While it's not 100% necessary, it can be useful for formatting things.
   */
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        describe: "the content of the note",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await createNote(argv.note, tags);
      console.log("New note:", note);
    },
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to a note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const notes = await getAllNotes();
      listNotes(notes);
    },
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const matches = await findNotes(argv.filter);
      listNotes(matches);
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log(id);
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async () => {
      await removeAllNotes();
      console.log("All notes removed");
    },
  )
  // when the argument is wrapped within [], such as in web [port], it means it's optional
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        type: "number",
        default: 5000, // set the default port to 5000 if none is passed
        describe: "port to bind on",
      });
    },
    async (argv) => {},
  )
  .demandCommand(1)
  .parse();
