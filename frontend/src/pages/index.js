import React from 'react'
import { Component } from 'react'
import Router from 'next/router'
import { loginUser, loginGoogleUser } from '../utils/api'
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
  ModalFooter
} from 'reactstrap'
import { setCookie } from '../utils/cookieUtils'

const MEMBER_KEY = 'ohno'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      showInvalidRequestModal: false
    }
  }

  handleGoogle = async e => {
    const result = await loginGoogleUser(e.tokenId)
    const response = await result.json()
    if (!response.success) {
      this.setState({ errorMessage: response.message, showInvalidRequestModal: true })
    } else {
      // set token value so google can access it
      setCookie('token', e.tokenId)
      // set google to true so server knows to send the request to google
      setCookie('google', true)
      // set localStorage value so it's valid across the whole site
      localStorage.setItem('interviewerKey', MEMBER_KEY) // TODO: Create switch statements for roles - Issue #314
      Router.push('/dashboard')
    }
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    console.log(`Logging in ${email}`)
    loginUser(email, password).then(response => {
      if (response.status != 200) {
        console.log(response)
        this.setState({ showInvalidRequestModal: true })
      } else {
        this.setRoleKey(response.role)
      }
    })
  }

  setRoleKey = role => {
    if (role != 'Pending') {
      if (role === 'Director') {
        localStorage.setItem('interviewerKey', DIRECTOR_KEY)
      } else if (role === 'Lead') {
        localStorage.setItem('interviewerKey', LEAD_KEY)
      } else {
        localStorage.setItem('interviewerKey', MEMBER_KEY)
      }
      Router.push('/dashboard')
    } else {
      Router.push('/pendingPage')
    }
  }

  handleInvalidRequestModalClose = () => {
    this.setState({ showInvalidRequestModal: false })
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <Container>
          <Card className="login-card">
            <CardTitle>
              <h3 className="login-title">Login</h3>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    maxLength="64"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    minLength="8"
                    maxLength="64"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <Button color="outline-secondary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Form>

              <GoogleLogin
                className="btn sign-in-btn"
                clientId="409847273934-jmhjkeu77d3cqr32sh3vpl3ogh2f4dev.apps.googleusercontent.com"
                responseType="id_token"
                buttonText={this.props.role}
                scope="https://www.googleapis.com/auth/userinfo.email"
                onSuccess={this.handleGoogle}
              />
            </CardBody>
          </Card>
          <Button color="outline-primary" onClick={() => Router.push('/register')}>
            {"Don't have an account? Register here!"}
          </Button>
          <Modal autoFocus={false} isOpen={this.state.showInvalidRequestModal}>
            <ModalHeader>{'There was an error in your request.'}</ModalHeader>
            <ModalBody>{this.state.errorMessage || 'There was an error in your request'}</ModalBody>
            <ModalFooter>
              <Button onClick={this.handleInvalidRequestModalClose} color="secondary">
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    )
  }
}

export default LoginPage
