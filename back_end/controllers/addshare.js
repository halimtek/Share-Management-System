const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const request = require('request');
const oldshareholder = require('../model/shareamount');
const Shareholders = require('../model/share');
const createShare=asyncHandler(async(req,res)=>{
  const {firstname,email,lastname,shareamount,middlename,phoneNo}=req.body;
  if(!firstname || !middlename || !lastname || !phoneNo|| !email || !shareamount){
    res.status(404);
    throw new Error("please fill all fields");
  }
  const shareholder=await Shareholders.findOne({email});
  if(!shareholder){
    res.status(404);
    throw new Error("shareholder dosenot exists");
  }  
  if(shareamount < 1000){
    res.status(404);
    throw new Error("minimum shareamount should be 1000 birr");
  }
  let share=new  oldshareholder({
    firstname,
    middlename,
    lastname,
    phoneNo,
    email,
    shareamount,
});
let options = {
'method': 'POST',
'url': 'https://api.chapa.co/v1/transaction/initialize',
'headers': {
  'Authorization': `Bearer ${process.env.Secret_key}`,
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  "amount": req.body.shareamount,
  "currency": "ETB",
  "email":req.body.email,
  "first_name": req.body.firstname,
  "last_name": req.body.lastname,
  "phone_number": req.body.phoneNo,
  "tx_ref": share._id,
  "callback_url": `${process.env.NEXT_PUBLIC_API_URL}/api/selltransaction`,
  "return_url": `${process.env.NEXT_PUBLIC_API_URL}/shareholder/confirm`,
  "customization[title]": "Payment for a share ",
  "customization[description]": "payments"
})
};
try {
  request(options, async function (error, response) {
  if (error){
    return  res.json({
    error:"something were wrong please cheak ur internet connection"
  });}
   const result=await JSON.parse(response.body);
  res.json({
    message:result.data.checkout_url
  })
  shareholder.shareamount*=shareamount;
  shareholder.save().then(async(response)=>{
    console.log("saved");
  })
  share.save().then(async(response)=>{
    console.log("saved");
  })
    .catch(error=>{
    console.log(error)
    res.json({
      message:"error"
    })
  })
  });
} catch (error) {
  console.log(error)
}
})
const getoldshareholders=asyncHandler(async(req,res)=>{
  const share=await oldshareholder.find();
  if(!share){
    res.status(500)
    throw new Error('cannot fetch a shareholder')
  }
  res.status(200).json(share);
})
const getShareholderById=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no new buyer found'})
      }
      const share=await oldshareholder.findById({_id:id});
      if(share){
       res.json(share);
      }
})
const deleteShare=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no shareholder found'})
  }
  const shareholder = await oldshareholder.findById(id)
  if (!shareholder) {
    res.status(400)
    throw new Error('shareholder not found');
  }
  await oldshareholder.deleteOne({_id:id})
  res.status(200).json({ id:id })
})
module.exports={
    createShare,
    getoldshareholders,
    getShareholderById,
    deleteShare
}

