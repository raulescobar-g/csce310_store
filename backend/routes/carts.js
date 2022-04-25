// Raul Escobar
const express = require('express')
const router = express.Router()

/**
 * Receives POST requests from frontend with user_id and product_id
 * If missing value will return 400 status
 * else will insert into db and if row inserted, then return 200 else return 400
 */
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { user_id, product_id } = req.body
        if (!user_id || !product_id) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`INSERT INTO cart (user_id,product_id,quantity) VALUES ($1, $2, 1));`, [user_id, product_id])
        if (result.rowCount === 1) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})


/**
 * Receives GET requests from frontend with user_id in body
 * joins cart with product on product_id and returns list items that are not bought
 * If missing value will return 400 status
 * else will query for payment methods associated to user and returns that array
 */
router.get('/', async (req, res) => {
    try {
        const user_id = req.body.user_id
        const cart_arr = await req.app.get('pool').query("SELECT product_name, product_description, product_price, product_brand,quantity FROM cart JOIN product ON cart.product_id=product.product_id", [user_id])
        res.send({cart: cart_arr})
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})


/**
 * Receives DELETE requests from frontend with payment_id
 * If missing value will return 400 status
 * else will delete from database, if nothing was deleted its because nothing was there and returns 400 else returns 200 status
 */
router.delete('/', async (req, res) => {
    try {
        const { user_id } = req.body
        if (!user_id) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`DELETE FROM cart WHERE user_id=$1;`, [user_id])
        if (result.rowCount === 1) {
            res.sendStatus(200)
        }
        else {
            res.sendStatus(400)
        }
    }
    catch (e) {
        console.log(e)
    }
})


/**
 * Receives PUT requests from frontend with values
 * If missing value will return 400 status
 * else will update row with new values
 */
router.put('/', async (req, res) => {
    try {
        const { user_id, product_id,  } = req.body
        const values = [user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip, payment_id]
        if (values.filter(val => !val).length > 0) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`UPDATE payment_method 
            SET (user_id,card_type,card_number,card_expiration_month,card_expiration_year,card_cvv,cardholder_firstname,cardholder_lastname,billing_address_one,billing_address_city,billing_address_state,billing_address_zip)=($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            WHERE payment_id=$13;`, values)
        if (result.rowCount === 1) {
            res.sendStatus(200)
        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router