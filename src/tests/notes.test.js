import { jest } from "@jest/globals";

jest.unstable_mockModule("../db.js", () => ({
  getDB: jest.fn(),
  saveDB: jest.fn(),
  insertDB: jest.fn(),
}));

const { getDB, saveDB, insertDB } = await import("../db.js");
const { createNote, getAllNotes, removeNote } = await import("../notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("createNote inserts data and returns it", async () => {
  const note = {
    id: Date.now(),
    content: "test note",
    tags: ["hello", "test"],
  };
  insertDB.mockResolvedValue(note);
  const result = await createNote(note.content, note.tags);
  expect(result.content).toEqual(note.content);
  expect(result.tags).toEqual(note.tags);
});
