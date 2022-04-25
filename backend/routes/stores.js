const express = require("express")
const router = express.Router()
// Written by Zeeshan V

// Returns list of stores
router.get('/get', async(req, res) => {
    try {
        console.log("Attempting to get stores")

        const products = await req.app.get('pool').query("SELECT * FROM warehouse")
        console.log( products.rows )

    } catch (e) {
        console.log(e)
    }
})

// Updates product in database
router.post('/update', async(req, res) => {
    try {
        console.log("Attempting to update store")

        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const zip = req.body.zip;

        const noAddressStores = await req.app.get('pool').query("SELECT * FROM warehouse WHERE city=$1 AND state=$2 AND zip=$3", [city, state, zip])
        const noCityStores = await req.app.get('pool').query("SELECT * FROM warehouse WHERE address=$1 AND state=$2 AND zip=$3", [address, state, zip])
        const noStateStores = await req.app.get('pool').query("SELECT * FROM warehouse WHERE address=$1 AND city=$2 AND zip=$3", [address, city, zip])
        const noZipStores = await req.app.get('pool').query("SELECT * FROM warehouse WHERE address=$1 AND city=$2 AND state=$3", [address, city, state])

        if ( noAddressStores.rows.length > 0 ) {
            console.log("Updating address of store.")
            const updateStore = await req.app.get('pool').query("UPDATE warehouse SET address=$4 WHERE city=$1 AND state=$2 AND zip=$3", [city, state, zip, address])
        } else if ( noCityStores.rows.length > 0 ) {
            console.log("Updating city of store.")
            const updateStore = await req.app.get('pool').query("UPDATE warehouse SET city=$4 WHERE address=$1 AND state=$2 AND zip=$3", [address, state, zip, city])
        } else if ( noStateStores.rows.length > 0 ) {
            console.log("Updating state of store.")
            const updateStore = await req.app.get('pool').query("UPDATE warehouse SET state=$4 WHERE address=$1 AND city=$2 AND zip=$3", [address, city, zip, state])
        } else if ( noZipStores.rows.length > 0 ) {
            console.log("Updating zip of store.")
            const updateStore = await req.app.get('pool').query("UPDATE warehouse SET zip=$4 WHERE address=$1 AND city=$2 AND state=$3", [address, city, state, zip])
        } else {
            console.log("No stores available to update");
        }

    } catch (e) {
        console.log(e)
    }
})

// Inserts a store into database
router.post('/add', async(req, res) => {
    try {
        console.log("Attempting to add a new store.")

        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const zip = req.body.zip;

        // check if store exists, if it does, do not create it
        const allStores = await req.app.get('pool').query("SELECT * FROM warehouse WHERE address=$1 AND city=$2 AND state=$3 AND zip=$4", [address, city, state, zip])
        if ( allStores.rows.length == 0 ) {
            console.log("Store does not exist. Creating.")
            const newStore = await req.app.get('pool').query("INSERT INTO warehouse (address, city, state, zip) VALUES ($1, $2, $3, $4) RETURNING *", [address, city, state, zip])
            console.log( newStore.rows )
        }

    } catch (e) {
        console.log(e)
    }
})

// Deletes a store from database
router.post('/delete', async(req, res) => {
    try {
        console.log("Attempting to delete store")

        const id = req.body.id;

        const products = await req.app.get('pool').query("DELETE FROM warehouse WHERE store_id=$1", [id])
    } catch (e) {
        console.log(e)
    }
})

module.exports = router