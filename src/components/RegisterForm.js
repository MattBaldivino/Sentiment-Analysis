import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

import axios from 'axios';
import useToken from './useToken.js';

function RegisterForm(props) {
  const { token, removeToken, setToken } = useToken();
  const [loginForm, setloginForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleEmailChange = (event) => {
    setloginForm({
      ...loginForm,
      email: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setloginForm({
      ...loginForm,
      password: event.target.value,
    });
  };

  const logMeIn = (event) => {
    event.preventDefault(); // Prevent the default form submission

    axios({
      method: 'POST',
      url: '/token',
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token, () => {
            navigate('/Sentiment');
          });
          console.log('Before navigation');
          navigate('/Sentiment'); // Force navigation here
          // Log just after navigation
          console.log('After navigation');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    // Optionally reset the form fields
    setloginForm({
      email: '',
      password: '',
    });
  };

  return (
    <Form onSubmit={logMeIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <h5>Email Address</h5>
        </Form.Label>
        <Form.Control
          placeholder="Enter email"
          value={loginForm.email}
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          <h5>Password</h5>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={loginForm.password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <br></br>
      <Button
        variant="primary"
        type="submit"
        className="rounded-pill login-button"
        size="sm"
      >
        {props.buttonText}
      </Button>
      <br></br>
      <Link to="/Register">{props.registerText}</Link>
    </Form>
  );
}

export default LoginForm;
