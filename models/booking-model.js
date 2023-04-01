const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab' },
        pickup: { type: String },
        destination: { type: String },
        email: { type: String },
        price: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);