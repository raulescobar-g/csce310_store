const express = require("express")
const router = express.Router()

router.get('/getproducts', async(req, res) => {
    try {
        console.log("Attempting to get products")

        const products = await req.app.get('pool').query("SELECT * FROM products")
        console.log( products.rows );
    } catch (e) {
        console.log(e)
    }
})

router.post('/addproduct', async(req, res) => {
    try {
        console.log("Attempting to add a new product.")

        const newProduct = await req.app.get('pool').query("INSERT INTO products () VALUES () RETURNING *")
        console.log( newProduct.rows )
    } catch (e) {
        console.log(e)
    }
})

module.exports = router