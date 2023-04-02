const APIResponse = require('../helpers/APIResponse');
const bookingService = require('../services/booking-service');

class BookingController {

    async bookCab(req, res) {
        const { cabId, pickup, destination, email, price } = req.body;

        if (!cabId || !pickup || !destination || !email || !price) {
            return APIResponse.validationError(res, 'Please provide all the required fields')
        }

        try {

            const isCabBooked = await bookingService.isCabBooked({ cabId, pickup, destination });
            if (isCabBooked) {
                return APIResponse.validationError(res, 'Cab already booked for this route')
            }

            const generatedBooking = await bookingService.bookCab(cabId, pickup, destination, email, price);
            APIResponse.successResponseWithData(res, generatedBooking, 'Cab booked successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

    async getAllBookings(req, res) {

        const { email } = req.body;

        try {
            const bookings = await bookingService.getAllBookings({ email });
            APIResponse.successResponseWithData(res, bookings, 'All bookings fetched successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

}

module.exports = new BookingController()