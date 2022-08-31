import * as React from 'react'
import { REGISTER } from '../../apollo/gql/Mutation'
import { UseForm, UseSign } from '../../hooks/index'
import Form from '../Atom/Form';
export default function Register() {
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const user = ["register", "/login"]
    const { onSubmit, onchange, values } = UseForm(registerUser, initialState)
    const { errors, loading, sign } = UseSign(values, REGISTER, user)
    function registerUser() {
        sign()
    }
    return (<Form onSubmit={onSubmit}
        onchange={onchange}
        values={values}
        errors={errors}
        loading={loading}
        path={user[1]} />)
}
