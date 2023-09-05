require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import routes
const authRouters = require("./routes/authRoutes");
const scholarshipRouters = require("./routes/scholarshipRoutes");
const applicationRouters = require("./routes/applicationRouters");

// import middlewares
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// using routes
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/scholarship", scholarshipRouters);
app.use("/api/v1/application", applicationRouters);

app.get("/", (req, res) => {
  res.send("scholarship api");
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database`);
    console.log(`Server is running on port ${port}...`);
  } catch (error) {
    console.log(error);
  }
});
