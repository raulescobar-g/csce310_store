import React from 'react'
import './input.css'


export const Input = props => {
    const { type, onChange, value, title, id } = props
    return (
        <div className="input-group">
            <label className="input-label" for={id}>{title}</label>
            <input id={id} className="input" type={type} onChange={onChange} value={value} />
        </div>
    )
}