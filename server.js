require("dotenv").config();
const express = require("express");
const cors = require("cors");

const indexRouter = require("./routes/index");
const owsRouter = require("./routes/ows");

require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/word", indexRouter);
app.use("/ows", owsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port ${port}`));
