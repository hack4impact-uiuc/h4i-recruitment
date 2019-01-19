// @flow
import { Component, Fragment } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  NavLink,
  Container
} from 'reactstrap'
import { validateKey, getKey } from '../utils/api'

class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      loggedIn: false,
      username: null
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  logout = () => {
    sessionStorage.removeItem('interviewerKey')
    this.setState({ loggedIn: false })
    alert('Logged Out!')
    Router.push('/')
  }
  async handleSubmit() {
    this.setState({
      isOpen: false
    })
    const { success, result } = await validateKey(this.state.currentKey)
    if (success) {
      sessionStorage.setItem('interviewerKey', this.state.currentKey)
      sessionStorage.setItem('interviewerName', result.name)
      Router.push('/dashboard')
    }
    this.setState({
      loggedIn: true,
      username: result.name
    })
  }
  onTextChange = e => {
    this.setState({ currentKey: e.target.value })
  }
  componentDidMount() {
    if (getKey() != undefined) {
      this.setState({
        loggedIn: true,
        username: sessionStorage.getItem('interviewerName')
      })
    }
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
        <Navbar style={{ backgroundColor: '#155DA1' }} light className="fixed p-3" expand="sm">
          <Link prefetch href={this.state.loggedIn ? '/dashboard' : '/'}>
            <NavbarBrand className="ml-3">
              <img id="logo-img" height="35" width="200" src="https://h4i-white-logo.now.sh" />
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="ml-auto">
              {this.state.loggedIn ? (
                <div className="nav-bar-name pr-3">
                  Welcome {this.state.username ? this.state.username : null}!
                </div>
              ) : null}
              <Link prefetch href="/dashboard">
                <a className="nav-bar-link pl-3">Dashboard</a>
              </Link>
              <Link prefetch href="/analytics">
                <a className="nav-bar-link pl-3">Analytics</a>
              </Link>
              <Link prefetch href="/facemash">
                <a className="nav-bar-link pl-3">Facemash</a>
              </Link>
              <Link prefetch href="/interviewportal">
                <a className="nav-bar-link pl-3">Interview Portal</a>
              </Link>
              <Link prefetch href="/interviewschedule">
                <a className="nav-bar-link pl-3">Interview Schedule</a>
              </Link>
              <Nav navbar>
                <Link prefetch href="/table">
                  <a className="nav-bar-link pl-3">Table View</a>
                </Link>
              </Nav>
              <Nav navbar>
                <Link prefetch href="/stats">
                  <a className="nav-bar-link pl-3">Emails/Stats</a>
                </Link>
              </Nav>
              <Nav navbar>
                {!this.state.loggedIn ? (
                  <a className="nav-bar-link pl-3" href="#" onClick={this.toggle}>
                    Login
                  </a>
                ) : (
                  <a className="nav-bar-link pl-3" href="#" onClick={this.logout}>
                    Logout
                  </a>
                )}
              </Nav>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <Modal autoFocus={false} isOpen={this.state.isOpen}>
            <ModalHeader>Login to Your Interview Portal</ModalHeader>
            <ModalBody>
              <Input
                autoFocus={true}
                type="text"
                onChange={this.onTextChange}
                name="Input Key"
                placeholder="Input Your Key"
                onKeyPress={this._handleKeyPress}
              />
            </ModalBody>
            <ModalFooter>
              <Link prefetch href="/">
                <Button onClick={this.toggle} color="secondary">
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={e => {
                  this.handleSubmit()
                }}
                color="primary"
              >
                Submit
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    )
  }
}

export default NavigationBar
