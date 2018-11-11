import React from 'react'
export const required = value => value ? undefined : 'Required'
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
export const password = value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*<>,.:()@%&]).{8,}$/g.test(value) ?
        'Password must contain at least 8 characters one number, \n one lowercase letter, one capital letter and at least one especial symbol' : undefined
export const passwordsMatch = (value, allValues) => value !== allValues.password ? 'Passwords do not match' : undefined

export const changePasswordValidator = (value, allValues) => value !== allValues.newPassword ? 'Passwords do not match' : undefined
    
export const renderField = ({placeholder, input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <input className="form-control" {...input} placeholder={placeholder} type={type} />
            {touched && ((error && <span className='cl-danger'>{error}</span>) || (warning && <span className='cl-danger'>{warning}</span>))}
        </div>
    </div>
)