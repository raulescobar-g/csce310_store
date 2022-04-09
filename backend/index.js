const express = require('express')
const app = express()
const utils = require('./utils')
const cors = require('cors')
const bodyParser = require('body-parser')

const Pool = require('pg').Pool
const pool = new Pool({
  user: '',
  host: 'database.cqjgso15f4k1.us-east-1.rds.amazonaws.com',
  database: '',
  password: '',
  port: 5432,
})

if (process.env.NODE_ENV === 'development') { require('dotenv').config(); }
const port = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT; 

app.use(cors())
app.use(utils.logger)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send({status:200})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})