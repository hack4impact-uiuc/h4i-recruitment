import { Component } from 'react'
import Router from 'next/router'
import ReactLoading from 'react-loading'
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
  ModalFooter,
} from 'reactstrap'

class EventsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: '',
      loading: false,
    }
  }

  handleKeyPress = async event => {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit = async () => {
    const success = await this.props.onSubmit()
    this.setState({
      loading: true,
    })

    if (success) {
      await this.props.onReload()
      this.closeModal()
    } else {
      this.setState({
        alert: this.props.alert,
        loading: false,
      })
    }
  }

  closeModal = () => {
    // remove err message upon close
    if (this.state.alert) {
      this.setState({
        alert: '',
      })
    }
    this.setState({
      loading: false,
    })
    this.props.toggle()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader>{this.props.title}</ModalHeader>
        {this.state.loading ? (
          <ReactLoading className="loader" type="spinningBubbles" color="#000" />
        ) : (
          <>
            <ModalBody>
              {this.state.alert && <Alert color="danger">{this.state.alert}</Alert>}
              <Form>
                {this.props.formFields.map(field => (
                  <FormGroup>
                    <Label>{field.label}</Label>
                    <Input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={this.props.handleChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </FormGroup>
                ))}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.closeModal}>
                Cancel
              </Button>
              <Button color="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    )
  }
}

export default EventsModal
