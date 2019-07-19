import React from 'react'
import Router from 'next/router'
import { login, google, loginUser, loginGoogleUser } from '../utils/api'
import ReactLoading from 'react-loading'
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
  Modal
} from 'reactstrap'
import cookie from 'js-cookie'

type Props = {}

class LoginPage extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showModal: false
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
    const result = await google(e.tokenId)
    const resp = await result.json()
    if (resp.status !== 200) {
      this.setState({ errorMessage: resp.message })
    } else {
      this.setCookie('token', e.tokenId)
      this.setCookie('google', true)
      localStorage.setItem('interviewerKey', 'abcd') // TODO: Create switch statements for roles  
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
      if (resp.status === 400) {
        this.setState({ showModal: true })
      } else {
        localStorage.setItem('interviewerKey', 'abcd')
        Router.push('/dashboard')
      }
    })
  }

  handleModalClose = () => {
    this.setState({ showModal: false })
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
                // style={{ float: "right", width: "49%" }}
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
          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            Invalid Login
          </Modal>
        </Container>
      </>
    )
  }
}

export default LoginPage
