const mongoose = require("mongoose");
const slotReservationSchema = new mongoose.Schema(
  {
    bussinessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bussiness",
      required: true,
    },
    // starts the  15min interval.
    slotStartAt: {
      type: Date,
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
  },
  { timestamps: true },
);

// a business cannot reserve the same interval twice.
slotReservationSchema.index(
  { bussinessId: 1, slotStartAt: 1 },
  { unique: true },
);

//find and release all reservations for a cancelled appointment.
slotReservationSchema.index({ appointmentId: 1 });

module.exports = mongoose.model("slotReservation", slotReservationSchema);
