// Raul Escobar
const express = require('express')
const router = express.Router()

/** Raul Escobar
 * Receives POST requests from frontend with user_id and product_id
 * 
 * If missing value 
 *      will return 400 status
 * else 
 *      queries for product in cart
 * 
 *      if product not in cart, 
 *          then insert it into cart
 *      else
 *           add 1 to the quantity
 *      
 */
router.post('/', async (req, res) => {
    try {
        
        const { user_id, product_id } = req.body
        if (!user_id || !product_id) {
            res.sendStatus(400)
            return
        }
        
        const cart_item = await req.app.get('pool').query("SELECT * FROM cart WHERE product_id=$1 AND user_id=$2;", [product_id, user_id])
        
        if (cart_item.rows.length === 0){
            const _ = await req.app.get('pool').query("INSERT INTO cart (user_id,product_id,quantity) VALUES ($1, $2, 1);", [user_id, product_id])
            
        } else {
            const __ = await req.app.get('pool').query('UPDATE cart SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id,user_id, cart_item.rows[0].quantity+1])
        }

        const cart_arr = await req.app.get('pool').query("SELECT product.product_id, product_name, product_description, product_price, product_brand,quantity FROM cart JOIN product ON cart.product_id=product.product_id where user_id=$1", [user_id])
        res.send({cart: cart_arr.rows})

    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})


/** Raul Escobar
 * Receives GET requests from frontend with user_id in url 
 * 
 * joins cart with product on product_id 
 * returns list of product info that correspond to user_id in cart
 * 
 */
router.get('/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id
        const cart_arr = await req.app.get('pool').query("SELECT product.product_id, product_name, product_description, product_price, product_brand,quantity FROM cart JOIN product ON cart.product_id=product.product_id where user_id=$1", [user_id])
        res.send({cart: cart_arr.rows})
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})


/** Raul Escobar
 * Receives DELETE requests from frontend with payment_id
 * 
 * If missing value 
 *      will return 400 status
 * else 
 *      will delete cart from database, 
 * 
 *      if nothing was deleted its because nothing was there
 *          returns 400 
 *      else 
 *          returns 200 status
 */
router.delete('/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id
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


/** Raul Escobar
 * Receives PUT requests from frontend user_id , product_id and quantity
 * 
 * query for item in cart that we want to modify
 * if user wants to delete 1 item with quanity 1, 
 *      then we delete the item
 * 
 * if user wants to delete 1 item with quantity greater than 1, 
 *      then we update the item by decrementing the item quantity
 * 
 * is user wants to add 1 item , 
 *      then we simply increment the quantity of that item
 */
router.put('/', async (req, res) => {
    try {
        const { user_id, product_id,  qty} = req.body
        const cart_item = await req.app.get('pool').query("SELECT * FROM cart WHERE product_id=$1 AND user_id=$2;", [product_id, user_id])
        
        if (qty == -1) {
            if (cart_item.rows[0].quantity < 2){
                const result = await req.app.get('pool').query(`DELETE FROM cart WHERE product_id=$1 AND user_id=$2;`, [product_id, user_id])
                if (result.rowCount !== 1) {
                    res.sendStatus(400)
                    return
                }
            } else {
                const result = await req.app.get('pool').query('UPDATE cart SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id, user_id, cart_item.rows[0].quantity-1])
                if (result.rowCount !== 1) {
                    res.sendStatus(400)
                    return
                }
            }
        } else {
            const result = await req.app.get('pool').query('UPDATE cart SET quantity=$3 WHERE user_id=$2 AND product_id=$1;', [product_id,user_id, cart_item.rows[0].quantity+1])
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