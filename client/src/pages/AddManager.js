import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


export default function AddManager() {

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
                                        Add A Manager
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="firstName">
                                            <Form.Label className="text-center">First Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter firstname" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label className="text-center">Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter lastname" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="birthDate">
                                            <Form.Label>Birth Date</Form.Label>
                                            <Form.Control type="date" placeholder="Enter birth date"/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="company">
                                            <Form.Label>Company</Form.Label>
                                            <Form.Control type="text" placeholder="Enter company"/>
                                        </Form.Group>
                                        {message !== '' ? (
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        ) : null}
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                            Create Manager
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