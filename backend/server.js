const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // configures for .env file
const mongoose = require("mongoose");

// mongoose.connect(db, {useNewUrlParser: true});
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;

connection.once("open", () => {
	console.log("Mongoose connection open");
});

// ROUTES
const userRouter = require("./routes/users");
const exerciseRouter = require("./routes/exercises");

app.use("/users", userRouter);
app.use("/exercises", exerciseRouter);

app.listen(port, () => {
	console.log(`Connected and listening on port ${port}`);
});
