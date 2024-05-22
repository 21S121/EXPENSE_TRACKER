/**
 * git clone <link>
 * 
 * git add .
 * git commit -m "message"
 * git push
 * 
 * git config --global user.name '<github username>'
 * git config --global user.email <github emailID>
 */

/**
 * Functionalities of the application
 * End points
 * Express application
 * DB connection
 * Schema definition and creating a model
 */

/**
 * CRUD operations
 * adding a new expense -> /add-expense (post)
 * view existing ones -> /get-expenses (get)
 * edit existing entries -> /update-expense (patch)
 * deleting entries -> /delete-expense (delete)
 * 
 * adding a new user -> /add-user (post)
 * validating existing user -> /validate-user (post)
 * 
 * monthly analysis
 */

/**
 * Database - Expense Tracker
 * Collections
 *      i) ExpenseDetails
 *          - amount (number)
 *          - category (string)
 *          - date (string)
 *      ii) UserDetails
 *          - username
 *          - emailID
 *          - password
 */

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const expenseRoutes = require('./routes/expenseRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/expense', expenseRoutes)
app.use('/user', userRoutes)

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://kavin:150724@cluster0.untdbt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established :)")

        const port = process.env.PORT || 7000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish DB connection :(')
    }
}
connectToDb()
