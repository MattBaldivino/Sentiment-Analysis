import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        props.onSubmit(email, password); // Pass email and password to the parent component's onSubmit function
    };

    return (
        <Form onSubmit={handleSubmit}>
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
