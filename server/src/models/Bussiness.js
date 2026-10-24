const mongoose = require("mongoose");

const BussinessSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an owner ID"],
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
      trim: true,
      default: "asia/Kolkata",
    },
    openingHours: {
      type: String,
      required: [true, "Please provide opening hours"],
      trim: true,
      match: timePattern,
    },
    closingTime: {
      type: String,
      required: true,
      match: timePattern,
    },
    // JavaScript day numbers: Sunday = 0, Saturday = 6.
    workingDays: {
      type: [Number],
      default: [1, 2, 3, 4, 5, 6],
      validate: {
        validator: (days) =>
          days.every((day) => Number.isInteger(day) && day >= 0 && day <= 6) &&
          new Set(days).size === days.length,
        message: "Working days must be unique values between 0 and 6",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bussiness", BussinessSchema);
