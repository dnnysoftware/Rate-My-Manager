import { Col, Row, Container, Form, InputGroup } from 'react-bootstrap';
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <Container className="d-flex justify-content-center">
                <Row className="col-md-6">
                    <Col>
                        <h2 className="text-center">Search</h2>
                        <InputGroup>
                            <Form.Control
                            placeholder="Enter manager name"
                            controlid="username"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
