const mongoose = require("mongoose");
const migrateOwsWords = require("../scripts/migrateOwsWords");

const DB = process.env.USER_DB;
// const DB = process.env.LOCAL_USER_DB;

mongoose
    .connect(DB, { wtimeoutMS: 2500 })
    .then(() => {
        console.log("Database connected...");
        // migrateOwsWords();
    })
    .catch((err) => console.log("Error: ", err));
