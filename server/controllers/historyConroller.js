const {History} = require('../models/models')
const ApiError = require('../error/ApiError');

class HistoryConroller {
    async create(req, res) {
        const {userId, info, date, userName, userEmail, userAddress, userPhone} = req.body
        const hist = await History.create({userId, info, date, userName, userEmail, userAddress, userPhone})
        return res.json(hist)
    }

    async getAll(req, res) {
        const hist = await History.findAll()
        return res.json(hist)
    }

}

module.exports = new HistoryConroller()