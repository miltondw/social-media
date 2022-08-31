import * as React from 'react';
import {
    TextField, Box, Button, List,
    ListItem,
    ListItemText,
    Container
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { REGISTER } from '../../apollo/gql/Mutation'
export default function Register() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onchange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const [register, { loading }] = useMutation(REGISTER, {
        update(_, response) {
            navigate("/login")
        },
        onError(err) {
            console.log(err?.graphQLErrors[0].extensions.errors)
            setErrors(err?.graphQLErrors[0].extensions.errors)
        }
        ,
        variables: values
    });
    const onSubmit = (e) => {
        e.preventDefault()
        register();
    }
    return (
        <Container>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
                display="flex"
                sx={{ flexDirection: "column", width: "40%", margin: "2em auto" }}
            >
                <TextField
                    required
                    id="username"
                    name="username"
                    label={errors?.username ? errors?.username : "Username"}
                    error={errors?.empty != null ? true : false || errors?.username != null ? true : false}
                    defaultValue={values.username}
                    autoComplete="current-username"
                    variant="standard"
                    onChange={onchange}
                />
                <TextField
                    required
                    id="email"
                    name="email"
                    label={errors?.email ? errors?.email : "Email"}
                    type="email"
                    defaultValue={values.email}
                    error={errors?.email != null ? true : false || errors?.empty != null ? true : false}
                    autoComplete="current-email"
                    variant="standard"
                    onChange={onchange}
                />
                <TextField
                    required
                    id="password"
                    name="password"
                    label={errors.password ? errors.password : "Password"}
                    type="password"
                    defaultValue={values.password}
                    autoComplete="current-password"
                    variant="standard"
                    onChange={onchange}
                    error={errors?.empty != null ? true : false || errors.password != null ? true : false}
                />
                <TextField
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    label={errors.password ? errors.password : "Confirm Password"}
                    type="password"
                    defaultValue={values.confirmPassword}
                    autoComplete="current-password"
                    variant="standard"
                    onChange={onchange}
                    error={errors?.empty != null ? true : false || errors.password != null ? true : false}
                />
                {
                    loading ? <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                    >
                        Register
                    </LoadingButton> : <Button type='submit'>
                        Register
                    </Button>
                }
                {
                    errors ? <List sx={{ display: "flex", flexDirection: "column" }}>
                        {Object.values(errors).map((error) => (
                            <ListItem key={error}>
                                <ListItemText sx={{ color: "red" }} primary={error} />
                            </ListItem>
                        ))}
                    </List> : ""
                }
            </Box>
        </Container>
    );
}
