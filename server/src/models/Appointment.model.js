const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    bussinessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bussiness",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    // hisory of service for won't rewrite old Bookings
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    priceAtBooking: {
      type: Number,
      required: true,
      min: 0,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 15,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 15,
    },

    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    // Business-local date in YYYY-MM-DD format.
    bussinessDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    cancellationReason: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "Sorry, we had to cancel your appointment.",
    },
  },
  { timestamps: true },
);

// validate appointment interval

appointmentSchema.pre("validate", function () {
  if (this.startAt && this.endAt && this.endAt <= this.startAt) {
    this.invalidate("endAt", "End time must be after start time");
  }
});

// common dashboard queries
appointmentSchema.index({ bussinessId: 1, startAt: 1 });
appointmentSchema.index({
  bussinessId: 1,
  startAt: 1,
  status: 1,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
