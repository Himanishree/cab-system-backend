const APIResponse = require('../helpers/APIResponse')
const cabServices = require('../services/cab-service');

class UserController {

    async sendAvailableCab(req, res) {
        const { pickup, destination, email } = req.body;

        try {
            const path = cabServices.getShortestDistance(pickup, destination);
            const totalTime = cabServices.getShortestPathWeight(pickup, destination);

            APIResponse.successResponseWithData(res, { shortestPath: path, totalTime: totalTime });
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

}

module.exports = new UserController()