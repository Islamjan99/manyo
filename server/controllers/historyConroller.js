const {History} = require('../models/models')
const ApiError = require('../error/ApiError');

class HistoryConroller {
    async postHistory(req, res, next) {
        try {

            const {userId, info, date, userName, userEmail, userAddress, userPhone, OrderNumber} = req.body
            const history = await History.create({userId, info, date, userName, userEmail, userAddress, userPhone, OrderNumber});
            return res.json(history)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const hist = await History.findAll()
        return res.json(hist)
    }

}

module.exports = new HistoryConroller()