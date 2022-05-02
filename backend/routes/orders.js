
const express = require('express')
const router = express.Router()

/**
 * Receives POST requests from frontend with user_id and product_id
 * If missing value will return 400 status
 * else will insert into db and if row inserted, then return 200 else return 400
 */
router.post('/addorder', async (req, res) => {
    try {
        console.log("attempting to add to history")
     
        
        const { payment_id, user_id, product_id, history_id, discount_id } = req.body
        if (!user_id || !product_id || !payment_id || !history_id || !discount_id) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`INSERT INTO order_history (payment_id, user_id, product_id, discount_id, history_id, quantity,  order_num) VALUES ($1, $2, $3, $4, 1, 2, 3, 4));`, [payment_id, user_id, product_id, discount_id])
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
 * joins order_history with cart on product_id and returns list items
 * If missing value will return 400 status
 * else will query for payment methods associated to user and returns that array
 */
//?
router.get('/', async (req, res) => {
    try {
        const user_id = req.body.user_id
        const history_arr = await req.app.get('pool').query("SELECT payment_id, user_id, quantity FROM payment JOIN cart ON order_history.cart_id=cart.cart_id where user_id=$1", [user_id])
        res.send({history: history_arr})
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
        const result = await req.app.get('pool').query(`DELETE FROM order_history WHERE user_id=$1;`, [user_id])
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
        const order_number = await req.app.get('pool').query("SELECT * FROM order_history WHERE product_id=$1 AND user_id=$2;", [product_id, user_id])
        
        if (qty == -1) {
            if (order_number.rows[0].quantity < 2){
                const result = await req.app.get('pool').query(`DELETE FROM order_history WHERE product_id=$1 AND user_id=$2;`, [product_id, user_id])
                if (result.rowCount !== 1) {
                    res.sendStatus(400)
                    return
                }
            } else {
                const result = await req.app.get('pool').query('UPDATE order_history SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id, user_id, order_number.rows[0].quantity-1])
                if (result.rowCount !== 1) {
                    res.sendStatus(400)
                    return
                }
            }
        } else {
            const result = await req.app.get('pool').query('UPDATE order_history SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id,user_id, order_number.rows[0].quantity+1])
            if (result.rowCount !== 1) {
                res.sendStatus(400)
                return
            }
        }
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router