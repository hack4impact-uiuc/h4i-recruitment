// adapted heavily from H4I PI's register workflow examples found here:
// https://github.com/hack4impact-uiuc/infra-authentication-examples/blob/master/nextjs-client-example/pages/register.js

import { Component } from 'react'
import Router from 'next/router'
import { registerUser, loginGoogleUser, addUser } from '../utils/api'
import { GoogleLogin } from 'react-google-login'
import Nav from '../components/nav'
import Head from '../components/head'
import cookie from 'js-cookie'
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
  ModalFooter,
  ModalHeader
} from 'reactstrap'
import { permissionRolesEnum } from '../utils/enums'

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})"
const MEMBER_KEY = 'ohno'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordVerification: '',
      errorMessage: '',
      showInvalidRequestModal: false
    }
  }

  // use cookie to hold information that is valid across the whole site
  setCookie = (key, value) => {
    const cookieExpirationDays = 1
    if (process.browser) {
      cookie.set(key, value, {
        expires: cookieExpirationDays,
        path: '/'
      })
    }
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleSuccessfulRegister = resp => {
    const { firstName, lastName, email } = this.state
    localStorage.setItem('interviewerKey', MEMBER_KEY) // TODO: Create switch statements for roles - Issue #314
    Router.push('/dashboard')

    addUser(firstName, lastName, email, resp.token, permissionRolesEnum.PENDING).then(resp => {
      if (!resp.success) {
        console.log(`User ${firstName} ${lastName} was not successfully created.`)
        console.log(resp)
      }
    })
  }

  handleGoogle = async e => {
    const result = await loginGoogleUser(e.tokenId)
    const resp = await result.json()
    if (!resp.success) {
      this.setState({ errorMessage: resp.message, showInvalidRequestModal: true })
    } else {
      // set token value so google can access it
      this.setCookie('token', e.tokenId)
      // set google to true so server knows to send the request to google
      this.setCookie('google', true)
      // set localStorage value so it's valid across the whole site
      this.handleSuccessfulRegister(resp)
    }
  }

  handleSubmit = () => {
    const { email, password, passwordVerification } = this.state
    if (password !== passwordVerification) {
      this.setState({ errorMessage: 'Your passwords must match.', showInvalidRequestModal: true })
    } else {
      registerUser(email, password, permissionRolesEnum.PENDING).then(resp => {
        console.log(resp)
        if (resp.status === 400) {
          this.setState({
            errorMessage: 'Please make sure you do not have an existing account.',
            showInvalidRequestModal: true
          })
        } else {
          this.handleSuccessfulRegister(resp)
        }
      })
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
              <h3 className="login-title">Register</h3>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">First Name</Label>
                  <Input
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Last Name</Label>
                  <Input
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    maxLength="64"
                    pattern={EMAIL_REGEX}
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
                <FormGroup>
                  <Label for="examplePassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="passwordVerification"
                    minLength="8"
                    maxLength="64"
                    value={this.state.passwordVerification}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <Button
                  color="success"
                  size="lg"
                  onClick={this.handleSubmit}
                  style={{ float: 'left', width: '48%' }}
                >
                  Register
                </Button>
              </Form>
              <GoogleLogin
                className="btn-lg sign-in-btn"
                clientId="409847273934-jmhjkeu77d3cqr32sh3vpl3ogh2f4dev.apps.googleusercontent.com"
                responseType="id_token"
                scope="https://www.googleapis.com/auth/userinfo.email"
                onSuccess={this.handleGoogle}
                buttonText="Register with Google"
              />
            </CardBody>
          </Card>
          <Button
            color="outline-primary"
            onClick={() => {
              Router.push('/')
            }}
          >
            {'Already have an account? Login here.'}
          </Button>
          <Modal autoFocus={false} isOpen={this.state.showInvalidRequestModal}>
            <ModalHeader>{'Your request was invalid.'}</ModalHeader>
            <ModalBody>
              {this.state.errorMessage || 'There was an error in your request.'}
            </ModalBody>
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

export default RegisterPage
