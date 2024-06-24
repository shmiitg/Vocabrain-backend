require("dotenv").config();
const express = require("express");
const cors = require("cors");

const indexRouter = require("./routes/index");
const idiomRouter = require("./routes/idiom");
const owsRouter = require("./routes/ows");
const spellingRouter = require("./routes/spelling");
const revisionRouter = require("./routes/revision");
const authRouter = require("./routes/auth");
const favouriteRouter = require("./routes/favourite");
const visitRouter = require("./routes/visit");

require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/word", indexRouter);
app.use("/idiom", idiomRouter);
app.use("/ows", owsRouter);
app.use("/spelling", spellingRouter);
app.use("/revision", revisionRouter);
app.use("/auth", authRouter);
app.use("/favourite", favouriteRouter);
app.use("/visit", visitRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port ${port}`));
