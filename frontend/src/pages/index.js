// @flow
import React, { Component } from 'react'
// <<<<<<< sort-by-filters
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import Head from '../components/head'
// =======
import { connect } from 'react-redux'
import Link from 'next/link'
// >>>>>>> master
import { bindActionCreators } from 'redux'
import { Container, Button, Row, Col } from 'reactstrap'
// import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import FilterComponent from '../components/filterComponent'
// <<<<<<< sort-by-filters

// import { Container, Button, Row } from 'reactstrap'
// =======
// import configureStore from './../store/appStore'
// >>>>>>> master
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
        this.props.filters.roles
      )
    }
  }

  query = () => {
    this.props.fetchCandidates(
      this.props.filters.statuses,
      this.props.filters.years,
      this.props.filters.gradDates,
      this.props.filters.sortBy,
      this.props.filters.roles
    )
  }

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    if (error) {
      return <div>Bad Fetch. Try again</div>
    }

    return (
      // // <<<<<<< sort-by-filters
      //       <Container style={{ padding: '0 30px 0 30px' }}>
      //         <Head title="Home" />
      //         <Nav />
      //         <h1 className="title">Hack4Impact Recruitment Portal</h1>
      //         <Row>
      //           <div className="sidebar">
      //             <FilterComponent />
      //             <Button onClick={this.query}> submit </Button>
      //           </div>
      //           <div className="candidates">
      //             <CandidateListComponent candidates={candidates} />
      //           </div>
      //         </Row>
      //       </Container>
      // =======
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
              {/* <Col xs="1 " lg="1" md="1"> */}
              {/* <Col> */}
              <Col xs="10" lg="10" md="10">
                {/* <div className="candidates"> */}
                <CandidateListComponent candidates={candidates} />
                {/* </div>s */}
              </Col>
              {/* </Col> */}
              {/* </Col> */}
            </Row>
          </Container>
        </div>
      </>
      // >>>>>>> master
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
