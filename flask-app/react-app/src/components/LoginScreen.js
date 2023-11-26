import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios";

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const logMeIn = (event) => {
        event.preventDefault(); // Prevent the default form submission

        axios({
            method: "POST",
            url: "/token",
            data: {
                email: email,
                password: password
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });

        // Reset the form fields
        setEmail("");
        setPassword("");
    };

    return (
        <Form onSubmit={logMeIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><h5>Email Address</h5></Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><h5>Password</h5></Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="rounded-pill login-button" size="sm">
                <p>{props.buttonText}</p>
            </Button>
            <Link to="/RegisterScreen"><p>{props.registerText}</p></Link>
        </Form>
    );
}

export default LoginForm;
