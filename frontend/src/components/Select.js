import React from 'react'
import styled from 'styled-components'


const Label = styled.label`
    align-self: flex-start;
    color:#666666;
`

const Sel = styled.select`
    height: min-content;
    padding: 0.5rem;
    width:100%;
    border: 2px solid lightgrey;
`
const Box = styled.div`
    display:flex;
    flex-direction: column;
    padding-inline-end: 2rem;

`
// leaving it unstyled in case someone else wants to use it, you can import and style it how you want
export const Select = props => {
    const { options, value, onSelect, title } = props
    return (
        <Box>
            <Label>
                {title}
            </Label>
            <Sel value={value} onChange={onSelect}>
                {options.map(option => {
                    return <option>{option}</option>
                })}
            </Sel>
        </Box>
    )
}