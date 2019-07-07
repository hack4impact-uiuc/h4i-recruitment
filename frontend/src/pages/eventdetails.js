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
          date: 'July 1',
          startTime: 5,
          endTime: 7,
          location: 'Brew Lab',
          attendees: 30,
          fbLink: 'https://www.brewlab.coffee/'
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
                <h2>Event Name</h2>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Total Attendees</th>
                  <th>Facebook Event Page</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.events.map(event => (
                  <tr>
                    <td>{event.date}</td>
                    <td>{event.startTime}</td>
                    <td>{event.endTime}</td>
                    <td>{event.location}</td>
                    <td>{event.attendees}</td>
                    <td>{event.fbLink}</td>
                    <td />
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table>
              <thead>
                <h4> Attendees List </h4>
              </thead>
              <tbody>
                <Row style={{ marginBottom: '25px', marginTop: '30px' }}>
                  <ActionButton text="Strawberry" link="/interviewlist" />
                  <ActionButton text="Peach" link="/interviewlist" />
                  <ActionButton text="Mango" link="/interviewlist" />
                  <ActionButton text="Boba" link="/interviewlist" />
                  <ActionButton text="Pizza" link="/interviewlist" />
                  <ActionButton text="Snow" link="/interviewlist" />
                  <ActionButton text="Mango" link="/interviewlist" />
                </Row>
                <Row style={{ marginBottom: '25px', marginTop: '30px' }}>
                  <ActionButton text="Lime" link="/interviewlist" />
                  <ActionButton text="Orange" link="/interviewlist" />
                  <ActionButton text="Blueberry" link="/interviewlist" />
                  <ActionButton text="Hotdog" link="/interviewlist" />
                  <ActionButton text="Ice Cream" link="/interviewlist" />
                  <ActionButton text="Sorbet" link="/interviewlist" />
                </Row>
                <Row style={{ marginBottom: '25px', marginTop: '30px' }}>
                  <ActionButton text="Durian" link="/interviewlist" />
                  <ActionButton text="Strawberry" link="/interviewlist" />
                  <ActionButton text="Raspberry" link="/interviewlist" />
                  <ActionButton text="Pineapple" link="/interviewlist" />
                  <ActionButton text="Grapes" link="/interviewlist" />
                  <ActionButton text="Tomato" link="/interviewlist" />
                </Row>
              </tbody>
            </Table>
          </Container>
        </div>
      </>
    )
  }
}

export default Events
