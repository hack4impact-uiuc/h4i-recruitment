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
import { fetchCandidates, addFilter, removeFilter } from '../actions'
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
      this.props.fetchCandidates(
        this.props.filters.statuses,
        this.props.filters.years,
        this.props.filters.gradDates,
        this.props.filters.sortBy,
        this.props.filters.selectBy
      )
    }
  }

  query = () => {
    this.props.fetchCandidates(
      this.props.filters.statuses,
      this.props.filters.years,
      this.props.filters.gradDates,
      this.props.filters.sortBy,
      this.props.filters.selectBy
    )
  }

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    if (error) {
      return <div>Bad Fetch. Try again</div>
    }

    return (
      <Container style={{ padding: '0 30px 0 30px' }}>
        <Head title="Home" />
        <Nav />
        <h1 className="title">Hack4Impact Recruitment Portal</h1>
        <Row>
          <div className="sidebar">
            <FilterComponent />
            <Button onClick={this.query}> submit </Button>
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
