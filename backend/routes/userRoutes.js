const express = require('express')
const { createUser, validateUser } = require('../controllers/userControllers.js')

const router = express.Router()

router.post('/new', createUser)
router.post('/login', validateUser)

module.exports = router
