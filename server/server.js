//dotenv
require("dotenv").config();


const express = require('express')
const app = express()


//middleware
app.use(express.json());

app.get("/:name", (req,res)=>{
    res.send('SUP ' + req.params.name )
})


const port = process.env.PORT || 1000;


app.listen(port, ()=>console.log(`listening on ${port}`))