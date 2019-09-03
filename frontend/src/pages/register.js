// adapted heavily from H4I PI's register workflow examples found here:
// https://github.com/hack4impact-uiuc/infra-authentication-examples/blob/master/nextjs-client-example/pages/register.js

import { Component } from 'react'
import Router from 'next/router'
import { registerUser, loginGoogleUser, addUser } from '../utils/api'
import { GoogleLogin } from 'react-google-login'
import Nav from '../components/nav'
import Head from '../components/head'
import { setCookie } from '../utils/cookieUtils'
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
  ModalHeader,
} from 'reactstrap'
import { permissionRolesEnum } from '../utils/enums'

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})"

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
      showInvalidRequestModal: false,
    }
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleCompleteRegister = resp => {
    const { firstName, lastName, email } = this.state

    addUser(firstName, lastName, resp.uid, email, permissionRolesEnum.PENDING).then(resp => {
      if (!resp.success) {
        console.log(`User ${firstName} ${lastName} was not successfully recorded`)
        this.setState({
          errorMessage:
            'Your account was successfully created, but not successfully recorded. Please contact an admin.',
          showInvalidRequestModal: true,
        })
      }
    })
  }

  handleGoogle = async e => {
    const resp = await loginGoogleUser(e.tokenId)
    console.log(resp)
    if (resp.status != 200) {
      this.setState({ errorMessage: resp.message, showInvalidRequestModal: true })
    } else {
      // set token value so google can access it
      setCookie('token', e.tokenId)
      // set google to true so server knows to send the request to google
      setCookie('google', true)
      Router.push('/pendingPage')
      localStorage.setItem('memberId', resp.uid)
      this.handleCompleteRegister(resp)
    }
  }

  handleSubmit = () => {
    const { email, password, passwordVerification } = this.state
    if (password !== passwordVerification) {
      this.setState({ errorMessage: 'Your passwords must match.', showInvalidRequestModal: true })
    } else {
      registerUser(email, password, permissionRolesEnum.PENDING).then(resp => {
        if (resp.status === 400) {
          console.log(resp)
          this.setState({
            errorMessage: resp.error || 'Please make sure you do not have an existing account.',
            showInvalidRequestModal: true,
          })
        } else {
          Router.push('/pendingPage')
          localStorage.setItem('memberId', resp.uid)
          this.handleCompleteRegister(resp)
        }
      })
    }
  }

  handleInvalidRequestModalClose = () => {
    this.setState({ showInvalidRequestModal: false })
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordVerification,
      errorMessage,
      showInvalidRequestModal,
    } = this.state
    return (
      <>
        <Head />
        <Nav />
        <Container>
          <Card className="register-card">
            <CardTitle>
              <h3 className="register-center-content">Register</h3>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">First Name</Label>
                  <Input name="firstName" value={firstName} onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Last Name</Label>
                  <Input name="lastName" value={lastName} onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    maxLength="64"
                    pattern={EMAIL_REGEX}
                    value={email}
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
                    value={password}
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
                    value={passwordVerification}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <div className="register-center-content">
                  <Button
                    color="success"
                    size="lg"
                    onClick={this.handleSubmit}
                    style={{ float: 'left', width: '48%' }}
                  >
                    Register
                  </Button>
                </div>
              </Form>
              {/* <GoogleLogin
                className="btn-lg sign-in-btn"
                clientId="850663969204-cuc9to9sgmodbdc0d3jbkadiq1bc4s7e.apps.googleusercontent.com"
                responseType="id_token"
                scope="https://www.googleapis.com/auth/userinfo.email"
                onSuccess={this.handleGoogle}
                buttonText="Register with Google"
              /> */}
            </CardBody>
          </Card>
          <div className="register-center-content">
            <Button
              color="outline-primary"
              onClick={() => {
                Router.push('/')
              }}
            >
              {'Already have an account? Login here.'}
            </Button>
          </div>
          <Modal autoFocus={false} isOpen={showInvalidRequestModal}>
            <ModalHeader>{'Your request was invalid.'}</ModalHeader>
            <ModalBody>{errorMessage || 'There was an error in your request.'}</ModalBody>
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
