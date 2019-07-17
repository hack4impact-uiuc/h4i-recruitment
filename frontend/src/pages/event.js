import React, { Component } from 'react'
import { Table, Row, Button, Col, FormGroup, Label, Input, Container } from 'reactstrap'
import ActionButton from '../components/actionButton'
import Nav from '../components/nav'
import Head from '../components/head'
import { getEventById, getEventAttendees } from '../utils/api'
import Router from 'next/router'
import Link from 'next/link'

class Event extends React.Component<Props> {
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

    const res = await getEventAttendees(query.id)
    this.setState({
      attendees: res.result
    })
    console.log(this.state.attendees)
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <div className="page-content-wrapper">
          <Container fluid>
            <h2>{this.state.name}</h2>
            <Table>
              <thead>
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
                  <tr>
                    <td>{this.state.date}</td>
                    <td>{this.state.startTime}</td>
                    <td>{this.state.endTime}</td>
                    <td>{this.state.location}</td>
                    <td>{this.state.attendeeEmails.length}</td>
                    <td>{this.state.fbLink}</td>
                    <td />
                  </tr>
              </tbody>
            </Table>
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
                  {this.state.attendees.map(attendee => 
                  attendee.isCandidate ? 
                  (
                    <tr key={attendee._id}>
                      <td>
                      <Link href={{ pathname: '/candidate', query: { id: attendee.candidateId} }}>
                        <a className="regular-anchor">{attendee.name}</a>
                      </Link>
                      </td>
                      <td>{attendee.email}</td>
                      <td>{attendee.year}</td>
                    </tr>
                  ):
                    <tr key={attendee._id}>
                      <td>
                      <Link href={{ pathname: '/attendee', query: { email: attendee.email } }}>
                        <a className="regular-anchor">{attendee.name}</a>
                      </Link>
                      </td>
                      <td>{attendee.email}</td>
                      <td>{attendee.year}</td>
                    </tr>
                  )}
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
