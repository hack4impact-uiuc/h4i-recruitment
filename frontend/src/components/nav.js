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
import { connect } from 'react-redux'
import { validateKey, getKey, getRound } from '../utils/api'
import roundData from '../data/roundData.js'
import { setRoundRedux } from '../actions'
import { bindActionCreators } from 'redux'

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
      isDirector: false,
      isLead: false,
      loggedIn: false,
      showLoginModal: false,
      username: null
    }
  }

  toggle = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    })
  }

  logout = () => {
    localStorage.removeItem('interviewerKey')
    localStorage.removeItem('interviewerName')

    this.setState({ loggedIn: false })
    alert('Logged Out!')
    Router.push('/')
  }

  async handleSubmit() {
    this.setState({
      showLoginModal: false
    })
    const { success, result } = await validateKey(this.state.currentKey)
    if (success) {
      localStorage.setItem('interviewerKey', this.state.currentKey)
      localStorage.setItem('interviewerName', result.name)
      Router.push('/dashboard')

      this.setState({
        isDirector: result.is_director,
        isLead: result.is_lead,
        loggedIn: true,
        username: result.name
      })
    }
  }

  onTextChange = e => {
    this.setState({ currentKey: e.target.value })
  }

  async componentDidMount() {
    if (getKey() === undefined) {
      return
    }
    const { success, result } = await validateKey(getKey())
    if (success) {
      this.setState({
        isLead: result.is_lead,
        isDirector: result.is_director,
        loggedIn: true,
        username: result.name
      })
    }

    // get interview round data
    const round = await getRound()
    if (round.result) {
      this.props.setRoundRedux(round.result.round)
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
          <NavbarBrand className="ml-3">
            <Link href={this.state.loggedIn ? '/dashboard' : '/'}>
              <img id="logo-img" height="35" width="200" src="https://h4i-white-logo.now.sh" />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.showLoginModal} navbar>
            <Nav navbar className="ml-auto">
              {this.state.loggedIn && (
                <NavItem>
                  <div className="nav-bar-name pr-3">
                    Welcome {this.state.username ? this.state.username : null}!
                  </div>
                </NavItem>
              )}
              <NavItem>
                <Link href="/dashboard">
                  <a className="nav-bar-link pl-3">Dashboard</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/table">
                  <a className="nav-bar-link pl-3">Table View</a>
                </Link>
              </NavItem>
              {this.state.isLead && (
                <>
                  <NavItem>
                    <Link href="/eventOverview">
                      <a className="nav-bar-link pl-3">Events</a>
                    </Link>
                  </NavItem>

                  <NavItem>
                    <Link href="/interviewportal">
                      <a className="nav-bar-link pl-3">Your Interviews</a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link
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
                    <Link href="/interviewschedule">
                      <a className="nav-bar-link pl-3">Interview Schedule</a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/stats">
                      <a className="nav-bar-link pl-3">Emails/Stats</a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/analytics">
                      <a className="nav-bar-link pl-3">Analytics</a>
                    </Link>
                  </NavItem>
                  {this.state.isDirector && (
                    <>
                      <NavItem>
                        <Link href="/workspaces">
                          <a className="nav-bar-link pl-3">Workspaces</a>
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link href="/rounds">
                          <a className="nav-bar-link pl-3">Rounds</a>
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link href="/adminRoles">
                          <a className="nav-bar-link pl-3">Admin</a>
                        </Link>
                      </NavItem>
                    </>
                  )}
                </>
              )}
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
          <Modal autoFocus={false} isOpen={this.state.showLoginModal}>
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
