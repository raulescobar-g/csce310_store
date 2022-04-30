const express = require("express")
const router = express.Router()
// Written by Zeeshan V

// Returns list of products
router.get('/getproducts', async(req, res) => {
    try {
        console.log("Attempting to get products")

        const products = await req.app.get('pool').query("SELECT * FROM product")
        console.log( products.rows )
        res.json( products.rows )

    } catch (e) {
        console.log(e)
    }
})

// Returns 6 products for new arrivals on landing page
router.get('/getnewproducts', async(req, res) => {
    try {
        console.log("Attempting to get products")

        const products = await req.app.get('pool').query("SELECT * FROM product ORDER BY product_id DESC LIMIT 6")
        console.log( products.rows )
        res.json( products.rows )

    } catch (e) {
        console.log(e)
    }
})

// Returns 4 random products for related products component
router.get('/getrandomproducts', async(req, res) => {
    try {
        console.log("Attempting to get products")

        const products = await req.app.get('pool').query("SELECT * FROM product ORDER BY RAND() LIMIT 4")
        console.log( products.rows )
        res.json( products.rows )

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
        const manufacturer = req.body.manufacturer;
        const imagelink = req.body.image;

        const noNameProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_description=$1 AND product_price=$2 AND product_brand=$3 AND manufacturer=$4 AND imagelink=$5", [desc, price, brand, manufacturer, imagelink])
        const noPriceProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_description=$2 AND product_brand=$3 AND manufacturer=$4 AND imagelink=$5", [name, desc, brand, manufacturer, imagelink])
        const noDescProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_brand=$3 AND manufacturer=$4 AND imagelink=$5", [name, price, brand, manufacturer, imagelink])
        const noBrandProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_description=$3 AND manufacturer=$4 AND imagelink=$5", [name, price, desc, manufacturer, imagelink])
        const noManufacturerProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_description=$3 AND product_brand=$4 AND imagelink=$5", [name, price, desc, brand, imagelink])
        const noImageProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_description=$3 AND manufacturer=$4 AND product_brand=$5", [name, price, desc, manufacturer, brand])

        if ( noNameProducts.rows.length > 0 ) {
            console.log("Updating name of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_name=$4 WHERE product_price=$1 AND product_description=$2 AND product_brand=$3 AND manufacturer=$5 AND imagelink=$6", [price, desc, brand, name, manufacturer, imagelink])
        } else if ( noPriceProducts.rows.length > 0 ) {
            console.log("Updating price of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_price=$4 WHERE product_name=$1 AND product_description=$2 AND product_brand=$3 AND manufacturer=$5 AND imagelink=$6", [name, desc, brand, price, manufacturer, imagelink])
        } else if ( noDescProducts.rows.length > 0 ) {
            console.log("Updating description of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_description=$4 WHERE product_name=$1 AND product_price=$2 AND product_brand=$3 AND manufacturer=$5 AND imagelink=$6", [name, price, brand, desc, manufacturer, imagelink])
        } else if ( noBrandProducts.rows.length > 0 ) {
            console.log("Updating brand of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET product_brand=$4 WHERE product_name=$1 AND product_description=$2 AND product_price=$3 AND manufacturer=$5 AND imagelink=$6", [name, desc, price, brand, manufacturer, imagelink])
        } else if ( noManufacturerProducts.rows.length > 0 ) {
            console.log("Updating manufacturer of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET manufacturer=$4 WHERE product_name=$1 AND product_description=$2 AND product_price=$3 AND product_brand=$5 AND imagelink=$6", [name, desc, price, manufacturer, brand, imagelink])
        } else if ( noImageProducts.rows.length > 0 ) {
            console.log("Updating image of product.")
            const updateProduct = await req.app.get('pool').query("UPDATE product SET imagelink=$4 WHERE product_name=$1 AND product_description=$2 AND product_price=$3 AND product_brand=$5 AND manufacturer=$6", [name, desc, price, imagelink, brand, manufacturer])
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
        const manufacturer = req.body.manufacturer;
        const image = req.body.image;

        // check if product exists, if it does, update it
        const allProducts = await req.app.get('pool').query("SELECT * FROM product WHERE product_name=$1 AND product_price=$2 AND product_brand=$3 AND manufacturer=$4", [name, price, brand, manufacturer])
        if ( allProducts.rows.length == 0 ) {
            console.log("Product does not exist. Creating.")
            const newProduct = await req.app.get('pool').query("INSERT INTO product (product_name, product_description, product_price, product_brand, manufacturer, imagelink) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, desc, price, brand, manufacturer, image])
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