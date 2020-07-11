const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const users = require('./routes/users');
const categories = require('./routes/categories');
const articles = require('./routes/articles');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use("/users", users);
  app.use("/categories", categories);
  app.use("/articles", articles);

  app.listen(port, () => {
    console.log(`Server started working on ${port} port!`);
  })
};

run().catch(e => {
  console.log(e);
});