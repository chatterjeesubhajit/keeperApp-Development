// Default declarations
const express = require("express");
require('dotenv').config();
const app = express();
const session=require("express-session");
const cookieSession = require("cookie-session");
const passport=require("passport");

const authRoutes = require("./routes/auth-routes");
const mongoose=require('mongoose');
const cors=require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header
let port=process.env.PORT;
if(port==null || port== "")
{
  port=5000;
};

console.log(process.env.NODE_ENV);

const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV ==='production'?"/home/":"http://localhost:3000/home/";
const CLIENT_LOGIN_PAGE_URL = process.env.NODE_ENV ==='production'?"/":"http://localhost:3000/";


//adding below part before deploying to AWS
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
//adding above part before deploying to AWS


app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json()); // this allows to get json from axios post
app.use(express.urlencoded({ extended: false })); 
const SESSION_KEY=process.env.SESSION_KEY;
app.use(session({
  secret:SESSION_KEY,
  resave:false,
  saveUninitialized: false
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
const dbUri=process.env.NODE_ENV ==='production'?process.env.DB_PROD_URI:process.env.DB_URI;
console.log(dbUri)
mongoose.connect(dbUri,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false},(err)=>{
  if(err){console.log(err);}else{console.log("connected to db successfully");}
});
mongoose.set("useCreateIndex",true);
const noteSchema =require("./models/notes");  
const Note = new mongoose.model("Note",noteSchema);

const User = require("./models/users");
passport.use(User.createStrategy());

const passportSetup = require("./config/passport-setup");
// set up routes
app.use("/auth", authRoutes);
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};
if(process.env.NODE_ENV==="production"){
  app.get("*", authCheck, (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });  
}
else
{
  app.get("/", authCheck, (req, res) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
    res.redirect(CLIENT_LOGIN_PAGE_URL);
  });
}

app.post("/create",(req,res)=>
{
    let newNote=new Note({ind:req.body.ind, title:req.body.title,content:req.body.content,bgColor:req.body.bgColor,fontColor:req.body.fontColor});
    console.log(req.body);
    console.log("user details in create area");
    console.log(req.user);
    
    User.findOne({username:req.user.username},(err,obj)=>{
      if(!err){
        if(obj)
        {   
          obj.notes.push(newNote);
          obj.save((err)=>{if(err){console.log("error in saving data to db");}else{console.log("successfully saved data to db!");}});
        }
        else
        {
          console.log("could not save data to DB");
        }
      }
      else{
        console.log(err);
      } 
    });
});

app.delete("/delete",(req,res)=>{
    console.log("reached here");
    User.findOneAndUpdate({username:req.user.username},{$pull:{notes:{ind: req.body.index}}},(error,result)=>
     { if(error)
      {
        console.log("could not remove the document with following id: "+req.body.index);
      }
      else {
        console.log("successfully removed the document with following id: "+req.body.index);
      }
      
    }
    );
    });


app.patch("/update",(req,res)=>{
    console.log("username");
    console.log(req.user.username);
    console.log("ind");
    console.log(req.body.ind);
      User.updateOne(
        { username:req.user.username, "notes.ind": req.body.ind },
        { $set:{"notes.$":req.body}}
        ,function(err,result){if(result){console.log("updated note");}});  

});




app.listen(port, function(){
  console.log("connected to server successfully...");
});
