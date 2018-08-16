// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
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
      <>
        <div className="page-content-wrapper">
          <Row className="mb-3">
            <h2 className="ml-5">Hack4Impact Recruitment Portal</h2>
          </Row>
          <Container fluid>
            <Row>
              <Col lg="2" md="3">
                <FilterComponent />
              </Col>
              <Col lg="10" md="9">
                <Row>
                  <h3>Sort By:</h3> <Button>Graduation Year</Button>{' '}
                  <Button>Interview Score</Button> <Button>FaceSmash Score</Button>{' '}
                </Row>
                <CandidateListComponent candidates={candidates} />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
