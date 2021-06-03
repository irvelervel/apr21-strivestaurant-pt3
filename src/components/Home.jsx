import { Carousel, Col, Container, ListGroup, Row } from 'react-bootstrap'
import dishes from '../data/menu.json'
import { Component } from 'react'
import ReservationForm from './ReservationForm'
import Reservations from './Reservations'

// usually a state belongs to a class component

// how to convert a functional component in a class-based component?
// it's pretty easy

class Home extends Component {

    state = {
        // a state is an object holding information through time
        selected: null // initial state
    }

    render() {
        console.log(this.state.selected?.comments[2]?.comment)
        // optional chaining

        return (
            <Container>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={6}>
                        <h1>Welcome to Strivestaurant!</h1>
                        <h3>We can only cook pasta...</h3>
                        <Carousel>
                            {/* MAP */}
                            {
                                dishes.map((dish, i) => (
                                    <Carousel.Item
                                        key={dish.id}
                                        onClick={() => this.setState({
                                            // why do we need setState?
                                            // because the state in a component
                                            // is READ-ONLY
                                            // it's accepting an OBJECT as the argument
                                            // it's going to MERGE this object into the state
                                            selected: dish
                                        })}
                                    >
                                        <img
                                            className="d-block w-100"
                                            src={dish.image}
                                            alt={"slide number " + (i + 1)}
                                        />
                                        <Carousel.Caption>
                                            <h3>{dish.name}</h3>
                                            <p>{dish.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>)
                                )
                            }
                        </Carousel>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={6}>
                        <ListGroup>
                            {
                                this.state.selected ? this.state.selected.comments.map(c => (
                                    <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
                                )) : <p>YOU DIDN'T SELECT ANYTHING</p>
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={6}>
                        <Reservations />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={6}>
                        <ReservationForm />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home