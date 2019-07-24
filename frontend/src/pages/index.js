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
import cookie from 'js-cookie'

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

  setCookie = (key, value) => {
    if (process.browser) {
      cookie.set(key, value, {
        expires: 1,
        path: '/'
      })
    }
  }

  handleGoogle = async e => {
    const result = await loginGoogleUser(e.tokenId)
    const resp = await result.json()
    if (resp.status !== 200) {
      this.setState({ errorMessage: resp.message, showInvalidRequestModal: true })
      console.log(resp.message)
    } else {
      this.setCookie('token', e.tokenId)
      this.setCookie('google', true)
      localStorage.setItem('interviewerKey', 'ohno') // TODO: Create switch statements for roles
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
    loginUser(email, password).then(resp => {
      if (resp.status !== 200) {
        this.setState({ showInvalidRequestModal: true })
      } else {
        localStorage.setItem('interviewerKey', 'ohno')
        Router.push('/dashboard')
      }
    })
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
          <Card className="login-card" style={{ width: '400px', height: '60%' }}>
            <CardTitle>
              <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>Login</h3>
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
                clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
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
            <ModalBody>
              {this.state.errorMessage
                ? this.state.errorMessage
                : 'There was an error in your request'}
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

export default LoginPage
