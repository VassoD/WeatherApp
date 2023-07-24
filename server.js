const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const projectData = {};

app.use(express.static("website"));

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/add", (req, res) => {
  const { date, temp, feelings } = req.body;
  projectData.date = date;
  projectData.temp = temp;
  projectData.feel = feelings;
  res.send({ message: "Data added successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
