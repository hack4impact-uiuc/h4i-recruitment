// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import FilterComponent from '../components/filterComponent'
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
import { yearsenum, statusenum, rolesenum } from '../utils/enums'

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

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    const years = [yearsenum.FRESHMAN, yearsenum.SOPHOMORE, yearsenum.JUNIOR, yearsenum.SENIOR]
    const roles = [rolesenum.SWE, rolesenum.TL, rolesenum.CD, rolesenum.PM]
    const statuses = [
      statusenum.PENDING,
      statusenum.ACCEPTED,
      statusenum.DENIED,
      statusenum.INTERVIEWING
    ]
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
          <div>
            <FilterComponent />
            {/* <div>
            <div>Sort By:</div>
            <Button color="primary">Age</Button>
            <Button color="secondary">Interview Score</Button>
            <Button color="success">FaceSmash Score</Button>
          </div>
          <div>
            <p>
              <h1>Filter By:</h1>
            </p>
            <p>
              <h2>Status</h2>
            </p>
            <div>
              {statuses.map(el => {
                return (
                  <p>
                    <input
                      type="checkbox"
                      id={el}
                      name="statuses"
                      value={el}
                      checked={statusFilter.includes(el)}
                      onChange={this.handleChange}
                    />
                    <label for={el}>{this.capitalizeFirstLetter(el)}</label>
                  </p>
                )
              })}
            </div>
            <p>
              <h2>Year</h2>
            </p>
            <div>
              {years.map(el => {
                return (
                  <p>
                    <input
                      type="checkbox"
                      id={el}
                      name="years"
                      value={el}
                      checked={yearFilter.includes(el)}
                      onChange={this.handleChange}
                    />
                    <label for={el}>{this.capitalizeFirstLetter(el)}</label>
                  </p>
                )
              })}
            </div>
            <div>
              <h2>Role</h2>
            </div>
            <div>
              {roles.map(el => {
                return (
                  <p>
                    <input
                      type="checkbox"
                      id={el}
                      name="roles"
                      value={el}
                      checked={roleFilter.includes(el)}
                      onChange={this.handleChange}
                    />
                    <label for={el}>{this.capitalizeFirstLetter(el)}</label>
                  </p>
                )
              })}
            </div> */}
            {loading ? <div>Loading</div> : <CandidateListComponent candidates={candidates} />}
          </div>
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
