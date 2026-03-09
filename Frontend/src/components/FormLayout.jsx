import React from 'react'

export default function FormLayout({ onSubmit, children, enctype, method, action}) {
    return (
        <div className='form_container'>
            <form
                onSubmit={onSubmit}
                method={method}
                action={action}
                encType={enctype}
            >
                {children}
            </form>
        </div>
    )
}
