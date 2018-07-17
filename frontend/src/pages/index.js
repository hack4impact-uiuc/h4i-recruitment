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
    if (this.props.candidates.length == 0) {
      this.props.fetchCandidates()
    }
  }

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    const statusFilter = this.props.filters.statuses
    const roleFilter = this.props.filters.roles
    const yearFilter = this.props.filters.years
    const gradFilter = this.props.filters.gradDates
    candidates = candidates.filter(candidate => {
      return (
        statusFilter.includes(candidate.status) &&
        roleFilter.includes(candidate.role) &&
        yearFilter.includes(candidate.year) &&
        gradFilter.includes(candidate.graduationDate)
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
          <div className="sidebar">
            <FilterComponent />
          </div>
          <div className="candidates">
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
