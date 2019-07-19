import React from 'react'
import Router from 'next/router'
import { login, google } from '../utils/api'
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
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap'

type Props = {}

class LoginPage extends React.Component<Props> {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     currentKey: '',
  //     loading: false
  //   }
  // }
  // handleSubmit = async () => {
  //   this.setState({
  //     loading: true
  //   })
  //   const { success, result } = await validateKey(this.state.currentKey)
  //   if (success) {
  //     localStorage.setItem('interviewerKey', this.state.currentKey)
  //     localStorage.setItem('interviewerName', result.name)
  //     this.setState({
  //       loading: false
  //     })
  //     Router.push('/dashboard')
  //   } else {
  //     this.setState({
  //       loading: false
  //     })
  //     alert("Couldn't log in. Is your key correct?")
  //   }
  // }
  // onTextChange = e => {
  //   this.setState({ currentKey: e.target.value })
  // }
  // // handles when user presses "Enter" when input is focused
  // _handleKeyPress = e => {
  //   if (e.key === 'Enter') {
  //     this.handleSubmit()
  //   }
  // }
  // render() {
  //   return (
  //     <>
  //       <Head />
  //       <Nav />
  //       <Container>
  //         {this.state.loading ? (
  //           <Row className="login-loading-box">
  //             <Col md="4" />
  //             <Col md="2">
  //               <ReactLoading className="login-box" type="spinningBubbles" color="#000" />
  //             </Col>
  //           </Row>
  //         ) : (
  //           <div className="align-middle login-box">
  //             <h4>Enter Key:</h4>
  //             <Input
  //               autoFocus={true}
  //               type="text"
  //               value={this.state.currentKey}
  //               onChange={this.onTextChange}
  //               name="Input Key"
  //               placeholder="Input Your Key"
  //               onKeyPress={this._handleKeyPress}
  //             />
  //             <Button className="mt-3" color="primary" onClick={this.handleSubmit}>
  //               Login
  //             </Button>
  //           </div>
  //         )}
  //       </Container>
  //     </>
  //   )
  // }

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

  handleSubmit = async e => {
    // e.preventDefault()
    // const result = await login(this.state.email, this.state.password)
    // const resp = await result.json()
    // if (!resp.token) {
    //   this.setState({ errorMessage: resp.message })
    // } else {
    //   setCookie('token', resp.token)
    //   Router.push('/')
    // }
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
                <Button color="outline-secondary" onClick={this.handleSubmit()}>
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
        </Container>
      </>
    )
  }
}

export default LoginPage
