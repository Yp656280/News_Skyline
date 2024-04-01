const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the username"],
    },
    email: {
      type: String,
      required: [true, "please add the email"],
      unique: [true, "please enter a new email"],
    },
    password: {
      type: String,
      required: [true, "please add the email"],
    },
    phone: {
      type: String,
      required: [true, "please add the phone"],
    },

    isAlive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
