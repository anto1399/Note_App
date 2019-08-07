const fs = require("fs");
const chalk = require("chalk");

// Get all Notes
const getNotes = () => {
  return "The note you have is ready for you.";
};

// Add Notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const dublipcateNotes = notes.filter((note) => note.title === title);

  // Check if the given title is not taken already
  if (dublipcateNotes.length !== 0) {
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
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Removing a given Note
const removeNote = (title) => {
  const notes = loadNotes();

  // Get all notes that the title is not == to given title and save new array
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.white.bgGreen("Notes removed successfully!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.white.bgRed("There were no matching notes in the file!"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
