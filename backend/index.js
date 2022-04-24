const express = require('express')
const app = express()
const utils = require('./utils')
const cors = require('cors')
const bodyParser = require('body-parser')

//ROUTERS//
const paymentRouter = require('./routes/payment.js')
const userRouter = require('./routes/users')
const productRouter = require('./routes/products.js')
const warehouseRouter = require('./routes/warehouses.js')

const Pool = require('pg').Pool
const pool = new Pool({
  user:         'postgres',
  host:         'database.cqjgso15f4k1.us-east-1.rds.amazonaws.com',
  database:     'project',
  password:     'csce310group8',
  port:         5432,
})

if (process.env.NODE_ENV === 'development') { require('dotenv').config(); }
const port = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT; 


app.use(cors())
app.use(utils.logger)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())


app.set('pool', pool)


//ping
app.get('/', (req, res) => {
  res.send({status:200})
})


//ROUTES//
<<<<<<< HEAD
const userRouter = require('./routes/users')
app.use('/users', userRouter)
app.use('/products', require('./routes/products'))
=======
app.use('/users', userRouter);
app.use('/payment', paymentRouter);
app.use('/products', productRouter);
app.use('/warehouses',warehouseRouter);

>>>>>>> 77c264ce37318cff4db324fc8f41b29f6b9511f0

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})