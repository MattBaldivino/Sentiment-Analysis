import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from './LoginForm';

//bootstrap grid system divided into 12 columns
//number parameter given expresses the width of the column as 12 divided by the parameter
//ex: sm={8} means that on small screen devices, the column will take up (12/8)% of the screen
function LoginScreen(props){
    return(
        <div>
            <Container className='title sticky-lg-top sticky-md-top header'>
                <Row>
                    <Col lg={3}><h5>Sentiment Analysis App</h5></Col>
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
                                urlText = "/Sentiment"
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