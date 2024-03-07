const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@acess public.

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, phone } = req.body;
  if (!username || !email || !password || !phone) {
    res.status(404);
    throw new Error("all feilds are mandatory");
  }
  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registerd");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
  });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, email: user.email, phone: user.phone });
    // console.log("user created ", user);
  } else {
    res.status(400);
    throw new Error("user not created");
  }

  res.json({ message: "register user" });
});

//@desc login a user
//@route POST /api/users/login
//@acess public.

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("all feilds are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const acessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ acessToken });
  } else {
    res.status(400);
    throw new Error("Credentials are incorrect");
  }
});

//@desc current user
//@route GET /api/users/current
//@acess private.

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
