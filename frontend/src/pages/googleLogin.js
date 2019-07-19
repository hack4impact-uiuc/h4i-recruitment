import { Component } from 'react'
import Router from 'next/router'
import { register, google } from '../utils/api'
import { GoogleLogin } from 'react-google-login'
import { Link } from 'react-router-dom'

// this page should eventually replace the current Login.js
// I wanted to have a temp page to work with before replacing it
type Props = {}

class LoginPage extends Component<Props> {
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

  render() {
    return (
      <>
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
              <Button className="login-button">Submit onClick={this.handleSubmit()}</Button>
            </Form>

            <GoogleLogin
              className="login-button btn sign-in-btn"
              // style={{ float: "right", width: "49%" }}
              clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
              responseType="id_token"
              buttonText={this.props.role}
              scope="https://www.googleapis.com/auth/userinfo.email"
              onSuccess={this.handleGoogle}
            />
          </CardBody>
        </Card>
        <Button onClick={() => Router.push('/register')}>
          Don't have an account? Register here!
        </Button>
      </>
    )
  }
}

export default LoginPage
