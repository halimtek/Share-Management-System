const express=require('express');
require('dotenv').config() //allows to have .env files
const port=process.env.PORT || 5000;
const bodyParser= require('body-parser');
const mongoose=require('mongoose');
const {errorHandler}=require('./middleware/errorMiddleware');
const app=express();
const cors = require('cors')
mongoose.Promise=global.Promise;
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://at-share-management-system.vercel.app"
  ],
  credentials: true
}));

app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use('/api/share',require('./routes/shareapi'));
app.use('/api/user',require('./routes/userapi'));
app.use('/api/addshareamount',require('./routes/addshare'));
app.use('/api/login',require('./routes/loginapi'));
app.use('/api/adminnews',require('./routes/adminnews'));
app.use('/api/transaction',require('./routes/transaction'));
app.use('/api/selltransaction',require('./routes/selltransaction'));
app.use("/api/calculate-dividend", require("./routes/dividend"));
app.use('/api/buyer',require('./routes/buyers'));
app.use('/api/contactus',require('./routes/contact'));
app.use(errorHandler);
app.all('*', (req,res,next) => {
 res.json({err:"page not found"});
console.log("error");
next();
})



mongoose.connect(process.env.MONGODB_URI).then(()=>{

    app.listen(port,()=>{
        console.log("connected to database");
        console.log(`server is running at port ${port}....`);
    })
});