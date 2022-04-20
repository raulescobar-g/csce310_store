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

        const user = await req.app.get('pool').query("SELECT * FROM users WHERE email=$1 AND password=$2", [username, password])
        console.log( user.rows );

        if ( user.rows.length > 0 ) {
            console.log( "Logged in user." )
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/tryregister', async(req, res) => {
    try {
        const fname = req.body.fname
        const lname = req.body.lname
        const email = req.body.email
        const password = req.body.password
        const isAdmin = false

        console.log( fname + " " + lname + " " + email + " " + password + " " + isAdmin )

        const curUsers = await req.app.get('pool').query("SELECT * FROM users WHERE email=$1", [email])
        if ( curUsers.rows.length == 0 ) {
            const newUser = await req.app.get('pool').query("INSERT INTO users (firstname, lastname, email, password, isadmin) VALUES ($1, $2, $3, $4, $5)", [fname, lname, email, password, isAdmin])
            console.log("Created new user.")
        } else {
            console.log("User already exists.")
        }

    } catch(e) {
        console.log(e)
    }
})

module.exports = router