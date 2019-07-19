// adapted heavily from H4I PI's register workflow examples found here:
// https://github.com/hack4impact-uiuc/infra-authentication-examples/blob/master/nextjs-client-example/pages/register.js

import { Component } from 'react'
import Router from 'next/router'
import { google, registerUser } from '../utils/api'
import { GoogleLogin } from 'react-google-login'
import Nav from '../components/nav'
import Head from '../components/head'
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
  Modal
} from 'reactstrap'

type Props = {}

class RegisterPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      dropdownOpen: false,
      errorMessage: ''
    }
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleGoogle = async e => {
    const result = await google(e.tokenId)
    const resp = await result.json()
    if (resp.status !== 200) {
      this.setState({ errorMessage: resp.message })
    } else {
      setCookie('token', e.tokenId)
      setCookie('google', true)
      Router.push('/')
    }
  }

  handleSubmit = () => {
    const { email, password, password2 } = this.state
    if (password != password2) {
        <Modal>Your passwords do not match!</Modal>
    }
    registerUser(email, password, 'member').then(resp => {
        if (resp.status === 400) {
            return (
              <Modal>Invalid Registration</Modal>
            )
          } else {
            Router.push('/dashboard')
          }
    })
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
            </CardBody>
          </Card>
          <GoogleLogin
            className="btn-lg sign-in-btn"
            clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
            responseType="id_token"
            scope="https://www.googleapis.com/auth/userinfo.email"
            onSuccess={this.handleGoogle}
            buttonText="Register with Google"
          />
        </Container>
      </>
    )
  }
}

export default RegisterPage
