// @flow
import { Component } from 'react'
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
  Container,
  NavItem
} from 'reactstrap'
import { validateKey, getKey, getRound } from '../utils/api'
import roundData from '../data/roundData.js'
import { setRoundRedux } from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  round: state.round
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setRoundRedux
    },
    dispatch
  )
}
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
    localStorage.removeItem('interviewerKey')
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
      localStorage.setItem('interviewerKey', this.state.currentKey)
      localStorage.setItem('interviewerName', result.name)
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
  async componentDidMount() {
    if (getKey() != undefined) {
      this.setState({
        loggedIn: true,
        username: localStorage.getItem('interviewerName')
      })
    }
    const res = await getRound()
    if (res.result) {
      this.props.setRoundRedux(res.result.round)
    } else {
      this.props.setRoundRedux(0)
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
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="ml-auto">
              {this.state.loggedIn ? (
                <NavItem>
                  <div className="nav-bar-name pr-3">
                    Welcome {this.state.username ? this.state.username : null}!
                  </div>
                </NavItem>
              ) : null}
              <NavItem>
                <Link prefetch href="/dashboard">
                  <a className="nav-bar-link pl-3">Dashboard</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link prefetch href="/analytics">
                  <a className="nav-bar-link pl-3">Analytics</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  prefetch
                  href={
                    roundData.rounds[this.props.round].type == 'interview'
                      ? '/interviewportal'
                      : '/facemash'
                  }
                >
                  <a className="nav-bar-link pl-3">{roundData.rounds[this.props.round].name}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link prefetch href="/interviewschedule">
                  <a className="nav-bar-link pl-3">Interview Schedule</a>
                </Link>
              </NavItem>

              <NavItem>
                <Link prefetch href="/table">
                  <a className="nav-bar-link pl-3">Table View</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link prefetch href="/stats">
                  <a className="nav-bar-link pl-3">Emails/Stats</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link prefetch href="/rounds">
                  <a className="nav-bar-link pl-3">Rounds</a>
                </Link>
              </NavItem>
              <NavItem>
                {!this.state.loggedIn ? (
                  <a className="nav-bar-link pl-3" href="#" onClick={this.toggle}>
                    Login
                  </a>
                ) : (
                  <a className="nav-bar-link pl-3" href="#" onClick={this.logout}>
                    Logout
                  </a>
                )}
              </NavItem>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)
