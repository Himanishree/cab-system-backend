const mongoose = require("mongoose");

const CabSchema = new mongoose.Schema(
    {
        cab: { type: String },
        driver: { type: String },
        pricePerMinute: { type: Number },
        rating: { type: Number },
        avatar: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cab", CabSchema);