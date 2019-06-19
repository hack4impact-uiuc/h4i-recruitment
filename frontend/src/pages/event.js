import React from 'react'
import { Table, Row, Button, Col, FormGroup, Label, Input, Container } from 'reactstrap'
import ActionButton from '../components/actionButton'
import Nav from '../components/nav'

class Events extends React.Component<Props> {
    constructor(props) {
      super(props)
      this.state = {
        events: []
      }
    }

    async componentDidMount() {
    //   const events = await getEvents() // api call
    //   if (events !== undefined) {
    //       this.setState({
    //           events
    //       });
    //     }
    //   }
        this.setState({
            events: [
                {
                    name: "Alice's Event",
                    date: "July 1",
                    startTime: 5,
                    endTime: 7,
                    location: "Brew Lab",
                    description: "Learn how to make coffee",
                    attendees: 30,
                    fbLink: "https://www.brewlab.coffee/"
                },
                {
                    name: "Annie's Event",
                    date: "Aug 28",
                    startTime: 7,
                    endTime: 9,
                    location: "Boba Guys",
                    description: "Learn how to make boba",
                    attendees: 40,
                    fbLink: "http://www.bobaguys.com/"
                },
                {
                    name: "Annie's Event",
                    date: "Aug 28",
                    startTime: 7,
                    endTime: 9,
                    location: "Boba Guys",
                    description: "Learn how to make boba",
                    attendees: 40,
                    fbLink: "http://www.bobaguys.com/"
                }
            ]
        })
    }

    render() {
        return (
          <>
            <Nav />
            <div className="page-content-wrapper">
              <Container fluid>
            <Table>
                <thead>
                    <h1 style={{ marginBottom: '15px'}}>Events</h1>
                    <Row style={{ marginBottom: '15px'}}>
                      <ActionButton text="Add New Event" link="/interviewlist" />
                    </Row>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Attendees</th>
                        <th>Facebook Event Page</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.events.map( event => (
                        <tr>
                            <td>{ event.name }</td>
                            <td>{ event.date }</td>
                            <td>{ event.startTime }</td>
                            <td>{ event.endTime }</td>
                            <td>{ event.location }</td>
                            <td>{ event.description }</td>
                            <td>{ event.attendees }</td>
                            <td>{ event.fbLink }</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
          </div>
        </>
        )
    }
}

export default Events
