import React from 'react';
import ReactDOM from 'react-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object().shape({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    userName: yup
        .string()
        .when("userId", {
            is: (value) => value && value.length > 0,
            then: yup.string(),
            otherwise: yup.string().required('Required')
        }),
    userId: yup
        .string()
        .when("userName", {
            is: value => value && value.length > 0,
            then: yup.string(),
            otherwise: yup.string().max(4, 'Too Long!').required('Required')
        }),
}, [['userName', 'userId']]);

const FormLogIn = () => {
    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
            userName: 'Joe Doe',
            userId: '1234',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    id="userName"
                    name="userName"
                    label="userName"
                    type="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                />
                <TextField
                    fullWidth
                    id="userId"
                    name="userId"
                    label="userId"
                    type="userId"
                    value={formik.values.userId}
                    onChange={formik.handleChange}
                    error={formik.touched.userId && Boolean(formik.errors.userId)}
                    helperText={formik.touched.userId && formik.errors.userId}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
export default FormLogIn;
