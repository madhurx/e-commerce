const express = require("express");

const app = express();
app.use(express.json());



const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
