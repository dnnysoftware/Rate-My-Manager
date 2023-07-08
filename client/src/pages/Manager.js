import { Col, Button, Row, Container, Card, ListGroup} from 'react-bootstrap';
import { useLocation,  Link  } from 'react-router-dom';
import Header from '../components/Header';
import AvgRate from '../components/AvgRate';


export default function Manager() {

    const location = useLocation();

    return (
        <div>  
            <Header/>
            <Container>
                <Row className="mb-5" >
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <h2 className="text-center m-4">Ratings</h2>
                    </Col>
                </Row>
                <Row className="mb-3 text-center justify-content-center align-items-center" xs={1} sm={1} md={4} lg={4} xl={4} xxl={4}>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Card>
                            <Card.Body>{location.state.manager.firstName} {location.state.manager.lastName}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Card>
                            <Card.Body>{location.state.manager.companies.join(", ")}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Card>
                            <Card.Body>Average Rating: <AvgRate manager={location.state.manager}/></Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Link to='/rate' state={{manager: location.state.manager, uid: location.state.uid }}><Button>Add Rating</Button></Link>
                    </Col>
                </Row>
            </Container>
            <Container className="justify-content-center align-items-center  flex-column">
                <Row>
                    {location.state.manager.ratings.map((rating, index) => (
                    <Col className='m-2' key={index} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Card className="justify-content-center align-items-center d-flex" bg="primary" text="white" body>
                            <ListGroup bg="light" className='text-center' horizontal>
                                <ListGroup.Item className='w-100'>NAME</ListGroup.Item>
                                <ListGroup.Item className='w-100'>COMPANY</ListGroup.Item>
                                <ListGroup.Item className='w-100'>DESCRIPTION</ListGroup.Item>
                                <ListGroup.Item className='w-100'>RATING</ListGroup.Item>
                            </ListGroup>
                            <ListGroup bg="light" className='text-center' horizontal>
                                <ListGroup.Item className='text-size w-100 d-flex align-items-center justify-content-center'>{rating.username}</ListGroup.Item>
                                <ListGroup.Item className='text-size w-100 d-flex align-items-center justify-content-center'>{rating.company}</ListGroup.Item>
                                <ListGroup.Item className='text-size w-100'>{rating.description}</ListGroup.Item>
                                <ListGroup.Item className='rating-size w-100 d-flex align-items-center justify-content-center'>{rating.rating}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

