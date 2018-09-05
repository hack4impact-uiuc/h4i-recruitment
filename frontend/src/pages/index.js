import React from 'react'
import Router from 'next/router'
import { Button, Container, Input } from 'reactstrap'
import { validateKey } from '../utils/api'

type Props = {}

class LoginPage extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: ''
    }
  }
  handleSubmit = async () => {
    console.log(this.state.currentKey)
    const { success, result } = await validateKey(this.state.currentKey)
    if (success) {
      sessionStorage.setItem('interviewerKey', this.state.currentKey)
      sessionStorage.setItem('interviewerName', result.name)
      Router.push('/facemash')
    }
  }
  onTextChange = e => {
    console.log(this.state.currentKey)
    this.setState({ currentKey: e.target.value })
  }
  render() {
    return (
      <Container>
        <div className="align-middle login-box">
          <h4>Enter Key:</h4>
          <Input
            type="text"
            value={this.state.currentKey}
            onChange={this.onTextChange}
            name="Input Key"
            placeholder="Input Your Key"
          />
          <Button className="mt-3" color="primary" onClick={this.handleSubmit}>
            Login
          </Button>
        </div>
      </Container>
    )
  }
}

export default LoginPage
