//dotenv
require("dotenv").config();


const express = require('express')
const app = express()
const mongoose = require('mongoose');
const noteModel = require("./models/note");
const authMiddleware = require('./middleware/auth')



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


//for all api routes, exec the auth middleware function
app.all('/api/*', authMiddleware);

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));



const port = process.env.PORT || 1000;


app.listen(port, ()=>console.log(`listening on ${port}`))