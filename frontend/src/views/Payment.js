import React, { useState } from 'react'
import { InputBox } from '../components/Input'
import { OrderSummary } from '../components/OrderSummary'
import { Select } from '../components/Select'

import styled from 'styled-components'

const Main = styled.div`
    display:flex;
    flex-direction: row;
    height: 95vh; /* edit */
`
const LeftHalf = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-self:center;
    width: 85%;
    padding: 5rem;
`
const RightHalf = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-self:cetner;
    width: 15%;
    padding: 5rem;
    background-color: blue;
`

const Form = styled.div`
    background-color: white;
    height: 100%;
    margin: 3rem;
`
const InputLine = styled.div`
    display:flex;
    flex-direction: row;
    margin-block-end: 3rem;
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

    const cardTypeOptions = ["AMEX","VISA","Master Card","Other"]

    return (
    <Main>
        <LeftHalf>
            <Form>
                <InputLine>
                    <InputBox id="fname" type="text" title="First Name" onChange={e => setFname(e.target.value)} value={fname} />
                    <InputBox id="lname" type="text" title="Last Name" onChange={e => setLname(e.target.value)} value={lname} />
                </InputLine>
                
                <InputLine>
                    <InputBox id="card-num" type="text" title="Card Number" onChange={e => setCardNum(e.target.value)} value={cardNum} />
                    <Select title="Card Type" id="card-type" options={cardTypeOptions} value={cardType} onSelect={e => setCardType(e.target.value)} />
                    <InputBox id="cvv" type="password" title="cvv" onChange={e => setCvv(e.target.value)} value={cvv} />
                    <Select title="Exp Month" id="mm" options={months} value={expMonth} onSelect={e => setExpMonth(e.target.value)} />
                    <Select title="Exp Year" id="yy" options={years} value={expYear} onSelect={e => setExpYear(e.target.value)} />
                </InputLine>

                <InputLine>
                    <InputBox id="address" type="text" title="Address" onChange={e => setAddress(e.target.value)} value={address} />
                </InputLine>

                <InputLine>
                    <InputBox id="zip" type="number" title="Zip" onChange={e => setZip(e.target.value)} value={zip} />
                    <InputBox id="city" type="text" title="City" onChange={e => setCity(e.target.value)} value={city} />
                    <InputBox id="state" type="text" title="State" onChange={e => setState(e.target.value)} value={state} />
                </InputLine>
                <button>Submit</button>
            </Form>
        </LeftHalf>
        <RightHalf>
            <OrderSummary order={order}/>
        </RightHalf>
    </Main>
        
    )
}