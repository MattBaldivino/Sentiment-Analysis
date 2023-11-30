import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header.js';
import useToken from './useToken.js';
var TextareaAutosize = require('react-textarea-autosize').default;

function Sentiment() {
    const [text, setText] = useState('');
    const [response, setResponse] = useState(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            const container = document.getElementsByClassName("left-container")[0];
            const progress = document.createElement("p");
            const node = document.createTextNode("Analyzing input...");
            progress.appendChild(node);
            container.appendChild(progress);
            const result = await axios.post('http://localhost:5000/analyze-sentiment', { query: text.trim() });
            const emotion = JSON.stringify(result.data.body).replace(/['"]+/g, '');
            if(emotion === "Positive"){
                progress.remove();
                const element = document.getElementsByClassName("left-container")[0];
                if(element.hasAttribute("negative") || element.hasAttribute("positive")){
                    element.removeAttribute("negative");
                }
                element.setAttribute("id", "positive");
                setResponse(emotion + " :)");
            }else if(emotion === "Negative"){
                progress.remove();
                const element = document.getElementsByClassName("left-container")[0];
                if(element.hasAttribute("positive") || element.hasAttribute("negative")){
                    element.removeAttribute("positive");
                }
                element.setAttribute("id", "negative");
                setResponse(emotion + " :(");
            }
        } catch (error) {
            console.error("Error sending sentiment analysis request:", error);
            setResponse({ error: "Error processing your request" });
        }
    }

    return (
        <>
            <Header token={useToken} />
            <div id="interface">
                <Container className='sticky-lg-top sticky-md-top interface-header'>
                    <Row>
                        <Col lg={3}><h5>Sentiment Analysis App</h5></Col>
                    </Row>
                </Container>
                <div className="content">
                    <Container>
                        <Row>
                            <Col lg={6} className="left-container">
                                <h1 className="section">Type Here:</h1>
                                <TextareaAutosize autoFocus value={text} onChange={handleTextChange} />
                                <br />
                                <Button variant="primary" onClick={handleSubmit} className="rounded-pill login-button" size="sm">
                                    <p>Analyze</p>
                                </Button>
                                <h1 className="section" id="response-section">Response:</h1>
                                {response && <div id="response"><p>{response}</p></div>}
                            </Col>
                            <Col lg={6} className="right-container sentiment-right">
                                <h1 className="section">What Is It?</h1>
                                <p className="description">Sentiment analysis is a type of natural language processing. It makes use of machine learning (ML), artificial intelligence (AI), and other techniques to analyze the emotion associated with a body of text.</p>
                                <hr />
                                <h1 className="section">Why Use It?</h1>
                                <p className="description">It is commonly used by those seeking to analyze customer reviews, comments, surveys, and other areas where customer feedback is crucial. Our sentiment analysis site allows users to submit a body of text which will return with either 'Positive', 'Negative', or 'Neutral' emotion.</p>
                               
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Sentiment;
