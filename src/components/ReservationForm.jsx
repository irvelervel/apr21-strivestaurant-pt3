import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
// import upperName from '../helpers/lib'

// OUR ENDPOINT NEEDS:
// name - string
// phone - string | number
// numberOfPersons - string | number
// smoking - boolean
// dateTime - string
// specialRequests - string


// let myStyle = { color: 'red' }

class ReservationForm extends Component {

    state = {
        reservation: {
            name: '',
            phone: '',
            numberOfPersons: 1,
            smoking: false,
            dateTime: '',
            specialRequests: ''
        },
    }

    inputChange = (e) => {
        // console.log(e.target.id)
        // console.log(e.target.value)
        // with e.target.id I know which property of the state to change

        // if I want a function to replace all my onChange event listeners
        // I need to know where I'm coming from (name, phone, smoking, etc.)

        // let obj = {
        //     name: 'Stefano'
        // }

        let id = e.target.id

        this.setState({
            // onChange is going to always listen to my keystrokes
            reservation: {
                ...this.state.reservation,
                // the spread operator ...
                // is going to take all the keys/values pairs from this.state.reservation
                // and carry them over here
                // so I'll overwrite just the property with the name of the id!
                [id]: id === 'smoking' ? e.target.checked : e.target.value
                // name: e.target.value
                // e.target.value is holding the text I just keystroked
            }
        }, () => {
            // using the second param of setState, the callback, you're 100% assured
            // your code will be executed AFTER the setState
            console.log(this.state.reservation)
        })
    }

    submitReservation = async (e) => {
        e.preventDefault()
        console.log("I'm about to send my reservation!")
        console.log(this.state.reservation)
        // we're about to use fetch()
        // fetch() is always going to return you a Promise
        // a Promise is an asynchronous operation: you know when it starts,
        // you don't know when it ends

        // async/await
        // .then()

        try {
            let response = await fetch("https://striveschool.herokuapp.com/api/reservation", {
                method: 'POST',
                body: JSON.stringify(this.state.reservation),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            console.log(response.ok) // the ok property from the fetch() is going to tell you if the operation was successfull
            if (response.ok) {
                alert('Reservation saved!')
                this.setState({
                    reservation: {
                        name: '',
                        phone: '',
                        numberOfPersons: 1,
                        smoking: false,
                        dateTime: '',
                        specialRequests: ''
                    }
                })
            } else {
                // this is going to catch a server problem
                // i.e: server is down, db has a problem
                alert('Houston we had a problem, try again!')
            }
        } catch (error) {
            // if we fall here it means we don't have connection
            // or maybe the url is not quite right
            console.log(error)
        }

        // fetch("https://striveschool.herokuapp.com/api/reservation")
        //     .then(response => console.log(response.ok))
        //     .catch(error => console.log(error))

    }

    render() {
        return (
            <>
                <h3 className="mt-3">RESERVATION FORM</h3>
                <Form className="mb-5" onSubmit={(e) => this.submitReservation(e)}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={this.state.reservation.name}
                            id="name"
                            // with value I'm reflecting into the input what I have into the state
                            onChange={e => this.inputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter phone"
                            id="phone"
                            value={this.state.reservation.phone}
                            onChange={e => this.inputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>How many people?</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.state.reservation.numberOfPersons}
                            id="numberOfPersons"
                            onChange={e => this.inputChange(e)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Do you smoke?"
                            checked={this.state.reservation.smoking}
                            id="smoking"
                            onChange={e => this.inputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={this.state.reservation.dateTime}
                            id="dateTime"
                            onChange={e => this.inputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Any special request?</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={this.state.reservation.specialRequests}
                            id="specialRequests"
                            onChange={this.inputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </>
        )
    }
}

export default ReservationForm