const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Note must have title"],
  },
  body: {
    type: String,
    required: [true, "Note must have body"],
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
