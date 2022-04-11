import React, { useState } from 'react'
import { Input } from '../components/Input'
import { OrderSummary } from '../components/OrderSummary'
import './payment.css'


export function Payment() {

    const order = {"things" : 1}

    const [cardNum, setCardNum] = useState("")
    const [address, setAddress] = useState("")
    const [cvv , setCvv] = useState("")
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [expDate, setExpDate] = useState("")

    return (
    <div className="main">
        <div className="half">
            <p className="payment-title">Enter payment details:</p>
            <div className="form">
                    <Input id="card-num" type="text" title="Card Number" onChange={e => setCardNum(e.target.value)} value={cardNum} />
                    <Input id="address" type="text" title="Address" onChange={e => setAddress(e.target.value)} value={address} />
                    <Input id="cvv" type="password" title="cvv" onChange={e => setCvv(e.target.value)} value={cvv} />
                    <Input id="fname" type="text" title="First Name" onChange={e => setFname(e.target.value)} value={fname} />
                    <Input id="lname" type="text" title="Last Name" onChange={e => setLname(e.target.value)} value={lname} />
                    <Input id="exp-date" type="date" title="Expiration Date" onChange={e => setExpDate(e.target.value)} value={expDate} />
            </div>
        </div>
        <div className="half">
            <OrderSummary order={order}/>
        </div>
    </div>
        
    )
}