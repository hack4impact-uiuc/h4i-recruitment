import React, { Component } from 'react'
import Router from 'next/router'
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap'
import ActionButton from '../components/actionButton'
import Nav from '../components/nav'
import { getAllEvents } from '../utils/api'
import Head from '../components/head'
import Link from 'next/link'
import EventsModal from '../components/eventsModal'

class EventOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      modal: false,
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      fbLink: '',
      alert: ''
    }
  }

  async componentDidMount() {
    const events = await getAllEvents()
    if (events) {
      this.setState({
        events: events.result
      })
    }
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

  handleKeyPress = async event => {
    if (event.key === 'Enter') {
      await this.addEvent()
    }
  }

  addEvent = async () => {
    const event = {
      name: this.state.name,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      location: this.state.location,
      description: this.state.description,
      fbLink: this.state.fbLink
    }
    const { code } = await createEvent(event)
    if (code === 500) {
      this.setState({
        alert: 'All fields are required.'
      })
    } else {
      Router.push({ pathname: '/eventOverview' })
    }
  }

  render() {
    const alert = this.state.alert ? <Alert color="danger">{this.state.alert}</Alert> : null
    return (
      <>
        <Head title="Events" />
        <Nav />
        <div className="page-content-wrapper">
          <Container fluid>
            <EventsModal
              title="Add New Event"
              isOpen={this.state.modal}
              formFields={[
                {
                  label: 'Name',
                  name: 'name',
                  type: '',
                  placeholder: 'i.e. Product Showcase'
                },
                {
                  label: 'Date',
                  name: 'date',
                  type: 'date',
                  placeholder: ''
                },
                {
                  label: 'Start Time',
                  name: 'startTime',
                  type: 'time',
                  placeholder: ''
                },
                {
                  label: 'End Time',
                  name: 'endTime',
                  type: 'time',
                  placeholder: ''
                },
                {
                  label: 'Location',
                  name: 'location',
                  type: '',
                  placeholder: 'i.e. ECEB'
                },
                {
                  label: 'Description',
                  name: 'description',
                  type: 'textarea',
                  placeholder: 'i.e. Teams present their final product.'
                },
                {
                  label: 'Facebook Event Link',
                  name: 'fbLink',
                  type: 'url',
                  placeholder: 'i.e. https://www.facebook.com/events/2405129342892922/'
                }
              ]}
              toggle={this.toggleModal}
              onSubmit={this.addEvent}
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
