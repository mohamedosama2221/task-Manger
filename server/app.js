//env config
require("dotenv").config();

//express
const express = require("express");
const app = express();

//swagger config
var path = require("path");
var swagger_path = path.resolve(__dirname, "./swagger/swagger.yaml");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(swagger_path);

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

//documentation route
app.get("/docs", (req, res) => {
  return res.send(
    "<h1 style='color:gray'>Task Api</h1> <span>click here </span><a href='/api-docs' style='color:red;font-size:16px; font-weight:bold ;text-decoration:none;'>Documentation</a> <span>for the full api documentation</span>"
  );
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
