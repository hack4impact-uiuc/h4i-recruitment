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
          <Link route="index" passHref>
            <NavbarBrand className="ml-3">
              <Link prefetch href="/">
                <a>
                  <img id="logo-img" height="35" width="200" src="https://h4i-white-logo.now.sh" />
                </a>
              </Link>
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="ml-auto">
              <Link href="/facemash">
                <a className="nav-bar-link">Facemash</a>
              </Link>
              <Link href="/login">
                <a className="nav-bar-link pl-3">Interview Portal</a>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar
