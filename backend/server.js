const express = require("express");
const app = express();
const fs = require ("fs")
const bcrypt = require('bcrypt');
const cors = require("cors")
var jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(400).json({ msg: "Please LOGIN" });
    }

    const checkToken = jwt.verify(token, "123456");
    if (checkToken) {
      req.user = checkToken.user;
      next();
    } else {
      res.status(400).json({ msg: "Please LOGIN" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Please LOGIN" });
  }
};


app.use(express.json())
app.use(cors())

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
      name,
      email,
      password: hash,
    };
  
    fs.readFile("database.json", "utf8", (err, data) => {
      if (err) {
        res.status(400).json({ msg: err });
      } else {
        const users = JSON.parse(data);
        const found = users.findIndex((e) => e.email === email);
  
        if (found === -1) {
          users.push(user);
          fs.writeFile("database.json", JSON.stringify(users), (err) => {
            if (err) {
              res.status(400).json({ msg: err });
            } else {
              res.json({ user });
            }
          });
        } else {
          res.status(400).json({ msg: `Email Already Exists` });
        }
      }
    });
  });
  


app.post('/login' ,(req,res)=>{
    const {email,password} = req.body;
    fs.readFile("database.json","utf8" ,(err,data)=>{
        if (err) {
            res.status(400).json({msg:err})
        }else{
            if(data){
                const users = JSON.parse(data)
                const found = users.findIndex((e)=>e.email == email)
                if (found == -1){
                    res.status(400).json({msg:`Invalid Email or password`})
                }else{
                    const check = bcrypt.compareSync(password, users[found].password); // true
                    if (check )
                        {
                            const token = jwt.sign({user:users[found]} , "123456")
                            res.json({token})
                        } else{
                            res.status(400).json({msg:`Invalid Email or password`})
                        }
                }
            }
        }
    })
})
app.get("/profile", checkAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});
app.listen(3000, () => console.log("Server is running ...."));
