import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function LoginForm(props){
    return(
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><h5>Email Address</h5></Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><h5>Password</h5></Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Link to={props.urlText}>
                    <Button variant="primary" type="submit" className="rounded-pill login-button" size="sm">
                        <p>{props.buttonText}</p>
                    </Button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/RegisterScreen"><p>{props.registerText}</p></Link>
            </Form>
    );
}

export default LoginForm;