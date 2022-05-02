// ALL Written by David Hung

const express = require("express")
const router = express.Router()

// Review FEATURE //
// create review
router.post('/', async(req, res) => {
    try {
      const {productid, name, rating, review, date} = req.body
      const newReview = await req.app.get('pool').query("INSERT INTO reviews (productId, name, rating, review, date) VALUES ($1, $2, $3 , $4, $5) RETURNING *", [productid, name, rating, review, date])
      //res.json(newReview)
      console.log('review created')
    } catch (error) {
      console.log(error)
    }
})
  
// get all reviews
router.get('/getreviews/', async(req, res) => {
    try {
        const reviews = await req.app.get('pool').query("SELECT * FROM reviews")
        res.json(reviews.rows)
    } catch (error) {
        console.log(error)
    }
})
  
// get a review
router.get('/getreview/:id', async(req, res) => {
    try {
        const {id} = req.params
        const newReview = await req.app.get('pool').query("SELECT * FROM reviews WHERE productId=$1", [id])
        res.json(newReview.rows)
    } catch (error) {
        console.log(error)
    }
})
  
// update review
router.put('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {productid, name, rating ,review, date} = req.body
        console.log("updatedsdss")
        const updateReview = await req.app.get('pool').query("UPDATE reviews SET productid = $1, name = $2, rating = $3, review = $4, date = $5 WHERE reviewId= $6", [productid, name, rating ,review, date, id])
        console.log("updated review")
    } catch (error) {
        console.log(error)
    }
})
  
// delete a review
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        const deleteReview = await req.app.get('pool').query("DELETE FROM reviews WHERE reviewID = $1", [id])
        console.log("deleted review")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router