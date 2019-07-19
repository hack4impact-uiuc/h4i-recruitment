import { Component } from 'react'
import Router from 'next/router'
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { createEvent } from '../utils/api'

class EventsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: ''
    }
  }

  addEvent = async () => {
    const event = {
      name: this.state.name ? this.state.name : '',
      date: this.state.date ? this.state.date : '',
      startTime: this.state.startTime ? this.state.startTime : '',
      endTime: this.state.endTime ? this.state.endTime : '',
      location: this.state.location ? this.state.location : '',
      description: this.state.description ? this.state.description : '',
      fbLink: this.state.fbLink ? this.state.fbLink : ''
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

  render() {
    const alert = this.state.alert ? <Alert color="danger">{this.state.alert}</Alert> : null
    return (
      <>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            {alert}
            <Form>
              {this.props.formFields.map(field => (
                <FormGroup>
                  <Label>{field.label}</Label>
                  <Input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                  />
                </FormGroup>
              ))}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.addEvent}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default EventsModal
