// @flow
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Navbar, Nav, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap'
import { connect } from 'react-redux'
import { validateKey, getKey, getRound } from '../utils/api'
import roundData from '../data/roundData.js'
import { setRoundRedux } from '../actions'
import { bindActionCreators } from 'redux'

import styles from '../css/nav.module.css'

const mapStateToProps = state => ({
  round: state.round,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setRoundRedux,
    },
    dispatch
  )
}

export const NavigationBar = props => {
  const [role, setRole] = useState('Pending')
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState(null)

  const logout = useCallback(() => {
    localStorage.removeItem('memberId')
    localStorage.removeItem('memberName')

    setLoggedIn(false)
    alert('Logged Out!')
    Router.push('/')
  })

  // componentDidMount
  useEffect(async () => {
    if (localStorage.getItem('memberId')) {
      setLoggedIn(true)
    }
    const { success, result } = await validateKey(getKey())
    if (success) {
      localStorage.setItem('memberName', result.name)

      setRole(result.role)
      setLoggedIn(true)
      setUsername(result.name)
    }

    // get interview round data
    const round = await getRound()
    if (round.result) {
      props.setRoundRedux(round.result.round)
    } else {
      props.setRoundRedux(0)
    }
  }, [])

  // handles when user presses "Enter" when input is focused
  const _handleKeyPress = useCallback(e => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  })

  return (
    <>
      <Navbar light className={`${styles.navbar} fixed p-3`} expand="md">
        <NavbarBrand className="ml-3">
          <Link href={loggedIn ? '/dashboard' : '/'}>
            <img id="logo-img" height="35" width="200" src="https://h4i-white-logo.now.sh" />
          </Link>
        </NavbarBrand>
        <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Nav navbar className="ml-auto">
            {loggedIn && (
              <NavItem>
                <div className="nav-bar-name pr-3">Welcome {username ? username : null}!</div>
              </NavItem>
            )}
            <NavItem>
              <Link href="/dashboard">
                <a className="nav-bar-link">Dashboard</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/table">
                <a className="nav-bar-link pl-3">Table View</a>
              </Link>
            </NavItem>
            {role != 'Pending' && (
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
                      roundData.rounds[props.round].type == 'interview'
                        ? '/interviewportal'
                        : '/facemash'
                    }
                  >
                    <a className="nav-bar-link pl-3">{roundData.rounds[props.round].name}</a>
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
                {role === 'Director' && (
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
              {!loggedIn ? (
                <a className="nav-bar-link pl-3" href="#" onClick={() => Router.push('/#')}>
                  Login
                </a>
              ) : (
                <a className="nav-bar-link pl-3" href="#" onClick={logout}>
                  Logout
                </a>
              )}
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)
