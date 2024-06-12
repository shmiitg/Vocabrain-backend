const mongoose = require("mongoose");

const DB = process.env.USER_DB;
// const DB = process.env.LOCAL_USER_DB;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
        wtimeoutMS: 10000,
    })
    .then(() => {
        console.log("Database connected...");
        mongoose.connection.close();
    })
    .catch((err) => console.log("Error: ", err));
