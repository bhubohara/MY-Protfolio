import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import crypto from "crypto";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, " Email is required"],
  },
  phone: {
    type: String,
    required: [true, " Phone number is required"],
  },
  aboutMe: {
    type: String,
  },

  password: {
    type: String,
    required: [true, " Password is required"],
    minLength: [6, "Password must contain at least 6 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  portfolioURL: {
    type: String,
    // required: true,
  },

  githubURL: {
    type: String,
  },
  instagramURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  linkedInURL: {
    type: String,
  },
  facebookURL: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//register only one user which protfolio belongs to this

//for hashing password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//comparing the bcrypt(hash) password to enter password

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//generate json webtoken

// userSchema.methods.generateJsonWebToken = function (abc) {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

userSchema.methods.generateJsonWebToken = function () {
  const payload = { id: this._id };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = { expiresIn: process.env.JWT_EXPIRES };

  // console.log("Generating JWT with payload:", payload);
  // console.log("Secret Key:", secretKey);
  // console.log("Options:", options);

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

userSchema.methods.getRestPasswordToken = function () {
  const resetToken = crypto.randomBytes(15).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
export const User = mongoose.model("User", userSchema);
