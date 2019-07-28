import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
import { getEventById, getEventAttendees, eventCheckin } from '../utils/api'
import Router from 'next/router'
import Link from 'next/link'
import ActionButton from '../components/actionButton'
import EventsModal from '../components/eventsModal'
import { newAttendeeFields } from '../utils/formFields'

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      fbLink: '',
      attendeeEmails: [],
      attendees: []
    }
  }

  async componentDidMount() {
    const { query } = Router
    const { result } = await getEventById(query.id)
    result &&
      this.setState({
        name: result.name,
        date: result.date,
        startTime: result.startTime,
        endTime: result.endTime,
        location: result.location,
        description: result.description,
        fbLink: result.fbLink,
        attendeeEmails: result.attendeeEmails,
        id: query.id
      })

    const { result: res } = await getEventAttendees(query.id)
    this.setState({
      attendees: res != undefined ? res : []
    })
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addAttendee = async () => {
    const attendee = {
      name: this.state.name,
      email: this.state.email,
      year: this.state.year
    }
    const { success } = await eventCheckin(attendee, this.state.id)
    return success
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <div className="page-content-wrapper">
          <Container fluid>
            <h1 className="event-details">{this.state.name}</h1>
            <h5 className="event-details">
              <b>Date: </b>
              {this.state.date}
            </h5>
            <h5 className="event-details">
              <b>Time: </b>
              {`${this.state.startTime}-${this.state.endTime}`}
            </h5>
            <h5 className="event-details">
              <b>Location: </b>
              {this.state.location}
            </h5>
            <h5 className="event-details">
              <b>Facebook Link: </b>
              {this.state.fbLink}
            </h5>
            <h6 className="event-details">{this.state.description}</h6>

            <EventsModal
              title="Check In Attendee"
              isOpen={this.state.modal}
              formFields={newAttendeeFields}
              toggle={this.toggleModal}
              onSubmit={this.addAttendee}
              handleChange={this.handleChange}
              alert="All fields are required."
              pathname="/event"
            />

            <ActionButton className="button-margin" text="Check In" onClick={this.toggleModal} />

            <div className="attendee-list">
              <h3>Attendees List</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.attendees.map(attendee => (
                    <tr key={attendee._id}>
                      <td>
                        {attendee.candidateId ? (
                          <Link
                            href={{ pathname: '/candidate', query: { id: attendee.candidateId } }}
                          >
                            <a className="regular-anchor">{attendee.name}</a>
                          </Link>
                        ) : (
                          attendee.name
                        )}
                      </td>
                      <td>{attendee.email}</td>
                      <td>{attendee.year}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
      </>
    )
  }
}

export default Event
