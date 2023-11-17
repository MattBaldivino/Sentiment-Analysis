import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
var TextareaAutosize = require('react-textarea-autosize').default;

function Sentiment(){
    return(
        <div id="interface">
            <Container className='title sticky-lg-top sticky-md-top header'>
                <Row>
                    <Col lg={3}><h5>Sentiment Analysis App</h5></Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col lg={6}>
                        <h1 className="section">Type Here:</h1>
                            <TextareaAutosize autoFocus />
                        <br></br>
                        <Button variant="primary" type="submit" className="rounded-pill login-button" size="sm">
                            <p>Upload</p>
                        </Button>
                    </Col>
                    <Col lg={6}>
                        <h1 className="section">What Is It?</h1>
                        <p className="description">Sentiment analysis is a type of natural language processing. It makes use of machine learning(ML),
                        artificial intelligence(AI), and other techniques in order to analyze the emotion associated with a body of text.
                        </p>

                        <hr></hr>

                        <h1 className="section">Why Use It?</h1>
                        <p className="description">It is commonly used by those seeking to analyze customer reviews, comments, surveys, and other areas
                        where customer feedback is crucial. Our sentimental analysis site allows users to submit a body of text
                        which will return with either 'Positive' or 'Negative' or 'Neutral' emotion. </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Sentiment;