import { Modal, Container, Button, Input, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

type Props = {}

// Main app
class Login extends Component<Props> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <Head title="Login" />
        <Nav />
        <Modal isOpen={true} >
          <ModalHeader >Login to Your Interview Portal</ModalHeader>
          <ModalBody>
            <Input type="text" name="Input Key" placeholder="Input Your Key"/>  
          </ModalBody>
          <ModalFooter>
            <Link prefetch href="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            {' '}
            <Link prefetch href="/interviewportal">
              <Button color="primary">Submit</Button>
            </Link>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}
export default Login
