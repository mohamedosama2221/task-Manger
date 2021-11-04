//env config
require("dotenv").config();

//express
const express = require("express");
const app = express();

//port
const port = process.env.PORT || 3000;

//DB
const { initDatabase } = require("./db/connect");

//route
const tasksRouter = require("./routes/tasks");

//middleware

const { notFound } = require("./middleware/not-found");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks/", tasksRouter);

//custom middleware
app.use(notFound);

//initDatabase , start server
initDatabase((db, err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`app is listening on ${port}... `);
    });
  }
});
