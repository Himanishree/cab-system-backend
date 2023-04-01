const Booking = require('../models/booking-model');

class BookingService {

    async bookCab(cabId, pickup, destination, email, price) {
        const generatedBooking = await Booking.create({ cabId, pickup, destination, email, price })
        return generatedBooking;
    }
}



module.exports = new BookingService();