const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    // Price in whole INR for the MVP.
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isFinite,
        message: "Price must be a valid number",
      },
    },

    // Duration must be a multiple of 15 minutes.
    durationMinutes: {
      type: Number,
      required: true,
      min: 15,
      max: 480,
      validate: {
        validator: (value) =>
          Number.isInteger(value) && value % 15 === 0,
        message: "Duration must be a multiple of 15 minutes",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ businessId: 1, isActive: 1 });

module.exports = mongoose.model("Service", serviceSchema);