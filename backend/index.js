const express = require('express')
const app = express()
const utils = require('./utils')
const cors = require('cors')
const bodyParser = require('body-parser')

const Pool = require('pg').Pool
const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
})

if (process.env.NODE_ENV === 'development') { require('dotenv').config(); }
const port = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT; // heroku sets a PORT to env so dont change this or ask raul

app.use(cors())
app.use(utils.logger)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send({status:200})
})

app.listen(port, () => {
  console.log(`Back end listening on port ${port}`)
})