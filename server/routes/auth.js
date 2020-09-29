const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user')



router.post("/", async (req,res) => {
    const { username, password } = req.body;
    if(password.length < 1){
        res.status(500).json({msg: "Please enter a vaild password."})
        return;
    }

    let newUser = new userModel({
        username: req.body.username, 
        passwordHash: bcrypt.hashSync(password, 'saltyboi'), 
        numNotes: 0
    })


    newUser
    .save()
    .then(user =>{
        jwt.sign({username: newUser.username},
             process.env.SECRET,
             (err, token) =>{
                 if (err) throw err; 
                res.send({token, username: user.username })
             })
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
//end reqres
})


router.post("/login", (req, res) => {
    const { username, password } = req.body;

 userModel.findOne({username})
.then(user => {
        if(!user) {
          res.status(500).json({msg: "No User with that username: " + username});
          return; 
          //if the compareSync function returns false
        } else if(!bcrypt.compareSync(password, user.passwordHash)) {
          res.status(500).json({msg: "Invalid Password"});
        }
  
        jwt.sign({username: user.username },
                process.env.SECRET,
                 (err, token) => {
                     if(err) throw err;
                     res.send({ token, user: {username: user.username} });
        });
      }).catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });
  

  module.exports = router;
