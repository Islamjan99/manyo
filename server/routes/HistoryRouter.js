const Router = require('express')
const router = new Router()
const historyConroller = require('../controllers/historyConroller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/history', historyConroller.create)
router.get('/histor',  historyConroller.getAll)

module.exports = router

// checkRole('ADMIN'),