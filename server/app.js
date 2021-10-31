const express = require("express");
const app = express();
const port = 3000;
const tasksRouter = require("./routes/tasks");
const { initDatabase } = require("./db/connect");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks/", tasksRouter);

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
