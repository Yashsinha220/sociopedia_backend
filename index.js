const express = require("express");
const bodyParser = require("body-parser");
// for the storge
const multer = require("multer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
// write the http headers
const helmet = require("helmet");
// log the response
const morgan = require("morgan");
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');
const {register} = require('./controllers/UserControllers.js')

const authroute= require('./routes/auth.js')
const userroute = require('./routes/user.js')
const postroute = require('./routes/post.js')
const verifyToken = require('./middlewares/auth.js')
const { createPost }  = require('./controllers/post.js');

// configuration

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
// this will use the assets file
const newpath = path.join(__dirname,"/public/assets");
// console.log(newpath)
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/assets" ,express.static(newpath) )
dotenv.config();

// file storage configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // this should be the whole path to store the files
    cb(null, path.join(__dirname,"/public/assets"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// routes with file
app.post('/auth/register' , upload.single('picture') , register );
app.post("/posts" , verifyToken , upload.single("picture") , createPost);

// routers
app.use('/auth' , authroute);
app.use("/users",userroute)
app.use("/posts" , postroute)


// mogoose setup
const PORT = 3001;



const uri = "mongodb+srv://yash:SAMaaro22oct@yashdatabase.10fsveo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server listening on port 🚀 http://localhost:${PORT}`);
    })
    console.log('database connection established')
}).catch((e)=>{
    console.log('error connecting to database' ,e)
})

