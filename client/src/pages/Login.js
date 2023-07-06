import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {


    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the form data
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        // Create an object with the data
        const loginUser = {
            username: username,
            password: password
        };

        // Make the Axios call
        axios.post('/login/user', loginUser)
            .then((response) => {
            // Handle the response if needed
            const token = response.data.token;
            localStorage.setItem('token', token); // Store the token in local storage

            setMessage('');
            navigate('/search'); // Redirect to the dashboard or another protected route
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
                      <Form.Group
                        className="mb-3"
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
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
                          Log In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account??{' '}
                        <a href="/signup" className="text-primary fw-bold">
                          Sign Up
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