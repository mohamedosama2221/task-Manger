//env config
require("dotenv").config();

//express
const express = require("express");
const app = express();

//security middleware
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

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

//security middleware
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter());
app.use(helmet());
app.use(cors());
app.use(xssClean());

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
