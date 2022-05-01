const express = require("express")
const router = express.Router()

// Review FEATURE //
// create review
router.post('/', async(req, res) => {
    try {
      const {productid, name, rating, review, date} = req.body
      console.log(productid, name)
      const newReview = await req.app.get('pool').query("INSERT INTO reviews (productId, name, rating, review, date) VALUES ($1, $2, $3 , $4, $5) RETURNING *", [productid, name, rating, review, date])
      //res.json(newReview)
    } catch (error) {
      console.log(error)
    }
})
  
// get all reviews
router.get('/getreviews/', async(req, res) => {
    try {
        const reviews = await req.app.get('pool').query("SELECT * FROM reviews")
        res.json(reviews.rows)
        //console.log(users.rows)
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
  
// update a users information
router.put('/updatereview/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {newFirstname, newLastname, newEmail, newPassword} = req.body
        const updateUser = await req.app.get('pool').query("UPDATE reviews SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE userId= $5", [newFirstname, newLastname, newEmail, newPassword, id])
        console.log("updated user")
    } catch (error) {
        console.log(error)
    }
})

// update a users password
router.put('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {newPassword} = req.body
        const updateUser = await req.app.get('pool').query("UPDATE users SET password = $1 WHERE userId= $2", [newPassword, id])
        console.log("updated user")
    } catch (error) {
        console.log(error)
    }
})
  
// delete a user 
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        const deleteReview = await req.app.get('pool').query("DELETE FROM reviews WHERE reviewID = $1", [id])
        console.log("deleted user")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router