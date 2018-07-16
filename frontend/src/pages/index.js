// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates, getCandidatesByStatus } from '../utils/api'
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
import { connect } from 'react-redux'
import { fetchCandidates } from '../actions'
import { bindActionCreators } from 'redux'

// type Props = {
//   result: {}
// }

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCandidates
    },
    dispatch
  )
}

const mapStateToProps = state => ({
  candidateListPage: state.candidateListPage
})

class HomePage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: [],
      sortDropdownOpen: false,
      showDropdownOpen: false,
      showing: 'everyone'
    }
  }

  componentDidMount() {
    this.props.fetchCandidates()
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

  render() {
    let candidates, loading, error
    const yearFilter = this.props.candidateListPage.filters.years
    const statusFilter = this.props.candidateListPage.filters.statuses
    const roleFilter = this.props.candidateListPage.filters.roles
    if (this.props.candidateListPage) {
      candidates = this.props.candidateListPage.candidates.filter(candidate => {
        return (
          yearFilter.includes(candidate.year) &&
          statusFilter.includes(candidate.status) &&
          roleFilter.includes(candidate.role)
        )
      })
      loading = this.props.candidateListPage.candidatesLoading
      error = this.props.candidateListPage.candidatesError
    }
    if (error) {
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
          {loading ? <div>Loading</div> : <CandidateListComponent candidates={candidates} />}
        </Row>
      </Container>
    )
  }
}

const connectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

export default withRedux(configureStore)(connectedHomePage)
