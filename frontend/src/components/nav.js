// @flow
import { Component, Fragment } from 'react'
import Link from 'next/link'
import { Navbar, Nav, NavbarBrand, NavItem, NavbarToggler, NavLink, Collapse } from 'reactstrap'

class NavigationBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: '#155DA1' }} light className="fixed p-3" expand="sm">
          <Link prefetch href="/">
            <a>
              <NavbarBrand className="ml-3">
                <img id="logo-img" height="35" width="200" src="https://h4i-white-logo.now.sh" />
              </NavbarBrand>
            </a>
          </Link>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="ml-auto">
              <Link prefetch href="/facemash">
                <a className="nav-bar-link">Facemash</a>
              </Link>
              <Link prefetch href="/interviewportal">
                <a className="nav-bar-link pl-3">Interview Portal</a>
              </Link>
              <Link prefetch href="/login">
                <a className="nav-bar-link pl-3">Login</a>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar
