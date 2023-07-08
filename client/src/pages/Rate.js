import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


export default function Rate() {

    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Get the form data
        const company = e.target.elements.company.value;
        const rating = e.target.elements.rating.value;
        const description = e.target.elements.description.value;
        const urlUser = `/user/${location.state.uid}`;
    
        try {
          const response = await axios.get(urlUser);
          const username = response.data.username;
    
          if (username) {
            const newRating = {
              user: location.state.uid,
              username: username,
              company: company,
              rating: rating,
              description: description,
            };
    
            const url = `/add/rating/${location.state.manager._id}`;
            const ratingResponse = await axios.put(url, newRating);
            setMessage('');
            navigate("/manager", { state: { uid: location.state.uid, manager: ratingResponse.data  } })
          }
        } catch (error) {
          // Handle errors if any
          setMessage(error.response.data.message);
          navigate("/manager", { state: { uid: location.state.uid, manager: {} } });
        }
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
                                    <h3 className='text-center'>{location.state.manager.firstName} {location.state.manager.lastName}</h3>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="company">
                                                <Form.Label className="text-center ">Company</Form.Label>
                                                <Form.Control type="text" placeholder="Enter company worked for." />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="rating">
                                                <Form.Label className="text-center">Rating</Form.Label>
                                                    <div key={`inline-radio`} className="mb-3 text-center">
                                                    <Form.Check
                                                        inline
                                                        label="1"
                                                        name="rating"
                                                        type="radio"
                                                        id={`inline-radio-1`}
                                                        value="1"
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label="2"
                                                        name="rating"
                                                        type="radio"
                                                        id={`inline-radio-2`}
                                                        value="2"
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label="3"
                                                        name="rating"
                                                        type="radio"
                                                        id={`inline-radio-2`}
                                                        value="3"
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label="4"
                                                        name="rating"
                                                        type="radio"
                                                        id={`inline-radio-2`}
                                                        value="4"
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label="5"
                                                        name="rating"
                                                        type="radio"
                                                        id={`inline-radio-2`}
                                                        value="5"
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