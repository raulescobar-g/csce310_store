const express = require("express")
const router = express.Router()

// USER FEATURE //
// create user (not working)
router.post('/', async(req, res) => {
    try {
      const {firstName, lastName, email, password, isAdmin} = req.body
      const newUser = await pool.query("INSERT INTO users (firstName, lastName, email, password) VALUES ('$1', '$2', '$3' , '$4', '$5') RETURNING *", [firstName, lastName, email, password, isAdmin])
      //res.json(newUser)
    } catch (error) {
      console.log(error)
    }
})
  
// get all users
router.get('/getuser/', async(req, res) => {
    try {
        const users = await req.app.get('pool').query("SELECT * FROM users")
        res.json(users.rows)
        //console.log(users.rows)
    } catch (error) {
        console.log(error)
    }
})
  
// get a user 
router.get('/getuser/:id', async(req, res) => {
    try {
        const {id} = req.params
        const newUser = await pool.query("SELECT * FROM users WHERE userId=$1", [id])
        res.json(newUser.rows)
        //console.log(newUser.rows)
    } catch (error) {
        console.log(error)
    }
})
  
// update a users password
router.put('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {newPassword} = req.body
        const updateUser = await pool.query("UPDATE users SET password = $1 WHERE userId= $2", [newPassword, id])
        console.log("updated user")
    } catch (error) {
        console.log(error)
    }
})
  
// delete a user 
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        const deleteUser = await pool.query("DELETE FROM users WHERE userID = $1", [id])
        console.log("deleted user")
    } catch (error) {
        console.log(error)
    }
})

router.post('/trylogin', async(req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        console.log("Attempting to login " + username + " " + password)
        req.app.get('pool').query("SELECT * FROM users WHERE email=$1 AND password=$1", [username, password], function(results) {
            if ( results.length > 0 ) {
                console.log( results.rows )
                res.redirect("/products")
            } else {
                res.send("Incorrect username and/or password")
            }
            res.end()
        });
    } catch (e) {
        console.log(e)
    }
})

module.exports = router