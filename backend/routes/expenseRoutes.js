const express = require('express')
const jwt = require('jsonwebtoken')
const { addNewExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseControllers.js')

const router = express.Router()

const secretKey = 'hello'
function authenticateToken(request, response, next) {
    next()
    // const authHeader = request.headers.authorization
    // const accessToken = authHeader && authHeader.split(' ')[1]
    // if(accessToken) {
    //     jwt.verify(accessToken, secretKey, (error, userDetails) => {
    //         if(error) {
    //             response.status(403).json({
    //                 "status": "failure",
    //                 "message": "access denied"
    //             })
    //         } else {
    //             next()
    //         }
    //     })
    // } else {
    //     response.status(401).json({
    //         "status": "failure",
    //         "message": "access denied"
    //     })
    // }
}

router.post('/new/:userID', authenticateToken, addNewExpense)
router.get('/all/:userID', authenticateToken, getExpenses)
router.delete('/delete/:id', authenticateToken, deleteExpense)
router.patch('/update/:id', authenticateToken, updateExpense)

module.exports = router
