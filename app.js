const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Add Command to process adding new notes
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Remove Command to process adding new notes
yargs.command({
  command: "remove",
  describe: "remove a new note",
  builder: {
    title: {
      describe: "Note title to be removed",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// List notes command
yargs.command({
  command: "list",
  describe: "Get all notes",
  handler() {
    notes.listNotes();
  }
});

// Read Note Command Handler
yargs.command({
  command: "read",
  describe: "Read a given note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
