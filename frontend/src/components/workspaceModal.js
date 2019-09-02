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
  ModalFooter,
} from 'reactstrap'

class WorkspaceModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: '',
    }
  }

  handleKeyPress = async event => {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit = async () => {
    const success = await this.props.onSubmit()
    if (success) {
      Router.push({ pathname: this.props.pathname })
    } else {
      this.setState({
        alert: this.props.alert,
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
    this.props.toggle()
  }

  render() {
    const alert = <Alert color="danger">{this.state.alert}</Alert>
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader>{this.props.title}</ModalHeader>
        <ModalBody>
          {this.state.alert && alert}
          <Form>
            {this.props.formFields.map((field, index) => (
              <FormGroup key={index}>
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
      </Modal>
    )
  }
}

export default WorkspaceModal
// when it updates one, it pushes that one to the top but keeps rendering it like it was before, i think
