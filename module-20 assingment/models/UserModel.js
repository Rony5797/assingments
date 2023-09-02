const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phoneNumber: { type: String },
});

userSchema.virtual("cartItems", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

// Cascade delete cart items when a user is removed
userSchema.pre("remove", async function (next) {
  await CartItem.deleteMany({ user: this._id });
  next();
});

// Cascade delete orders when a user is removed
userSchema.pre("remove", async function (next) {
  await Order.deleteMany({ user: this._id });
  next();
});

const User = mongoose.model("User", userSchema);
