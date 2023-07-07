import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, ListGroup, Link } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


export default function Manager() {

    const location = useLocation();
    const [ratings, setRatings] = useState([]);




    return (
        <div>  
            <Header/>
            <Container className="justify-content-center align-items-center d-flex flex-column">
                <Row className="mb-5" >
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <h2 className="text-center m-4">Ratings</h2>
                    </Col>
                </Row>
                <Row className="mb-5" xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <Card>
                            <Card.Body>{location.state.manager.firstName} {location.state.manager.lastName}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <Card>
                            <Card.Body>{location.state.manager.companies.join(", ")}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <Card>
                            <Card.Body>{location.state.manager.age}</Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {location.state.manager.ratings.map((rating, index) => (
                    <Col className='m-2' key={index} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Card className="justify-content-center align-items-center d-flex" bg="primary" text="white" body>
                            <ListGroup bg="light" className='text-center' horizontal>
                                <ListGroup.Item className='text-size'>{rating.username}</ListGroup.Item>
                                <ListGroup.Item className='text-size'>{rating.company}</ListGroup.Item>
                                <ListGroup.Item className='text-size'>{rating.description}</ListGroup.Item>
                                <ListGroup.Item className='rating-size'>{rating.rating}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

