const express = require('express')
const app = express()
const utils = require('./utils')
const cors = require('cors')
const bodyParser = require('body-parser')

const Pool = require('pg').Pool
const pool = new Pool({

  user: 'postgres',
  host: 'database.cqjgso15f4k1.us-east-1.rds.amazonaws.com',
  database: 'project',
  password: 'csce310group8',
  port: 5432,
})

if (process.env.NODE_ENV === 'development') { require('dotenv').config(); }
const port = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT; 

app.use(cors())
app.use(utils.logger)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())

//ROUTES//
// USER FEATURE //
// create user (not working)
app.post('/users', async(req, res) => {
  try {
    const {firstName, lastName, email, password, isAdmin} = req.body
    const newUser = await pool.query("INSERT INTO users (firstName, lastName, email, password) VALUES ('$1', '$2', '$3' , '$4', '$5') RETURNING *", [firstName, lastName, email, password, isAdmin])
    res.json(newUser)
  } catch (error) {
    console.log(error)
  }
})

// get all users (working)
app.get('/users', async(req, res) => {
  try {
    const newUser = await pool.query("SELECT * FROM users")
    res.json(newUser.rows)
    //console.log(newUser.rows)
  } catch (error) {
    console.log(error)
  }
})

app.get('/', (req, res) => {
  res.send({status:200})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})