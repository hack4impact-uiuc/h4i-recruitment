import React from 'react'
import { Component } from 'react'
import Router from 'next/router'
import Nav from '../components/nav'
import Head from '../components/head'
import { GoogleLogin } from 'react-google-login'
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap'
import { setCookie } from '../utils/cookieUtils'
import { permissionRolesEnum } from '../utils/enums'
import { validateUser } from '../utils/api'
import { getURLForEndpoint } from '../utils/apiHelpers'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      showInvalidRequestModal: false,
    }
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleInvalidRequestModalClose = () => {
    this.setState({ showInvalidRequestModal: false })
  }

  componentDidMount = () => {
    validateUser().then(res => {
      if (res.success) {
        Router.push(res.result.role !== 'Pending' ? '/dashboard' : '/pendingPage')
      }
    })
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <Card className="login-card">
          <CardTitle>
            <h3 className="register-center-content">Welcome</h3>
          </CardTitle>
          <CardBody>
            <a id="login-button" href={getURLForEndpoint('/login')}>
              <span>Sign in with Google</span>
            </a>
          </CardBody>
        </Card>
        <Modal autoFocus={false} isOpen={this.state.showInvalidRequestModal}>
          <ModalHeader>{'There was an error in your request.'}</ModalHeader>
          <ModalBody>{this.state.errorMessage || 'There was an error in your request'}</ModalBody>
          <ModalFooter>
            <Button onClick={this.handleInvalidRequestModalClose} color="secondary">
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default LoginPage
