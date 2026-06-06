const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const request = require('request');

const buyers = require('../model/buyshare');
const Shareholders = require('../model/share');

const getNewBuyer = asyncHandler(async (req, res) => {
  const user = await buyers.find();
  res.json(user);
});

const getBuyerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no new buyer found' });
  }

  const share = await buyers.findById(id);

  if (!share) {
    return res.status(404).json({ error: 'no new buyer found' });
  }

  res.json(share);
});

const createNew = asyncHandler(async (req, res) => {

  const {
    firstname,
    middlename,
    lastname,
    country,
    email,
    city,
    subcity,
    wereda,
    password,
    houseNo,
    phoneNo,
    shareamount
  } = req.body;

  console.log("REQUEST BODY:", req.body);

  // ✅ FIXED VALIDATION (trim safe)
  if (
    !firstname?.trim() ||
    !middlename?.trim() ||
    !lastname?.trim() ||
    !country?.trim() ||
    !email?.trim() ||
    !city?.trim() ||
    !subcity?.trim() ||
    !wereda?.trim() ||
    !password?.trim() ||
    !houseNo?.trim() ||
    !phoneNo?.trim() ||
    !shareamount
  ) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  const userExist = await buyers.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exists change your email");
  }

  const shareExist = await Shareholders.findOne({ email });
  if (shareExist) {
    res.status(400);
    throw new Error("shareholder already exists change your email");
  }

  if (shareamount < 1000) {
    res.status(400);
    throw new Error("minimum shareamount should be 1000 birr");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const share = new buyers({
    firstname,
    middlename,
    lastname,
    email,
    password: hashedPassword,
    country,
    city,
    subcity,
    wereda,
    houseNo,
    phoneNo,
    shareamount
  });

  if (req.file) {
    share.image = req.file.path;
  }

  const options = {
    method: 'POST',
    url: 'https://api.chapa.co/v1/transaction/initialize',
    headers: {
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: shareamount,
      currency: "ETB",
      email,
      first_name: firstname,
      last_name: lastname,
      phone_number: phoneNo,
      tx_ref: String(share._id),

      // KEEP YOUR EXISTING URLs (NOT CHANGED)
      callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/transaction`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/buyer_confirm`,

      "customization[title]": "Payment for buying a share",
      "customization[description]": "payments"
    })
  };

  request(options, (error, response) => {

    if (error) {
      console.log("NETWORK ERROR:", error);
      return res.status(500).json({
        error: "network error"
      });
    }

    let result;
    try {
      result = JSON.parse(response.body);
    } catch (e) {
      console.log("PARSE ERROR:", response.body);
      return res.status(500).json({
        error: "invalid chapa response"
      });
    }

    console.log("CHAPA RESPONSE:", result);

    if (
      !result ||
      result.status !== "success" ||
      !result.data ||
      !result.data.checkout_url
    ) {
      return res.status(500).json({
        message: "payment initialization failed",
        response: result
      });
    }

    // ✅ SAVE USER SAFE (NO await inside callback)
    share.save()
      .then(() => {
        console.log("USER SAVED SUCCESSFULLY");

        return res.json({
          message: result.data.checkout_url
        });
      })
      .catch((dbError) => {
        console.log("DB ERROR:", dbError);

        return res.status(500).json({
          message: "user save failed",
          error: dbError.message
        });
      });
  });
});

const deleteNewBuyer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no newbuyer found' });
  }

  const shareholder = await buyers.findById(id);

  if (!shareholder) {
    return res.status(404).json({ error: 'newbuyer not found' });
  }

  await buyers.deleteOne({ _id: id });

  res.json({ id });
});

module.exports = {
  getNewBuyer,
  createNew,
  getBuyerById,
  deleteNewBuyer,
};