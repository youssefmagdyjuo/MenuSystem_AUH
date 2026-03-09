import React from 'react'

export default function Input({ type, placeholder, value, onChange, label,required }) {
    return (
        <div className="input_container">
            <label>{label}</label>
            <input
                required={required}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
