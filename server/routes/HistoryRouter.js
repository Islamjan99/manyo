const Router = require('express')
const router = new Router()
const historyConroller = require('../controllers/historyConroller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/histor', historyConroller.create)
router.get('/history',  historyConroller.getAll)

module.exports = router

// checkRole('ADMIN'),