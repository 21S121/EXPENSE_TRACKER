const {User} = require('../models/User.js')
const jwt = require('jsonwebtoken')

const secretKey = 'hello'
function generateToken(userDetails) {
    return jwt.sign(userDetails, secretKey)
}

async function validateUser (request, response) {
    try {
        const user = await User.find({"emailID": request.body.emailID, "password": request.body.password})
        if(user.length === 0) { 
            response.status(401).json({
                "status": "failure",
                "message": "user does not exist"
            })
        } else {
            const userDetails = {
                "userName": user[0].userName,
                "emailId": user[0].emailID,
                "userID": user[0]._id.toString()
            }
            const accessToken = generateToken(userDetails)
            response.status(200).json({
                "status": "success",
                "message": "user exists",
                "accessToken": accessToken,
                "userDetails": userDetails
            })
        }
    } catch(error) {
        response.status(500).json({
            "status": "failure",
            "message": "authentication failed",
            "error": error
        })
    }
}

async function createUser(request, response) {
    try {
        const user = await User.find({"emailID": request.body.emailID})
        if(user.length === 0) {
            const user = await User.create({
                "emailID": request.body.emailID,
                "password": request.body.password,
                "userName": request.body.userName
            })
            const userDetails = {
                "userName": user.userName,
                "emailId": user.emailID,
                "userID": user._id.toString()
            }
            const accessToken = generateToken(userDetails)
            response.status(201).json({
                "status": "success",
                "message": "new user created",
                "accessToken": accessToken,
                "userDetails": userDetails
            })
        } else {
            response.status(409).json({
                "status": "failure",
                "message": "user already exist"
            })
        } 
    } catch(error) {
        response.status(500).json({
            "status": "failure",
            "message": "user not created",
            "error": error
        })
    }
}

module.exports = { createUser, validateUser }
