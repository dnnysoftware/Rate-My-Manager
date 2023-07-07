import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


export default function Rate() {

    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the form data
        const firstName = e.target.elements.firstName.value;
        const lastName = e.target.elements.lastName.value;
        const birthDate = e.target.elements.birthDate.value;
        const company = e.target.elements.company.value;

    
        // Create an object with the data
        const newManager = {
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          companies: [
            company
          ]
        };
    
        // Make the Axios call
        axios.post('/add/manager', newManager)
          .then((response) => {
            // Handle the response if needed
            console.log(response.data.message);
            setMessage('');
            navigate('/search');
          })
          .catch((error) => {
            // Handle errors if any
            setMessage(error.response.data.message);
          });
    };



    return (
        <div>  
            <Header/>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        Add A Rating
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="company">
                                            <Form.Label className="text-center">Company</Form.Label>
                                            <Form.Control type="text" placeholder="Enter company worked for" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="rating">
                                            <Form.Label className="text-center">Rating</Form.Label>
                                                <div key={`inline-radio`} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="1"
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-1`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="2"
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="3"
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="4"
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="5"
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-2`}
                                                />
                                                </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                        {message !== '' ? (
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        ) : null}
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                            Create Rating
                                            </Button>
                                        </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}