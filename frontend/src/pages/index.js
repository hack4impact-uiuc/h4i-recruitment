// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Button, Row, Col } from 'reactstrap'
import CandidateListComponent from '../components/candidateList'
import FilterComponent from '../components/filterComponent'
import { fetchCandidates, addFilter, removeFilter } from '../actions'

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
  filters: state.candidateListPage.filters
  // sort: state.candidateListPage.sort
})

class HomePage extends Component<Props> {
  constructor(props, context) {
    super(props)
    this.state = {
      candidates: this.props.candidates,
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters
      // sort: this.props.sort
    }
  }

  componentDidMount() {
    if (this.props.candidates.length == 0) {
      this.props.fetchCandidates(
        this.props.filters.statuses,
        this.props.filters.years,
        this.props.filters.gradDates,
        this.props.filters.sortBy,
        this.props.filters.roles,
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
      this.props.filters.roles,
      this.props.filters.selectBy
    )
  }

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    if (error) {
      return <div>Bad Fetch. Try again</div>
    }

    return (
      <>
        <div className="page-content-wrapper">
          <Row className="mb-3">
            <h2 className="ml-5">Hack4Impact Recruitment Portal</h2>
          </Row>
          <Container fluid>
            <Row>
              <Col xs="2" lg="2" md="2">
                <FilterComponent />
                <Col>
                  <div>
                    <Button onClick={this.query}> Query Candidates </Button>
                  </div>
                </Col>
                {console.log(candidates)}
              </Col>
              <Col xs="10" lg="10" md="10">
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
