import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from './LoginForm';
import axios from 'axios';

//bootstrap grid system divided into 12 columns
//number parameter given expresses the width of the column as 12 divided by the parameter
//ex: sm={8} means that on small screen devices, the column will take up (12/8)% of the screen
function LoginScreen(props){
    const handleSubmit = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            });
            console.log(response.data); // Handle the response accordingly
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    return(
        <div>
            <Container className='title sticky-lg-top sticky-md-top header'>
                <Row>
                    <Col lg={3}><h4>Sentiment Analysis App</h4></Col>
                </Row>
            </Container>
            <div className="login">
                <Container>
                <Row>
                    <Col lg={6}> 
                        <h2>Welcome</h2>
                        <LoginForm
                            buttonText = "Login"
                            registerText = "Don't have an account? Register here!"
                            onSubmit={handleSubmit}
                         />
                    </Col>
                    <Col lg={6} className="img-container">
                        <img src="https://cdn-icons-png.flaticon.com/512/5377/5377629.png" alt="emotion"></img>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
        
    );
}

export default LoginScreen;