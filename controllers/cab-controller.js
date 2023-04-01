const APIResponse = require('../helpers/APIResponse')
const cabServices = require('../services/cab-service');
const Cab = require('../models/cab-model');

class CabController {

    async addCab(req, res) {
        const { cab, driver, pricePerMinute, rating, avatar } = req.body;

        if (!cab || !driver || !pricePerMinute || !rating || !avatar) {
            return APIResponse.validationError(res, 'Please provide all the required fields')
        }

        try {
            const generatedCab = await cabServices.addCab(cab, driver, pricePerMinute, rating, avatar);
            APIResponse.successResponseWithData(res, generatedCab, 'Cab added successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

    async sendAvailableCab(req, res) {
        const { pickup, destination, email } = req.body;

        if (!pickup || !destination || !email) {
            return APIResponse.validationError(res, 'Please provide all the required fields')
        }

        try {
            const path = cabServices.getShortestDistance(pickup, destination);
            const totalTime = cabServices.getShortestPathWeight(pickup, destination);
            const cabList = await cabServices.getAllCabs();

            APIResponse.successResponseWithData(res, { shortestPath: path, totalTime: totalTime, cabList: cabList }, 'Cab list sent successfully');
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

}

module.exports = new CabController()