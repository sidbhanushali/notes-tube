//dotenv
require("dotenv").config();


const express = require('express')
const app = express()
const mongoose = require('mongoose');
const noteModel = require("./models/note");



//connect to DB 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
  })
  .then(() => console.log("Connected to AtlasDB!") )
  .catch((err) => console.log("Error connecting: " + err));




//middleware
app.use(express.json());



const port = process.env.PORT || 1000;


app.listen(port, ()=>console.log(`listening on ${port}`))