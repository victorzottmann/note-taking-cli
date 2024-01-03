export const listNotes = (notes) => {
  notes.forEach((note) => {
    console.log(`\nid: ${note.id}`);
    console.log(`tags: ${note.tags.join(", ")}`);
    console.log(`note: ${note.content}`);
  });
};
