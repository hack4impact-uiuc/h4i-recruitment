// adapted heavily from H4I PI's register workflow examples found here:
// https://github.com/hack4impact-uiuc/infra-authentication-examples/blob/master/nextjs-client-example/pages/register.js

import { Component } from 'react'
import Router from 'next/router'
import { google, registerUser, loginGoogleUser } from '../utils/api'
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

type Props = {}

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})"

class RegisterPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      errorMessage: '',
      showInvalidPasswordModal: false,
      showInvalidRequestModal: false,
      showInvalidGoogleRequestModal: false
    }
  }

  setCookie = (key, value) => {
    if (process.browser) {
      cookie.set(key, value, {
        expires: 1,
        path: '/'
      })
    }
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleGoogle = async e => {
    const result = await loginGoogleUser(e.tokenId)
    const resp = await result.json()
    if (resp.status !== 200) {
      this.setState({ errorMessage: resp.message, showInvalidGoogleRequestModal: true })
    } else {
      this.setCookie('token', e.tokenId)
      this.setCookie('google', true)
      alert('Account successfully created!')
      localStorage.setItem('interviewerKey', 'abcd') // TODO: Create switch statements for roles
      Router.push('/dashboard')
    }
  }

  handleSubmit = () => {
    const { email, password, password2 } = this.state
    if (password !== password2) {
      this.setState({ showInvalidPasswordModal: true })
    } else {
      registerUser(email, password, 'member').then(resp => {
        if (resp.status === 400) {
          this.setState({ showInvalidRequestModal: true })
        } else {
          localStorage.setItem('interviewerKey', 'abcd') // TODO: Create switch statements for roles
          Router.push('/dashboard')
        }
      })
    }
  }

  handleInvalidPasswordModalClose = () => {
    this.setState({ showInvalidPasswordModal: false })
  }

  handleInvalidRequestModalClose = () => {
    this.setState({ showInvalidRequestModal: false })
  }

  handleInvalidGoogleRequestModalClose = () => {
    this.setState({ showInvalidGoogleRequestModal: false })
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <Container>
          <Card className="interview-card" style={{ width: '400px', height: '60%' }}>
            <CardTitle>
              <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>Register</h3>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
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
                    name="password2"
                    minLength="8"
                    maxLength="64"
                    value={this.state.password2}
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
                clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
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
            <ModalBody>{'Please make sure you do not have an existing account.'}</ModalBody>
            <ModalFooter>
              <Button onClick={this.handleInvalidRequestModalClose} color="secondary">
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Modal autoFocus={false} isOpen={this.state.showInvalidPasswordModal}>
            <ModalBody>{'Your passwords must match.'}</ModalBody>
            <ModalFooter>
              <Button onClick={this.handleInvalidPasswordModalClose}>Close</Button>
            </ModalFooter>
          </Modal>
          <Modal autoFocus={false} isOpen={this.state.showInvalidGoogleRequestModal}>
            <ModalHeader>{'There was an error in your request.'}</ModalHeader>
            <ModalBody>
              {this.state.errorMessage !== null
                ? this.state.errorMessage
                : 'There was an error in your request'}
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleInvalidGoogleRequestModalClose} color="secondary">
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
