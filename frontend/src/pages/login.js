import { Component } from 'react'
import { Modal, Container, Button, Input, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Router from 'next/router'
import Link from 'next/link'
import { validateKey } from '../utils/api'

// Main app
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: ''
    }
  }
  async handleSubmit() {
    const { success } = await validateKey(this.state.currentKey)
    if (success) {
      localStorage.setItem('interviewerKey', this.state.currentKey)
      Router.push('/dashboard')
    }
  }
  onTextChange = e => {
    this.setState({ currentKey: e.target.value })
  }

  render() {
    return (
      <Container>
        <Modal isOpen={true} autoFocus={false}>
          <ModalHeader>Login to Your Interview Portal</ModalHeader>
          <ModalBody>
            <Input
              autoFocus={true}
              ref={input => input && input.focus()}
              type="text"
              onChange={this.onTextChange}
              name="Input Key"
              placeholder="Input Your Key"
            />
          </ModalBody>
          <ModalFooter>
            <Link prefetch href="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            <Button
              onClick={e => {
                this.handleSubmit()
              }}
              color="primary"
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}
export default Login
