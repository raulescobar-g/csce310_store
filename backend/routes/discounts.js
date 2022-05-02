// Written by David Hung

const express = require("express")
const router = express.Router()

// DISCOUNT FEATURE //
// create discount
router.post('/', async(req, res) => {
    try {
      const {code, percent} = req.body
      const newDiscount = await req.app.get('pool').query("INSERT INTO discountcodes (code, percent) VALUES ($1, $2) RETURNING *", [code, percent])
      res.json(newDiscount)                           
    } catch (error) {
      console.log(error)
    }
})
  
// get all discounts
router.get('/getdiscounts', async(req, res) => {
    try {
        const discounts = await req.app.get('pool').query("SELECT * FROM discountcodes")
        res.json(discounts.rows)
        console.log("done getdiscounts")
    } catch (error) {
        console.log(error)
    }
})
  
// get a discount
router.get('/getdiscount/:id', async(req, res) => {
    try {
        const {id} = req.params
        const gotDiscount = await req.app.get('pool').query("SELECT * FROM discountcodes WHERE discountId=$1", [id])
        res.json(gotDiscount.rows)
    } catch (error) {
        console.log(error)
    }
})
  
// update a discount
router.put('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {code, percent} = req.body
        const updateDiscount = await req.app.get('pool').query("UPDATE discountcodes SET code = $1, percent = $2 WHERE discountid= $3", [code, percent, id])
        console.log("updated discount")
    } catch (error) {
        console.log(error)
    }
})
  
// delete a discount
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        const deleteDiscount = await req.app.get('pool').query("DELETE FROM discountcodes WHERE discountID = $1", [id])
        console.log("deleted done")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router