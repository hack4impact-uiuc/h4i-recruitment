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

  render() {
    return (
      <>
        <Head />
        <Nav />
        <Card className="login-card">
          <CardTitle>
            <h3 className="register-center-content">Login</h3>
          </CardTitle>
          <CardBody>
            <a className="action-button blue" href={getURLForEndpoint('api/login')}>
              Google Login
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
