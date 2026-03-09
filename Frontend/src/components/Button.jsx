import React from 'react'

export default function Button({ type, onClick, children, style, disabled }) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`btn ${style}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
