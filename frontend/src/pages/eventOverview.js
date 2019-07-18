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
import { getAllEvents, createEvent } from '../utils/api'
import Head from '../components/head'
import Link from 'next/link'

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
            <Modal isOpen={this.state.modal}>
              <ModalHeader>Add New Event</ModalHeader>
              <ModalBody>
                {alert}
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      placeholder="i.e. Product Showcase"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Date</Label>
                    <Input
                      name="date"
                      type="date"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Start Time</Label>
                    <Input
                      name="startTime"
                      type="time"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>End Time</Label>
                    <Input
                      name="endTime"
                      type="time"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      name="location"
                      placeholder="i.e. ECEB"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      name="description"
                      type="textarea"
                      placeholder="i.e. Teams present their final product."
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Facebook Event Link</Label>
                    <Input
                      name="fbLink"
                      type="url"
                      placeholder="i.e. https://www.facebook.com/events/2405129342892922/"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleModal}>
                  Cancel
                </Button>
                <Button color="primary" onClick={this.addEvent}>
                  Submit
                </Button>
              </ModalFooter>
            </Modal>
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
