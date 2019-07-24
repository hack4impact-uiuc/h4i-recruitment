import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
import { getEventById, getEventAttendees } from '../utils/api'
import Router from 'next/router'
import Link from 'next/link'

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
        attendeeEmails: result.attendeeEmails
      })

    const { result: res } = await getEventAttendees(query.id)
    this.setState({
      attendees: res != undefined ? res : []
    })
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
