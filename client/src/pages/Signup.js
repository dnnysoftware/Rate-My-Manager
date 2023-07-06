import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Signup() {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the form data
        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            setMessage('The passwords do not match each other')
            return
        }   
    
        // Create an object with the data
        const newUser = {
          username: username,
          email: email,
          password: password
        };
    
        // Make the Axios call
        axios.post('/signup/user', newUser)
          .then((response) => {
            // Handle the response if needed
            console.log(response.data.message);
            setMessage('');
            navigate('/login');
          })
          .catch((error) => {
            // Handle errors if any
            setMessage(error.response.data.message);
          });
    };



    return (
        <div>
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
                <Card className="px-4">
                <Card.Body>
                    <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                        Rate My Manager
                    </h2>
                    <div className="mb-3">
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="text-center">Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="text-center">
                            Email address
                            </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="password"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="confirmPassword"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="confirmPassword" placeholder="Enter password" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        ></Form.Group>
                        {message !== '' ? (
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        ) : null}
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                            Create Account
                            </Button>
                        </div>
                        </Form>
                        <div className="mt-3">
                        <p className="mb-0  text-center">
                            Already have an account??{' '}
                            <a href="/login" className="text-primary fw-bold">
                            Log In
                            </a>
                        </p>
                        </div>
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