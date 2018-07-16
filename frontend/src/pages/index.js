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
import { fetchCandidates, addFilter, removeFilter } from '../actions'
import { bindActionCreators } from 'redux'

// type Props = {
//   result: {}
// }

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCandidates,
      addFilter,
      removeFilter
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    candidates: state.candidateListPage.candidates,
    loading: state.candidateListPage.candidatesLoading,
    error: state.candidateListPage.candidatesError,
    filters: state.candidateListPage.filters,
    sort: state.candidateListPage.sort
  }
}

class HomePage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: this.props.candidates,
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters,
      sort: this.props.sort
    }
  }

  componentDidMount() {
    this.props.fetchCandidates()
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.candidateListPage != prevProps.candidateListPage) {
  //     this.setState({
  //       candidates: this.props.candidateListPage.candidates,
  //       filters: this.props.candidateListPage.filters,
  //       sort: this.props.candidateListPage.sort
  //     })
  //   }
  // }

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

  handleChange = event => {
    if (event.target.checked) {
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    const statusFilter = this.props.filters.statuses
    const roleFilter = this.props.filters.roles
    const yearFilter = this.props.filters.years
    candidates = candidates.filter(candidate => {
      return (
        statusFilter.includes(candidate.status) &&
        roleFilter.includes(candidate.role) &&
        yearFilter.includes(candidate.year)
      )
    })
    if (error) {
      return <div>Bad Fetch. Try again</div>
    }
    return (
      <Container style={{ padding: '0 30px 0 30px' }}>
        <Head title="Home" />
        <Nav />
        <h1>Hack4Impact Recruitment Portal</h1>
        <Row>
          <div>Sort By:</div>
          <Button color="primary">Age</Button>
          <Button color="secondary">Interview Score</Button>
          <Button color="success">FaceSmash Score</Button>
          <p>
            <h1>Filter By:</h1>
          </p>
          <p>
            <h2>Status</h2>
          </p>
          <p>
            <input
              type="checkbox"
              id="accepted"
              name="statuses"
              value="accepted"
              checked={statusFilter.includes('accepted')}
              onChange={this.handleChange}
            />
            <label for="accepted">Accepted</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="denied"
              name="statuses"
              value="denied"
              checked={statusFilter.includes('denied')}
              onChange={this.handleChange}
            />
            <label for="denied">Denied</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="pending"
              name="statuses"
              value="pending"
              checked={statusFilter.includes('pending')}
              onChange={this.handleChange}
            />
            <label for="pending">Pending</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="interviewing"
              name="statuses"
              value="interviewing"
              checked={statusFilter.includes('interviewing')}
              onChange={this.handleChange}
            />
            <label for="interviewing">Interviewing</label>
          </p>
          <p>
            <h2>Year</h2>
          </p>
          <p>
            <input
              type="checkbox"
              id="freshman"
              name="years"
              value="freshman"
              checked={yearFilter.includes('freshman')}
              onChange={this.handleChange}
            />
            <label for="freshman">Freshman</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="sophomore"
              name="years"
              value="sophomore"
              checked={yearFilter.includes('sophomore')}
              onChange={this.handleChange}
            />
            <label for="sophomore">Sophomore</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="junior"
              name="years"
              value="junior"
              checked={yearFilter.includes('junior')}
              onChange={this.handleChange}
            />
            <label for="junior">Junior</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="senior"
              name="years"
              value="senior"
              checked={yearFilter.includes('senior')}
              onChange={this.handleChange}
            />
            <label for="senior">Senior</label>
          </p>
          <p>
            <h2>Role</h2>
          </p>
          <p>
            <input
              type="checkbox"
              id="software engineer"
              name="roles"
              value="software engineer"
              checked={roleFilter.includes('software engineer')}
              onChange={this.handleChange}
            />
            <label for="software engineer">Software Engineer</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="tech lead"
              name="roles"
              value="tech lead"
              checked={roleFilter.includes('tech lead')}
              onChange={this.handleChange}
            />
            <label for="tech lead">Tech Lead</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="product manager"
              name="roles"
              value="product manager"
              checked={roleFilter.includes('product manager')}
              onChange={this.handleChange}
            />
            <label for="product manager">Product Manager</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="community director"
              name="roles"
              value="community director"
              checked={roleFilter.includes('community director')}
              onChange={this.handleChange}
            />
            <label for="community director">Community Director</label>
          </p>
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
