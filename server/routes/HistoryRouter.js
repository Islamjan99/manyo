const Router = require('express')
const router = new Router()
const historyConroller = require('../controllers/historyConroller')
const ErrorHandlingMiddleware = require('../middleware/ErrorHandlingMiddleware')

router.post('/history', historyConroller.postHistory)
router.get('/history', historyConroller.getAll)

module.exports = router

// checkRole('ADMIN'),