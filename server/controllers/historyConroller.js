const {HistoryOrder} = require('../models/models')
const ApiError = require('../error/ApiError');

class HistoryConroller {
    async create(req, res) {
        const {info, description} = req.body
        const hist = await HistoryOrder.create({info, description})
        return res.json(hist)
    }

    async getAll(req, res) {
        const hist = await HistoryOrder.findAll()
        return res.json(hist)
    }

}

module.exports = new HistoryConroller()