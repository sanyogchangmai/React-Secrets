require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Secret = require("./models/secret");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// app.use(bodyParser.urlencoded({ extended : true}));
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())
// app.use(bodyParser.json());
app.use(cors());

// ! Connecting to DB !
const URL = process.env.DB_URI;
mongoose.connect(URL,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, })
.then((result) => console.log("Connected to DB"))
.catch((err) => console.log(err))


// ! Getting current users secrets
app.get("/secrets/:uid", (req, res) => {
    Secret.find({ "user_uid" : req.params.uid }).sort({createdAt: -1})
    .then(result => {
        res.json(result);
        console.log(result);
    })
	.catch(err => res.status(400).json('Error: ' + err));
  });


// ! Saving current users secret and uid 
app.post("/",function(req,res){
    const secret = new Secret({
        user_uid: req.body.user,
        secrets: req.body.secret,
    });
    console.log(secret);
    secret.save()
     .then((result) => {
         res.json(result);
         console.log(result);
     })
     .catch(err => res.status(400).json('Error: ' + err));
})

// ! Getting particular secret of the current user
app.get("/secret/:id",function(req,res){
    Secret.findById(req.params.id)
      .then(result => {
          res.json(result);
          console.log(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


// ! Deleting particular secret of the current user
app.delete("/secret/:id",function(req,res){
    Secret.findByIdAndDelete(req.params.id)
      .then((result) => {
          res.json(result);
          console.log(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// ! Updating particular secret of current user
app.put("/edit/:id",function(req,res){
    const id = req.params.id;
    console.log(id);
    console.log("body is " + req.body.secret);
    Secret.findByIdAndUpdate(id,{ secrets : req.body.secret },{ useFindAndModify : false})
      .then((result) => {
          res.json(result);
          console.log(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(process.env.PORT || 5000,function(){
    console.log("Server is running at port 5000");
});