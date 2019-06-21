import React from 'react'
import Router from 'next/router'
import {
  Table,
  Row,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import ActionButton from '../components/actionButton'
import Nav from '../components/nav'
import { getAllEvents, createEvent } from '../utils/api'

class EventOverview extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      modal: false,
      name: '',
      date: '',
      startTime: 0,
      endTime: 0,
      location: '',
      description: ''
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

  openModal = () => {
    this.setState({ modal: true })
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.addEvent()
    }
  }

  addEvent = async () => {
    let event = {
      name: this.state.name,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      location: this.state.location,
      description: this.state.description
    }
    await createEvent(event)
    this.closeModal()
    Router.push({ pathname: '/eventoverview' })
  }

  render() {
    return (
      <>
        <Nav />
        <div className="page-content-wrapper">
          <Container fluid>
            <Modal isOpen={this.state.modal}>
              <ModalHeader>Add New Event</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      placeholder="i.e. Product Showcase"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Date</Label>
                    <Input name="date" placeholder="i.e. 06/20/19" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Start Time</Label>
                    <Input name="startTime" placeholder="i.e. 5" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>End Time</Label>
                    <Input name="endTime" placeholder="i.e. 6" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input name="location" placeholder="i.e. ECEB" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      name="description"
                      placeholder="i.e. Teams present their final product."
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.closeModal}>
                  Cancel
                </Button>
                <Button color="primary" onClick={this.addEvent}>
                  Submit
                </Button>
              </ModalFooter>
            </Modal>
            <Table>
              <thead>
                <ActionButton
                  style={{ marginBottom: 15 }}
                  text="Add New Event"
                  onClick={this.openModal}
                />
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Attendees</th>
                  <th>Facebook Event Link</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.events.map(event => (
                  <tr>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                    <td>{event.startTime}</td>
                    <td>{event.endTime}</td>
                    <td>{event.location}</td>
                    <td>{event.attendees.length}</td>
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
