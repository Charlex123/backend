import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Schema from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "referrals"
    },
    password: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true
    },
    tpin: {
      type: Number,
      required: true
    },
    emailcode: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      required: true
    },
    activated: {
      type: Boolean,
      default: false
    },
    bscwalletaddress: {
      type: String
    },
    bscwalletprivatekey: {
      type: String
    },
    trxwalletaddressbase58: {
      type: String
    },
    trxwalletaddresshex: {
      type: String
    },
    trxwalletprivatekey: {
      type: String
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

export default User;
