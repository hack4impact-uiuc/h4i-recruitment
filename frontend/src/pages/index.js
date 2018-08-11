// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Container, Button, Row, Col } from 'reactstrap'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import FilterComponent from '../components/filterComponent'
import configureStore from './../store/appStore'
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
      <React.Fragment>
        <Head title="Home" />
        <Nav />
        <Container fluid>
          <div style={{ paddingBottom: '60px' }}>
            <h1 className="ml-5">Hack4Impact Recruitment Portal</h1>
            <div className="sort">
              <h2>Sort By:</h2> <Button>Graduation Year</Button> <Button>Interview Score</Button>{' '}
              <Button>FaceSmash Score</Button>{' '}
            </div>
          </div>
          <Row>
            <Col md="1">
              <FilterComponent />
            </Col>
            <Col md="11">
              <CandidateListComponent candidates={candidates} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(HomePage)
