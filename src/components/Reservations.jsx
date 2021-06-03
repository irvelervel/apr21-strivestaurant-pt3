import { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import Loading from './Loading'
import Error from './Error'

// 1) create some room for the reservations into the state
// 2) grab the reservations from an endpoint
// 3) we're going to put them into the state of this component

class Reservations extends Component {

    state = {
        reservations: [], // empty state
        isLoading: true,
        isError: false
    }

    // what we want for our expensive operations is being able to call the ONCE
    // not only once, but also in a way that doesn't affect the speed of the app
    // the user experience

    componentDidMount = async () => {
        // this is a reserved method, a lifecycle one
        // this will be fired just ONCE, when the component is placed into the DOM
        // and it has finished the mounting process
        // after the INITIAL RENDER of the component
        console.log('COMPONENTDIDMOUNT')
        // componentDidMount is the PERFECT PLACE for our fetch
        // so here we're going to put our fetch()
        try {
            let response = await fetch('https://striveschool.herokuapp.com/api/reservation')
            console.log(response)
            // this is happening AFTER the initial render invocation
            let newReservations = await response.json()
            // .json() is a method in charge of converting your response body into something usable in JS
            console.log('RESERVATIONS', newReservations)
            this.setState({
                reservations: newReservations,
                isLoading: false
            })
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false, isError: true })
        }
    }

    render() {
        // this.setState({
        //     reservations: []
        // })
        // THIS SHOULD NEVER BE DONE!
        console.log('RENDER')
        // render is NOT the perfect place to do our fetches || expensive operations

        // useful for avoiding too much clutter in your return statement
        // let shouldIShowTheEmptyReservation = this.state.reservations.length === 0 && this.state.isLoading === false

        // render is going to be executed every time there's a change
        // in the STATE or in the PROPS of this component
        return (
            <>
                {/* this is called a REACT FRAGMENT, it has no visible effect on your page */}
                <h3>RESERVATIONS:</h3>
                {/* {this.state.isLoading ? <Loading /> : <></>} */}
                {this.state.isLoading && <Loading />}
                {this.state.isError && <Error />}
                {/* because a valid React Component like <Loading /> is always going to be */}
                {/* a valid statement, the condition to check for the Spinner to appear */}
                {/* is going to be the left one, your state check */}
                {/* short circuit operator */}
                {
                    (
                        this.state.reservations.length === 0
                        && this.state.isLoading === false
                        && this.state.isError === false
                    )
                        ? <p>NO RESERVATIONS</p>
                        : <ListGroup>
                            {this.state.reservations.map(reservation =>
                                <ListGroup.Item key={reservation._id}>
                                    {reservation.name}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                }
            </>
        )
    }
}

export default Reservations