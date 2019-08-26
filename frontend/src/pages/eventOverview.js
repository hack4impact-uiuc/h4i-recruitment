import React, { Component } from 'react'
import { Table, Container } from 'reactstrap'
import { ActionButton } from '../components/common'
import Nav from '../components/nav'
import { getAllEvents, createEvent } from '../utils/api'
import Head from '../components/head'
import Link from 'next/link'
import EventsModal from '../components/eventsModal'
import { newEventFields } from '../utils/formFields'

class EventOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      modal: false,
    }
  }

  async componentDidMount() {
    await this.getEvents()
  }

  getEvents = async () => {
    const { success, result } = await getAllEvents()
    if (success) {
      this.setState({
        events: result,
      })
    }
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  addEvent = async () => {
    const event = {
      name: this.state.name,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      location: this.state.location,
      description: this.state.description,
      fbLink: this.state.fbLink,
    }
    const { success } = await createEvent(event)
    return success
  }

  render() {
    return (
      <>
        <Head title="Events" />
        <Nav />
        <div className="page-content-wrapper">
          <Container fluid>
            <EventsModal
              title="Add New Event"
              isOpen={this.state.modal}
              formFields={newEventFields}
              toggle={this.toggleModal}
              onSubmit={this.addEvent}
              onReload={this.getEvents}
              handleChange={this.handleChange}
              alert="All fields are required."
            />
            <ActionButton
              className="button-margin"
              text="Add New Event"
              onClick={this.toggleModal}
            />
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Attendees</th>
                  <th>Facebook Event Link</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.events.map(event => (
                  <tr key={event._id}>
                    <td>
                      <Link href={{ pathname: '/event', query: { id: event._id } }}>
                        <a className="regular-anchor">{event.name}</a>
                      </Link>
                    </td>
                    <td>{event.date}</td>
                    <td>{`${event.startTime} - ${event.endTime}`}</td>
                    <td>{event.location}</td>
                    <td>{event.attendeeEmails.length}</td>
                    <td>{event.fbLink}</td>
                    <td />
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

export default EventOverview
