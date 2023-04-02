const Booking = require('../models/booking-model');

class BookingService {

    async bookCab(cabId, pickup, destination, email, price) {
        const generatedBooking = await Booking.create({ cabId, pickup, destination, email, price })
        return generatedBooking;
    }

    async getAllBookings(data) {
        const bookings = await Booking.find(data).populate('cabId');
        return bookings;
    }

    async isCabBooked({ cabId, pickup, destination }) {
        const bookings = await Booking.find({ cabId, pickup, destination });
        return bookings.length > 0 ? true : false;
    }
}



module.exports = new BookingService();