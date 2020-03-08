const express = require('express')
const router = express.Router();
const db = require("./dbconnect.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY || '';

//----- authenticating user -----
router.get('/app/authenticate', async function(req, res, next){
  let authHeader = req.headers.authorization;

  if(!authHeader) {
    res.status(401).end();
  }
  else {
    let base64Credentials = req.headers.authorization.split(' ')[1];
    let buffer = Buffer.from(base64Credentials, 'base64');
    let credentials = buffer.toLocaleString();

    let username = credentials.split(':')[0];
    let password = credentials.split(':')[1];

    let sql = `select id, username, email, role, password from public."Users"
    where "username" = '${username}';`

    try {
      let user = await db.runQuery(sql);
      if(user.length>0) {
        let correct = await bcrypt.compare(password, user[0].password)
        .then(function(res){
          return res;
        });

        if(correct){
          let token = jwt.sign({username: username}, TOKEN_KEY);

          delete user[0].password;

          res.status(200).send({user: user[0], token: token});
        }
        else {
          res.status(401).json({ message: "Wrong username or password" });
        }

      }
      else {
        res.status(401).json({ message: "Wrong username or password" });
      }

    } catch(err){
      res.status(500).json({ message: "Something went wrong" });

    }

  }

});

//----- verifying jsonwebtoken -----
router.verifyToken = function(req, res, next){
  let token = req.headers['x-access-token'];

  jwt.verify(token, TOKEN_KEY, function(err) {
        if (err) {
          return res.status(401).json({message: 'Token is not valid'});
        } else {
          next();
        }
  });

}

//----- hashing password with bcryptjs -----
router.crypt = function(req, res, next){

 bcrypt.genSalt(10, function(err, salt) {
     bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          return res.status(500).json({message: 'Something went wrong'});
        } else {
          req.hashed = hash;
          next();
        }
      });
  });

};

module.exports = router;
