import { getDB, saveDB, insertDB } from "./db.js";

export const createNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };

  await insertDB(data);
  return data;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (filter) => {
  const { notes } = await getAllNotes();
  return notes.filter((note) =>
    // it's important to lower case everything to normalise matches
    note.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const removeNote = async (id) => {
  const { notes } = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = () => saveDB({ notes: [] });
