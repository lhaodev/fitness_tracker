const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3030;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",

    //connect mangodb -
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }



).then(() => {
    console.log("connected to database")
});

// app.use(require("./routes/html-Roues"));
// app.use(require("./routes/api-Routes"));

// Routes
require('./routes/api-Routes')(app);
require('./routes/html-Roues')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
