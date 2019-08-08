const fs = require("fs");
const chalk = require("chalk");

// List all Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white.bgGreen("Your Notes:"));
  notes.forEach(note => {
    console.log(note.title);
  });
};

// Read a given notes
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log("Title: " + chalk.white.bgGreen(note.title));
    console.log("Body: " + note.body);
  } else {
    console.log(chalk.white.bgRed("Note not found"));
  }
};

// Add Notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const dublipcateNote = notes.find(note => note.title === title);

  // Check if the given title is not taken already/duplicate
  if (dublipcateNote) {
    console.log(chalk.white.bgRed("Note title taken!"));
  } else {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.white.bgGreen("Note added successfully!"));
  }
};

// Loading Notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// Saving Notes to Json file
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Removing a given Note
const removeNote = title => {
  const notes = loadNotes();

  // Get all notes that the title is not == to given title and save new array
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.white.bgGreen("Notes removed successfully!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.white.bgRed("There were no matching notes in the file!"));
  }
};

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
};
