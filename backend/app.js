const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const Busboy = require('busboy');
const busboy = require('express-busboy');

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const corsOptions = {
	origin: "*",
};
// busboy.extend(app, {
//     upload: true,
//     path: '/',
//     allowedPath: /./,
// });

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware);

module.exports = app;
