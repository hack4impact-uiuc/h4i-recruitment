// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import Link from 'next/link'
import Head from '../components/head'
import { bindActionCreators } from 'redux'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates, getCandidatesByStatus } from '../utils/api'
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
import { yearsEnum, statusEnum, rolesEnum } from '../utils/enums'

type Props = {
  candidates: Array<any>,
  loading: boolean,
  error: boolean,
  filters: Object,
  sort: Object
}

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

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  loading: state.candidateListPage.candidatesLoading,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
  sort: state.candidateListPage.sort
})

class HomePage extends Component<Props> {
  constructor(props, context) {
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
    if (this.props.candidates.length == 0) {
      this.props.fetchCandidates()
    }
  }

  arrayIntersection(array1, array2) {
    const intersection = array1.filter(value => -1 !== array2.indexOf(value))
    if (intersection.length != 0) {
      return true
    }
    return false
  }
  render() {
    let { candidates, error, loading, filters, sort } = this.props
    if (error) {
      return <div>Bad Fetch. Try again</div>
    }
    const statusFilter = filters.statuses
    const roleFilter = filters.roles
    const yearFilter = filters.years
    const gradFilter = filters.gradDates
    candidates = candidates.filter(candidate => {
      return (
        statusFilter.includes(candidate.status) &&
        this.arrayIntersection(roleFilter, candidate.role) &&
        yearFilter.includes(candidate.year) &&
        gradFilter.includes(candidate.graduationDate)
      )
    })
    return (
      <Container style={{ padding: '0 30px 0 30px' }}>
        <Head title="Home" />
        <Nav />
        <h1 className="title">Hack4Impact Recruitment Portal</h1>
        <Row>
          <div className="sort">
            <h2>Sort By:</h2> <Button>Graduation Year</Button> <Button>Interview Score</Button>{' '}
            <Button>Facesmash Score</Button>{' '}
          </div>
          <div className="sidebar">
            <FilterComponent />
          </div>
          <div className="candidates">
            <CandidateListComponent candidates={candidates} />
          </div>
        </Row>
      </Container>
    )
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(HomePage)