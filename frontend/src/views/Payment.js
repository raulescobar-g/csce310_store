// Raul Escobar
import React, { useEffect, useState } from 'react'
import { InputBox } from '../components/Input'
import { Select } from '../components/Select'
import styled from 'styled-components'
import { getFromStorage } from '../utils/localStorage'
import { useNavigate  } from 'react-router-dom'


// styling components
const Main = styled.div`
    display:flex;
    flex-direction: row;
    height: calc(100vh - 7rem);
    margin-top: 3.5rem;
    justify-content: center;
`

// styling components
const Column = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`
// styling components
const Even = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
`

// styling components
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 10px;
    border: 1px solid lightgrey;
    margin-bottom: 1rem;
    padding: 1rem;
`

// styling components
const Button = styled.button`
    padding:0.3rem;
    background: lightgrey;
    margin-right:0.5rem;
`
const Col = styled.div`
    justify-content: space-around;
    padding-right: 1rem;
`
const Coly = styled.div`
    justify-content: space-around;
    padding-right: 1rem;
    width:20%;
`

// main components
export function Payment({cart, setCart}) {
    const navigate = useNavigate()

    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    const years = [22,23,24,25,26,27,28,29,30]

    // state management for input boxes
    const [cardNum, setCardNum] = useState();
    const [cardType, setCardType] = useState();
    const [address, setAddress] = useState();
    const [zip, setZip] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [cvv , setCvv] = useState()
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [expMonth, setExpMonth] = useState();
    const [expYear, setExpYear] = useState()
    const [user_id, setUserId] = useState();
    const [paymentId, setPaymentId] = useState()
    const [discount, setDiscount] = useState()

    // pseudo-router
    const [display, setDisplay] = useState(0);

    const [paymentMethods, setPaymentMethods] = useState([])

    const cardTypeOptions = ["AMEX","VISA","Master Card","Other"]

    // function that refetches user payments, and sets state
    const refresh = async () => {
        const res = await fetch(`http://localhost:5000/payments/${user_id}`)
        const data = await res.json()
        setPaymentMethods(data.methods)
    }

    // function that resets input box states to emtpy
    const reset = () => {
        setCardNum("")
        setCardType("")
        setAddress("")
        setZip("")
        setCity("")
        setState("")
        setCvv("")
        setFname("")
        setLname("")
        setExpMonth("")
        setExpYear("")
        setPaymentId("")
    }

    // function that posts a new payment method on button click
    const handleSubmit = async () => {
        try{
            const data = {"cardNum":cardNum, "cardType":cardType, "address":address, "zip":zip, "city":city, "state":state, "cvv":cvv, "fname":fname, "lname":lname, "expMonth":expMonth, "expYear":expYear, "user_id":user_id}
            const options = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }
            const _ = await fetch(`http://localhost:5000/payments/`, options); 
            setDisplay(0)
            reset()
            refresh()
        }
        catch (e) {
            console.log(e)
        }
    }

    // react built in function that runs on every refresh
    useEffect(() => {
        setUserId(getFromStorage('user_id'))
        refresh()
    }, [display, user_id])

    // routes back to display 0
    const goBack = () => {
        refresh()
        setDisplay(0)
    }

    // routes to display 1
    const addPayment = () => {
        setDisplay(1)
    }

    // function that sets state of input boxes and redirects to display 2
    const editPaymentMethod = async (e) => {

        const editPm = paymentMethods.find(pm =>  pm.payment_id === e.target.id)
        setDisplay(2)
        setAddress(editPm.billing_address_one)
        setCardNum(editPm.card_number)
        setCardType(editPm.card_type)
        setState(editPm.billing_address_state)
        setCity(editPm.billing_address_city)
        setCvv(editPm.card_cvv)
        setExpMonth(editPm.card_expiration_month)
        setExpYear(editPm.card_expiration_year)
        setFname(editPm.cardholder_firstname)
        setLname(editPm.cardholder_lastname)
        setZip(editPm.billing_address_zip)
        setPaymentId(editPm.payment_id)
    }

    // method that sends delete request to backend on click
    const deletePaymentMethod = async (e) => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({payment_id:e.target.id})
        }
        const _ = await fetch(`http://localhost:5000/payments/`, options); 
        refresh()
    }

    // mthod that sends update request for payment method on click
    const handleUpdate = async () => {
        const data = {"cardNum":cardNum, "cardType":cardType, "address":address, "zip":zip, "city":city, "state":state, "cvv":cvv, "fname":fname, "lname":lname, "expMonth":expMonth, "expYear":expYear, "user_id":user_id,"payment_id":paymentId}
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }
        const _ = await fetch(`http://localhost:5000/payments/`, options);
        setDisplay(0)
        await refresh()
        reset()
    }

    // redirects to display 3 with payment method selected
    const payPaymentMethod = (e) => {
        const editPm = paymentMethods.find(pm =>  pm.payment_id == e.target.id)
        setDisplay(3)
        setAddress(editPm.billing_address_one)
        setCardNum(editPm.card_number)
        setCardType(editPm.card_type)
        setState(editPm.billing_address_state)
        setCity(editPm.billing_address_city)
        setCvv(editPm.card_cvv)
        setExpMonth(editPm.card_expiration_month)
        setExpYear(editPm.card_expiration_year)
        setFname(editPm.cardholder_firstname)
        setLname(editPm.cardholder_lastname)
        setZip(editPm.billing_address_zip)
        setPaymentId(editPm.payment_id)
    }

    // buy now posts to payment history, but that route was never completed
    const buyNow = async () => {
        const data = {}
        const options = {
            method: 'POST',
            body: JSON.stringify(data)
        }
        // const _ = await fetch(`http://localhost:5000/history/`, options);
        // const __ = await fetch(`http://localhost:5000/carts/${user_id}`, {method:"DELETE"})
    }

    // navigate to products page
    const goToProducts = () => {
        navigate('/products')
    }

    // react render components
    return (
        <Main>
            {display===0 && 
            <Column>
                <div>Payment Methods Available</div>
                <div>

                    {paymentMethods.length > 0 ?
                        <>
                            <Row>
                                <Col>Carholder Name</Col>
                                <Col>Card Number</Col>
                                <Col>Card Expiration Date</Col>
                                <Col>Card Type</Col>
                                <Col>Edit/Delete/Select</Col>
                            </Row>
                        
                            {paymentMethods.map(paymeth => {
                                return (
                                    <Row>
                                        <Col>{paymeth.cardholder_firstname} {paymeth.cardholder_lastname}</Col>
                                        <Col>{paymeth.card_number}</Col>
                                        <Col>{paymeth.card_expiration_month}/{paymeth.card_expiration_year}</Col>
                                        <Col>{paymeth.card_type}</Col>
                                        <Col>
                                            <Button id={paymeth.payment_id} onClick={editPaymentMethod}>Edit</Button>
                                            <Button id={paymeth.payment_id} onClick={deletePaymentMethod}>Delete</Button>
                                            <Button id={paymeth.payment_id} onClick={payPaymentMethod}>Select</Button>
                                        </Col>
                                    </Row>
                                )
                            }) }
                        </> :
                        <>
                            <p>You have no payment methods yet</p>
                            
                        </>
                    }
                    <Button onClick={addPayment}>Add payment method</Button>
                    <Button onClick={goToProducts}>Go back to products</Button>
                </div>
            </Column>}
            {display===1 && 
            <Column>
                <div>
                    <Row>
                        <InputBox id="fname" type="text" title="First Name" onChange={e => setFname(e.target.value)} value={fname} />
                        <InputBox id="lname" type="text" title="Last Name" onChange={e => setLname(e.target.value)} value={lname} />
                    </Row>
                    
                    <Row>
                        <InputBox id="card-num" type="text" title="Card Number" onChange={e => setCardNum(e.target.value)} value={cardNum} />
                        <Even>
                            <Select title="Type" id="card-type" options={cardTypeOptions} value={cardType} onSelect={e => setCardType(e.target.value)} />
                            <InputBox id="cvv" type="password" title="cvv" onChange={e => setCvv(e.target.value)} value={cvv} />
                            <Select title="Month" id="mm" options={months} value={expMonth} onSelect={e => setExpMonth(e.target.value)} />
                            <Select title="Year" id="yy" options={years} value={expYear} onSelect={e => setExpYear(e.target.value)} />
                        </Even>
                    </Row>

                    <Row>
                        <InputBox id="address" type="text" title="Address" onChange={e => setAddress(e.target.value)} value={address} />
                    </Row>

                    <Row>
                        <InputBox id="zip" type="number" title="Zip" onChange={e => setZip(e.target.value)} value={zip} />
                        <InputBox id="city" type="text" title="City" onChange={e => setCity(e.target.value)} value={city} />
                        <InputBox id="state" type="text" title="State" onChange={e => setState(e.target.value)} value={state} />
                    </Row>
                    <Button onClick={goBack}>Go Back</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </div>
            </Column>}
            {display===2 && 
            <Column>
                <div>
                    <Row>
                        <InputBox id="fname" type="text" title="First Name" onChange={e => setFname(e.target.value)} value={fname} />
                        <InputBox id="lname" type="text" title="Last Name" onChange={e => setLname(e.target.value)} value={lname} />
                    </Row>
                    
                    <Row>
                        <InputBox id="card-num" type="text" title="Card Number" onChange={e => setCardNum(e.target.value)} value={cardNum} />
                        <Even>
                            <Select title="Type" id="card-type" options={cardTypeOptions} value={cardType} onSelect={e => setCardType(e.target.value)} />
                            <InputBox id="cvv" type="password" title="cvv" onChange={e => setCvv(e.target.value)} value={cvv} />
                            <Select title="Month" id="mm" options={months} value={expMonth} onSelect={e => setExpMonth(e.target.value)} />
                            <Select title="Year" id="yy" options={years} value={expYear} onSelect={e => setExpYear(e.target.value)} />
                        </Even>
                    </Row>

                    <Row>
                        <InputBox id="address" type="text" title="Address" onChange={e => setAddress(e.target.value)} value={address} />
                    </Row>

                    <Row>
                        <InputBox id="zip" type="number" title="Zip" onChange={e => setZip(e.target.value)} value={zip} />
                        <InputBox id="city" type="text" title="City" onChange={e => setCity(e.target.value)} value={city} />
                        <InputBox id="state" type="text" title="State" onChange={e => setState(e.target.value)} value={state} />
                    </Row>
                    <button onClick={goBack}>Go Back</button><button onClick={handleUpdate}>Update</button>
                </div>
            </Column>}
            {display===3 && 
            <Column>
                <Row>
                    <Column>
                        <div>Payment Method</div>
                        <div>
                            <Row>
                                <Col>{fname} {lname}</Col>
                                <Col>{cardNum}</Col>
                                <Col>{expMonth}/{expYear}</Col>
                                <Col>{cardType}</Col>
                            </Row>
                        </div>
                    </Column>
                    <Column>
                        <p>Cart</p>
                        <Row>
                            <Coly><strong>Name</strong></Coly>
                            <Coly><strong>Brand</strong></Coly>
                            <Coly><strong>Price</strong></Coly>
                            <Coly><strong>Quantity</strong></Coly>
                            <Coly><strong>Edit</strong></Coly>
                        </Row>
                        {cart.map(item => {
                            return (
                                <Row>
                                    <Coly>{item.product_name}</Coly>
                                    <Coly>{item.product_brand}</Coly>
                                    <Coly>{item.product_price}</Coly>
                                    <Coly>{item.quantity}</Coly>
                                </Row>
                                )
                            })
                        }
                    </Column>
                </Row>
                <Row>
                    <InputBox id="discount" type="text" title="Discount Code" onChange={e => setDiscount(e.target.value)} value={discount}/>
                </Row>
                <div>
                    <Button onClick={buyNow}>Buy Now</Button> 
                    <Button onClick={goBack}>Go Back</Button>
                </div>                
            </Column>}
        </Main>
    )
}