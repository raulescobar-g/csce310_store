const express = require("express")
const router = express.Router()
// Written by Zeeshan V

// Returns list of products
router.get('/getproducts', async(req, res) => {
    try {
        console.log("Attempting to get products")

        const products = await req.app.get('pool').query("SELECT * FROM product")
        console.log( products.rows )

    } catch (e) {
        console.log(e)
    }
})

// Updates product in database
router.post('/updateproduct', async(req, res) => {
    try {
        console.log("Attempting to update product")

        const name = req.body.name;
        const price = req.body.price;
        const desc = req.body.desc;
        const brand = req.body.brand;

        const noNameProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_description=$1 AND product_price=$2 AND product_brand=$3", [desc, price, brand])
        const noPriceProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_description=$2 AND product_brand=$3", [name, desc, brand])
        const noDescProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_brand=$3", [name, price, brand])
        const noBrandProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_description=$3", [name, price, desc])

        if ( noNameProducts.rows.length > 0 ) {
            console.log("Updating name of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_name=$4 WHERE product_price=$1 AND product_description=$2 AND product_brand=$3", [price, desc, brand, name])
        } else if ( noPriceProducts.rows.length > 0 ) {
            console.log("Updating price of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_price=$4 WHERE product_name=$1 AND product_description=$2 AND product_brand=$3", [name, desc, brand, price])
        } else if ( noDescProducts.rows.length > 0 ) {
            console.log("Updating description of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_description=$4 WHERE product_name=$1 AND product_price=$2 AND product_brand=$3", [name, price, brand, desc])
        } else if ( noBrandProducts.rows.length > 0 ) {
            console.log("Updating brand of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_brand=$4 WHERE product_name=$1 AND product_description=$2 AND product_price=$3", [name, desc, price, brand])
        } else {
            console.log("No products available to update");
        }

    } catch (e) {
        console.log(e)
    }
})

// Inserts a product into database
router.post('/addproduct', async(req, res) => {
    try {
        console.log("Attempting to add a new product.")

        const name = req.body.name;
        const price = req.body.price;
        const desc = req.body.desc;
        const brand = req.body.brand;

        // check if product exists, if it does, update it
        const allProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_brand=$3", [name, price, brand])
        if ( allProducts.rows.length == 0 ) {
            console.log("Product does not exist. Creating.")
            const newProduct = await req.app.get('pool').query("INSERT INTO product (product_name, product_description, product_price, product_brand) VALUES ($1, $2, $3, $4) RETURNING *", [name, desc, price, brand])
            console.log( newProduct.rows )
        }

    } catch (e) {
        console.log(e)
    }
})

// Deletes a product from database
router.post('/deleteproduct', async(req, res) => {
    try {
        console.log("Attempting to delete product")

        const id = req.body.id;

        const products = await req.app.get('pool').query("DELETE FROM product WHERE product_id=$1", [id])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router