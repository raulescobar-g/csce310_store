import React, { useEffect, useState } from 'react'
import { InputBox } from '../components/Input'
import { OrderSummary } from '../components/OrderSummary'
import { Select } from '../components/Select'
import styled from 'styled-components'

const Main = styled.div`
    display:flex;
    flex-direction: row;
    height: calc(100vh - 7rem);
    margin-top: 3.5rem;
`
const Column = styled.div`
    padding: 3rem;
`

const Row = styled.div`
    display:flex;
    flex-direction: row;
    padding-block-end: 1.5rem;
`
const Even = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
`

export function Payment() {

    const order = {"things" : 1, "things1" : 1, "things2" : 1, "things3" : 1, "things4" : 1}
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    const years = [22,23,24,25,26,27,28,29,30]

    const [cardNum, setCardNum] = useState("");
    const [cardType, setCardType] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [cvv , setCvv] = useState("")
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("")

    const [display, setDisplay] = useState(0);

    const cardTypeOptions = ["AMEX","VISA","Master Card","Other"]

    const handleSubmit = async () => {
        try{
            const data = {"cardNum":cardNum, "cardType":cardType, "address":address, "zip":zip, "city":city, "state":state, "cvv":cvv, "fname":fname, "lname":lname, "expMonth":expMonth, "expYear":expYear}
            const options = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }
            const req = await fetch("http://localhost:5000/payment/", options); 
            console.log(req)
        }
        catch (e) {
            console.log(e)
        }
    }

    // useEffect(() => {
    //     //const user_id = getFromStorage('user_id')
    //     const user_id = 1;
    //     fetch(`http://localhost:5000/payments/${user_id}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data)
    //       return data
    //     )
    // },[])

    return (
        <Main>
            {display===1 && 
            <Column center>
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
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </Column>}
            {display===0 && 
            <Column center>
            <div>Payment Methods Available</div>
        </Column>
        }
        </Main>
    )
}