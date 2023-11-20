import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import LoginForm from './LoginForm.jsx';

//bootstrap grid system divided into 12 columns
//number parameter given expresses the width of the column as 12 divided by the parameter
//ex: sm={8} means that on small screen devices, the column will take up (12/8)% of the screen
function RegisterScreen(props){
    return(
        <div className="login-body">
            <Container className='sticky-lg-top sticky-md-top header'>
                <Row>
                    <Col lg={3}><h5>Sentiment Analysis App</h5></Col>
                </Row>
            </Container>
            <div className="login">
                <Container>
                    <Row>
                        <Col lg={6}> 
                            <h2>Sign Up</h2>
                            <LoginForm
                                buttonText = "Register"
                                registerText = ""
                                urlText="/"
                            />
                        </Col>
                        <Col lg={6} className="img-container">
                            <img src="https://cdn-icons-png.flaticon.com/512/10148/10148754.png" alt="emotion"></img>
                            <Carousel indicators={false}>
                                <Carousel.Item>
                                    <h2>An easy to use AI Web Application</h2>
                                    <h4>Login to get started.</h4>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <h2>Trouble expressing your feelings?</h2>
                                    <h4>Enter your favorite sea shanty to see the emotion it carries!</h4>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        
    );
}

export default RegisterScreen;