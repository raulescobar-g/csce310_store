import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    background-color: white;
    border-radius: 3px;
    border: 2px solid lightgrey;
    padding: 0.5rem;
`

const Label = styled.label`
    align-self: flex-start;
    color: #666666;
`

const Box = styled.div`
    display:flex;
    flex-direction: column;
    padding-inline-end: 2rem;
    flex-grow: 1;
`


export const InputBox = props => {
    const { type, onChange, value, title, id } = props
    return (
        <Box className="input-group">
            <Label className="input-label" for={id}>{title}</Label>
            <Input id={id} className="input" type={type} onChange={onChange} value={value} />
        </Box>
    )
}



