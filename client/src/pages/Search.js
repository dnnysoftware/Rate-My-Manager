import { Col, Row, Container, Form, InputGroup, Card, ListGroup } from 'react-bootstrap';
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../css/search.css';
import axios from 'axios';


export default function Search() {

    const [name, setName] = useState('');
    const [managers, setManagers] = useState([]);
    const userId = localStorage.getItem('uid');

    const fetchManagers = async (name) => {
        try {
            if(name != null && name !== '') {
                const encodedName = encodeURI(name);
                const url = `/receive/managers/${encodedName}`;
                const response = await axios.get(url);
                setManagers(response.data);
            } else {
                setManagers([]);
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    useEffect(() => {
        fetchManagers(name);
    }, [name]);
    

    return (
        <>
            <Header />
            <Container className="justify-content-center align-items-center d-flex flex-column">
                <Row className="mb-5" >
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <h2 className="text-center m-4">Search Managers</h2>
                        <InputGroup>
                            <Form.Control
                            border="primary"
                            placeholder="Enter manager name"
                            controlid="username"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    {managers.map((manager, index) => (
                    <Col className='m-2' key={index} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Link to='/manager' style={{textDecoration: 'none'}} state={{manager: manager, uid: userId}}>
                            <Card className="justify-content-center align-items-center d-flex" bg="primary" text="white" body>
                                <ListGroup bg="light" className='text-center' horizontal>
                                    <ListGroup.Item className='p-1 text-size w-100'>NAME</ListGroup.Item>
                                    <ListGroup.Item className='p-1 text-size w-100'>COMPANIES</ListGroup.Item>
                                    <ListGroup.Item className='p-1 text-size w-100'>AGE</ListGroup.Item>
                                    <ListGroup.Item className='p-1 text-size w-100'>RATING</ListGroup.Item>
                                </ListGroup>
                                <ListGroup bg="light" className='text-center' horizontal>
                                    <ListGroup.Item className='text-size w-100'>{manager.firstName} {manager.lastName}</ListGroup.Item>
                                    <ListGroup.Item className='text-size w-100'>
                                        {manager.companies && manager.companies.length !== 0 ? (
                                            <div>
                                                {manager.companies.join(", ")}
                                            </div>
                                            ) : (
                                            <div> N/A </div>
                                        )}
                                    </ListGroup.Item>
                                    <ListGroup.Item className='text-center text-size w-100'>{manager.age}</ListGroup.Item>
                                    <ListGroup.Item className='rating-size w-100'>5</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Link>
                    </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}