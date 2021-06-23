const router = require("express").Router();
const express = require("express");
const mongoDbConnect = require("./utils/db.js");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cron = require('node-cron');
require("dotenv").config();
const io=require('./socket')

const app = express();
const port =5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");
 
const AnnonceRouter=require('./routes/AnnouceRoutes/AnnounceRoute')
const EnchereRouter= require('./routes/AnnouceRoutes/EncehreRoute')
const DrawRouter =require('./routes/AnnouceRoutes/DrawRoute')
const NormalAnnounceRouter =require('./routes/AnnouceRoutes/NormalAnnounceRoute')


const categsRouter = require("./routes/Categori.route");
const subcategsRouter = require("./routes/Subcategs.route");
const avisRouter = require("./routes/Avis.route");
const cityRouter = require("./routes/City.route");

const AdminRouter = require("./routes/Admin");
const UserRouter = require("./routes/User");
const PackSoldeRouter=require("./routes/PackSolde");
const LoginRouter=require("./routes/Login");
const StripeRouter=require("./routes/Stripe");
const { Socket } = require("socket.io");

app.use("/categorie", categsRouter);
app.use("/subcategs", subcategsRouter);
app.use("/avis", avisRouter);
app.use("/city", cityRouter);

app.use('/announce',AnnonceRouter)
app.use('/enchere',EnchereRouter)
app.use('/draw',DrawRouter)
app.use('/normalAnnounce',NormalAnnounceRouter)


app.use("/uploads",express.static('uploads'))
app.use("/admin", AdminRouter);
app.use("/user", UserRouter);
app.use("/packsolde",PackSoldeRouter);
app.use("/auth",LoginRouter);
app.use("/stripe",StripeRouter);


const Enchere=require('./model/Announce/Enchere.model');


cron.schedule('*/30 * * * *', async (req,res)=> {
 const encher= await Enchere.updateMany({"end_Date"  : {$gt : Date.now()}}, { $set: { isVlable: true } } ) 
 io.getIO().emit('posts', { action: 'isUpdated'
});
  
});

const main = async () => {
  try {
  
    const connection = await mongoDbConnect();
    if (connection) {
      console.log("db connecté");
      const server = app.listen(port);
      const io = require('./socket').init(server);
   io.on("connection",socket=>{
      console.log("Client connected")
    })
   
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

main();


/*mongoose
  .connect(
    "mongodb+srv://Reservation:khaled123@cluster0.4mio9.mongodb.net/enchérTn?retryWrites=true&w=majority",  { useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
  }
  )
  .then(result => {
    const server = app.listen(port);
    const io = require('socket.io')(server, {
      cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
      }
  });
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch(err => console.log(err));*/