require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

//database connection 
mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;
database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("MongoDB: Database connected");
});


//express
const app = express();
const PORT = process.env.PORT;
app.use(cors({origin: "*"}));
app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
});
app.use('/api', apiRoutes);

//swagger initilization goes here


app.listen(PORT, () => {
    console.log(`app started at http://localhost:${PORT}`);
    console.log(`API Docs on http://localhost:${PORT}/api-docs`);
});
