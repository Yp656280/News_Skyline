const { TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});
const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

const getOtp = async function (req, res) {
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `${req.params.code}${req.params.phone}`,
        channel: "sms",
      });
    res.status(200);
    res.json({ "Otp sent succesfully": `${JSON.stringify(otpResponse)}` });
  } catch (err) {
    res.json({ service: "invalid" });
  }
};

const verifyOtp = async function (req, res) {
  const verifiedResponse = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: `${req.params.code}${req.params.phone}`,
      code: req.params.otp,
    });
  res.status(201);
  res.json(verifiedResponse);
};

module.exports = { getOtp, verifyOtp };
