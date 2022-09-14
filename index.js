const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/noteModel");

const app = express();
app.use(cors({}));
app.use(express.json());

const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`;

// const mongoURL = `mongodb://localhost:27017/?authSource=admin`;

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      notes,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      status: "fail",
    });
  }
});

app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    return res.status(200).json({
      note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
    });
  }
});

app.post("/notes", async (req, res) => {
  console.log(req.body);
  try {
    const note = await Note.create(req.body);

    return res.status(201).json({
      note,
    });
  } catch (e) {
    console.log(e);

    return res.status(400).json({
      status: "fail",
    });
  }
});

app.patch("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
    });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    console.log(note);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
    });
  }
});

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("succesfully connected to DB");
    app.listen(3000, () => console.log("Server is listening on PORT 3000"));
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
