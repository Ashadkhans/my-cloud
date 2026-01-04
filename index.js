const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Upload folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

app.get("/files", (req, res) => {
  res.json(require("fs").readdirSync("uploads"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
