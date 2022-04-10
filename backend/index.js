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

app.get('/', (req, res) => {
  res.send({status:200})
})

//ROUTES//
const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(3000, () => {
  console.log(`Server listening on port ${port}`)
})