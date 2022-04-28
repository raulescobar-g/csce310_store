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
router.get('/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id
        const cart_arr = await req.app.get('pool').query("SELECT product.product_id, product_name, product_description, product_price, product_brand,quantity FROM cart JOIN product ON cart.product_id=product.product_id where user_id=$1", [user_id])
        console.log(cart_arr.rows)
        res.send({cart: cart_arr.rows})
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
        const { user_id, product_id,  qty} = req.body
        console.log(product_id)
        console.log(user_id)
        const cart_item = await req.app.get('pool').query("SELECT * FROM cart WHERE product_id=$1 AND user_id=$2;", [product_id, user_id])
        
        if (qty == -1) {
            if (cart_item.rows[0].quantity < 2){
                const result = await req.app.get('pool').query(`DELETE FROM cart WHERE product_id=$1 AND user_id=$2;`, [product_id, user_id])
                if (result.rowCount === 1) {
                    res.sendStatus(200)
                    return
                }
                else {
                    res.sendStatus(400)
                    return
                }
            }
            else {
                const result = await req.app.get('pool').query('UPDATE cart SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id, user_id, cart_item.rows[0].quantity-1])
                if (result.rowCount === 1) {
                    res.sendStatus(200)
                    return
                }
                else {
                    res.sendStatus(400)
                    return
                }
            }
        } 
        console.log(cart_item.rows)
        const result = await req.app.get('pool').query('UPDATE cart SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id,user_id, cart_item.rows[0].quantity+1])
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

module.exports = router