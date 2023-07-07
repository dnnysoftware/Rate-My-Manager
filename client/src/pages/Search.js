import { Col, Row, Container, Form, InputGroup, Card, ListGroup } from 'react-bootstrap';
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/search.css';
import axios from 'axios';


export default function Search() {

    const [name, setName] = useState('');
    const [managers, setManagers] = useState([]);
    const navigate = useNavigate();

    const fetchManagers = async (name) => {
        try {
            if(name != null && name !== '') {
                const encodedName = encodeURI(name);
                const url = `/receive/managers/${encodedName}`;
                const response = await axios.get(url);
                console.log(response.data)
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
                <Row className="col-md-6 mb-5" >
                    <Col>
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
                <Row className="col-md-6">
                    {managers.map((manager, index) => (
                    <Col className='m-2' key={index}>
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
                                <ListGroup.Item className='text-size w-100'>{manager.age}</ListGroup.Item>
                                <ListGroup.Item className='rating-size w-100'>5</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}