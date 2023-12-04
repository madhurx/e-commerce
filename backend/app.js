const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const app = express();
app.use(express.json());

const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const corsOptions = {
	origin: "*",
};

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorMiddleware);

module.exports = app;
