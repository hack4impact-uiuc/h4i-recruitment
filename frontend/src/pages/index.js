import React from 'react'
import Router from 'next/router'
import { Button, Container, Input, Row, Col } from 'reactstrap'
import { validateKey } from '../utils/api'
import ReactLoading from 'react-loading'
import Nav from '../components/nav'

type Props = {}

class LoginPage extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: '',
      loading: false
    }
  }
  handleSubmit = async () => {
    this.setState({
      loading: true
    })
    const { success, result } = await validateKey(this.state.currentKey)
    if (success) {
      localStorage.setItem('interviewerKey', this.state.currentKey)
      localStorage.setItem('interviewerRoleIsLead', result.is_lead)
      localStorage.setItem('interviewerName', result.name)
      this.setState({
        loading: false
      })
      Router.push('/dashboard')
    } else {
      this.setState({
        loading: false
      })
      alert("Couldn't log in. Is your key correct?")
    }
  }
  onTextChange = e => {
    this.setState({ currentKey: e.target.value })
  }
  // handles when user presses "Enter" when input is focused
  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }
  render() {
    return (
      <>
        <Nav />
        <Container>
          {this.state.loading ? (
            <Row className="login-loading-box">
              <Col md="4" />
              <Col md="2">
                <ReactLoading className="login-box" type="spinningBubbles" color="#000" />
              </Col>
            </Row>
          ) : (
            <div className="align-middle login-box">
              <h4>Enter Key:</h4>
              <Input
                autoFocus={true}
                type="text"
                value={this.state.currentKey}
                onChange={this.onTextChange}
                name="Input Key"
                placeholder="Input Your Key"
                onKeyPress={this._handleKeyPress}
              />
              <Button className="mt-3" color="primary" onClick={this.handleSubmit}>
                Login
              </Button>
            </div>
          )}
        </Container>
      </>
    )
  }
}

export default LoginPage
