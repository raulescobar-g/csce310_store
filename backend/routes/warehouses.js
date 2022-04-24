const express = require('express')
const router = express.Router()


router.get('/', async (req,res) => {
    try {
        const warehouses = await req.app.get('pool').query("SELECT * FROM warehouses", user_id)

    } 
    catch (e) {
        console.log(e)
    }
})


module.exports = router