// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import Link from 'next/link'
import Head from '../components/head'
import { bindActionCreators } from 'redux'
import { generateMatchData } from './../actions'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates, getCandidatesByStatus } from '../utils/api'
import withPersistGate from '../utils/withPersistGate'
import { PersistGate } from 'redux-persist/integration/react'

import {
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Badge
} from 'reactstrap'

type Props = {
  result: {}
}

function mapStateToProps(state) {
  return {
    candidates: state.candidates
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      generateMatchData
    },
    dispatch
  )
}

class HomePage extends Component<Props> {
  constructor(props, context) {
    super(props)
    this.state = {
      candidates: this.props.result,
      sortDropdownOpen: false,
      showDropdownOpen: false,
      showing: 'everyone'
    }
  }

  toggleSort = () => {
    this.setState(prevState => ({
      sortDropdownOpen: !prevState.sortDropdownOpen
    }))
  }

  toggleShow = () => {
    this.setState(prevState => ({
      showDropdownOpen: !prevState.showDropdownOpen
    }))
  }

  handleClickShow = async e => {
    const status = e.target.value
    const response = await getCandidatesByStatus(status)
    this.setState({
      candidates: response.result,
      showing: status
    })
  }

  static async getInitialProps({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getCandidatesByStatus('everyone')
      if (result === undefined) {
        return { error: 'Bad Request' }
      }
      return { result }
    } catch (err) {
      console.error('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }

  render() {
    if (this.props.error) {
      return <div>Bad Fetch. Try again</div>
    }
    return (
        <Container style={{ padding: '0 30px 0 30px' }}>
          <Head title="Home" />
          <Nav />
          <h1>Hack4Impact Recruitment Portal</h1>
          <Row>
            <Dropdown isOpen={this.state.sortDropdownOpen} toggle={this.toggleSort}>
              <DropdownToggle caret>Sort</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Year</DropdownItem>
                <DropdownItem>Major</DropdownItem>
                <DropdownItem>Application Role</DropdownItem>
                <DropdownItem>Interviewed</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={this.state.showDropdownOpen} toggle={this.toggleShow}>
              <DropdownToggle caret>Show</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleClickShow} value="accepted">
                  Accepted
                </DropdownItem>
                <DropdownItem onClick={this.handleClickShow} value="rejected">
                  Rejected
                </DropdownItem>
                <DropdownItem onClick={this.handleClickShow} value="interviewing">
                  Interviewing
                </DropdownItem>
                <DropdownItem onClick={this.handleClickShow} value="pending">
                  Pending
                </DropdownItem>
                <DropdownItem onClick={this.handleClickShow} value="everyone">
                  Everyone
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div>Showing: {this.state.showing}</div>
            <CandidateListComponent candidates={this.state.candidates} />
          </Row>
        </Container>
    )
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(HomePage)
