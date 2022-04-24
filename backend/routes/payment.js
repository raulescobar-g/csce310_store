const express = require('express')
const router = express.Router()


router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip } = req.body
        const values = [user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip]
        if (values.filter(val => !val).length > 0) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`INSERT INTO payment_method(user_id,card_type,card_number,card_expiration_month,card_expiration_year,card_cvv,cardholder_firstname,cardholder_lastname,billing_address_one,billing_address_city,billing_address_state,billing_address_zip) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`, values)
        if (result.rowCount === 1) {
            res.sendStatus(200)
        }
    }
    catch (e) {
        console.log(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const user_id = req.body.user_id
        const paymentMethods = await req.app.get('pool').query("SELECT * FROM payment_method WHERE user_id=$1", user_id)
        res.send({methods: paymentMethods})
    }
    catch (e) {
        console.log(e)
    }
})

router.delete('/', async (req, res) => {
    try {
        const { user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip } = req.body
        const values = [user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip]
        if (values.filter(val => !val).length > 0) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`DELETE FROM payment_method WHERE user_id=$1, card_type=$2, card_number=$3, card_expiration_month=$4, card_expiration_year=$5, card_cvv=$6 ,cardholder_firstname=$7, cardholder_lastname=$8, billing_address_one=$9, billing_address_city=$10, billing_address_state=$11, billing_address_zip=$12;`, values)
        if (result.rowCount === 1) {
            res.sendStatus(200)
        }
    }
    catch (e) {
        console.log(e)
    }
})

router.put('/', async (req, res) => {
    try {
        console.log(req.body)
        const { user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip,payment_id } = req.body
        const values = [user_id,cardType,cardNum,expMonth,expYear,cvv,fname,lname,address,city,state,zip, payment_id]
        if (values.filter(val => !val).length > 0) {
            res.sendStatus(400)
            return
        }
        const result = await req.app.get('pool').query(`UPDATE payment_method 
            SET (user_id,card_type,card_number,card_expiration_month,card_expiration_year,card_cvv,cardholder_firstname,cardholder_lastname,billing_address_one,billing_address_city,billing_address_state,billing_address_zip)=($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            WHERE payment_id=$13;`, values)
        if (result.rowCount === 1) {
            res.sendStatus(200)
        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router