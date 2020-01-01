const express = require('express')
const router = express.Router();
const db = require("./dbconnect.js");

//---------- create user ----------
router.post('/app/newUser', async function(req,res,next){

  let username = req.body.username;
  let userEmail = req.body.email;
  let userPsw = req.body.password;

  let sql =  `insert into public."Users" ("username", "email", "password")
  values('${username}', '${userEmail}', '${userPsw}')
  returning "id", "username", "email", "role";`;

  try {
    let data = await db.runQuery(sql);

    if(data){
      res.status(200).json(data);

    } else {
      res.status(400).json({message: "not a unique username/email"});
    }
  }
  catch(err) {
    res.status(500).json({error: err});
  }
});

module.exports = router;
