//@flow
import React, { Component } from 'react'
import {
  Container,
  Row,
  Table,
  Col,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from 'reactstrap'
import Link from 'next/link'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilter, removeFilter, fetchCandidatesSuccess } from '../actions'

import Head from '../components/head'
import Nav from '../components/nav'
import CandidateStatus from '../components/candidateStatus'
import CandidateLinksBadge from '../components/candidateLinksBadge'
import FilterComponent from '../components/filterComponent'
import { ChangeStatus, ErrorMessage } from '../components/common'

import { getCandidates, setCandidateStatus } from '../utils/api'
import { avgInterviewScore, compareByAvgInterviewScore, getNumOfInterviews } from '../utils/core'
import { selectByEnum } from '../utils/enums'
import UpdateAlert from '../components/dashboard/updateAlert'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter,
      fetchCandidatesSuccess,
    },
    dispatch
  )
}

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  loading: state.candidateListPage.candidatesLoading,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
  sort: state.candidateListPage.sort,
})

var sortByProperty = function(property) {
  return function(x, y) {
    return x[property] === y[property] ? 0 : x[property] > y[property] ? 1 : -1
  }
}

var sortByMultipleProperties = function(property1, property2) {
  return function(x, y) {
    return x[property1][property2] === y[property1][property2]
      ? 0
      : x[property1][property2] > y[property1][property2]
      ? 1
      : -1
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      candidates: [],
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters,
      search: '',
    }
  }

  async componentDidMount() {
    const { result } = await getCandidates()
    if (result === undefined) {
      return
    }
    this.props.fetchCandidatesSuccess(result)
    this.setState({
      candidates: result,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters,
    })
  }

  handleSearchInput = e => {
    this.setState({
      search: e.target.value,
    })
  }

  handleChange = e => {
    let newCandidates = this.state.candidates.map(candidate => {
      if (candidate._id === e.target.name) {
        candidate.status = e.target.value
      }
      return candidate
    })
    setCandidateStatus(e.target.name, e.target.value)
    this.setState({ candidates: newCandidates })
  }

  render() {
    if (this.state.candidates === undefined) {
      return <ErrorMessage code="404" message="Candidates is undefined. Check backend." />
    }

    const workspaceFilterPresent =
      this.state.filters.workspaces && this.state.filters.workspaces.length > 0
    let filteredCandidates = this.state.candidates
      .filter(x => this.state.filters.gradDates.includes(x.graduationDate))
      .filter(x => this.state.filters.statuses.includes(x.status))
      .filter(x => this.state.filters.referrals.includes(x.referralStatus))
      .filter(x => this.state.filters.years.includes(x.year))
      .filter(x => this.state.filters.roles.some(role => x.role.indexOf(role) >= 0)) // check if at least one out of the list of filter roles exists in candidate's applied roles
      .filter(
        x =>
          x.name.toLowerCase().includes(this.state.search.toLowerCase()) || // filter by name
          x._id.toLowerCase().includes(this.state.search.toLowerCase()) // filter by id
      )
      .filter(x =>
        workspaceFilterPresent ? this.state.filters.workspaces.includes(x.workspace) : true
      )

    // TODO: Convert these cases into enum comparisons
    switch (this.state.filters.sortBy[0]) {
      case 'Name':
        filteredCandidates = filteredCandidates.sort(sortByProperty('name'))
        break
      case 'Year':
        filteredCandidates = filteredCandidates.sort(sortByProperty('year'))
        break
      case 'Status':
        filteredCandidates = filteredCandidates.sort(sortByProperty('status'))
        break
      case 'Graduation Year':
        filteredCandidates = filteredCandidates.sort(sortByProperty('graduationDate'))
        break
      case 'Facemash Score':
        filteredCandidates = filteredCandidates
          .sort(sortByMultipleProperties('facemashRankings', 'elo'))
          .reverse()
        break
      case 'Number of Matches':
        filteredCandidates = filteredCandidates
          .sort(sortByMultipleProperties('facemashRankings', 'numOfMatches'))
          .reverse()
        break
      case 'Avg Interview Score':
        filteredCandidates = filteredCandidates.sort(compareByAvgInterviewScore)
        break
    }
    let selects = this.state.filters.selectBy

    return (
      <>
        <Head title="Home" />
        <Nav />
        {this.state.candidates.length !== 0 && (
          <div className="page-content-wrapper dashboard">
            <Container fluid>
              <Row>
                <Col lg="2" md="3" className="ml-2">
                  <FilterComponent />
                </Col>
                <Col lg="9" md="8">
                  <Container>
                    <Row>
                      <UpdateAlert />
                    </Row>
                    <Row>
                      <Col sm={7}>
                        <FormGroup>
                          <Label htmlFor="search" />
                          <Input
                            type="search"
                            id="search"
                            value={this.state.search}
                            placeholder="Search Candidates by Name or ID"
                            onChange={this.handleSearchInput}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Table size="m" hover className="candidate-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            {selects.includes('Name') && <th>Name</th>}
                            {selects.includes(selectByEnum.EMAIL) && <th>{selectByEnum.EMAIL}</th>}
                            {selects.includes('Status') && <th>Status</th>}
                            {selects.includes('Year') && <th>Year</th>}
                            {selects.includes('Graduation Year') && <th>Graduation Date</th>}
                            {selects.includes('Roles') && <th>Roles</th>}
                            {selects.includes('Major') && <th>Major</th>}
                            {selects.includes('Hours') && <th>Hours</th>}
                            {selects.includes('Links') && <th>Links</th>}
                            {selects.includes('Strong Referrals') && <th>Strong Referrals</th>}
                            {selects.includes('Referrals') && <th>Referrals</th>}
                            {selects.includes('Avg Interview Score') && (
                              <th>Avg Interview Score</th>
                            )}
                            {selects.includes('Number of Interviews') && (
                              <th>Number of Interviews</th>
                            )}
                            {selects.includes('Facemash Score') && <th>FaceMash Score</th>}
                            {selects.includes('Number of Matches') && <th>Matches</th>}
                            <th>Change Status</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCandidates != undefined || filteredCandidates.length != 0 ? (
                            filteredCandidates.map((candidate, key) => (
                              <tr key={candidate._id}>
                                <th scope="row">{key + 1}</th>
                                {selects.includes('Name') && (
                                  <td>
                                    <Link
                                      href="/candidate/[cid]"
                                      as={`/candidate/${candidate._id}`}
                                    >
                                      <a className="regular-anchor">{candidate.name}</a>
                                    </Link>
                                  </td>
                                )}
                                {selects.includes(selectByEnum.EMAIL) && (
                                  <td>
                                    <span>{candidate.email}</span>
                                  </td>
                                )}
                                {selects.includes('Status') && (
                                  <td>
                                    <h6>
                                      <CandidateStatus status={candidate.status} />
                                    </h6>
                                  </td>
                                )}

                                {selects.includes('Year') && <td>{candidate.year}</td>}
                                {selects.includes('Graduation Year') && (
                                  <td>{candidate.graduationDate}</td>
                                )}
                                {selects.includes('Roles') && (
                                  <td>
                                    {candidate.role
                                      .filter(role => this.state.filters.roles.includes(role))
                                      .join(', ')}
                                  </td>
                                )}
                                {selects.includes('Major') && <td>{candidate.major}</td>}
                                {selects.includes('Hours') && <td>{candidate.timeCommitment}</td>}

                                {selects.includes('Links') && (
                                  <td>
                                    <CandidateLinksBadge link={candidate.resumeID} text="Resume" />
                                    <CandidateLinksBadge
                                      link={candidate.linkedIn}
                                      text="LinkedIn"
                                    />
                                    <CandidateLinksBadge link={candidate.github} text="Github" />
                                    <CandidateLinksBadge link={candidate.website} text="Website" />
                                  </td>
                                )}

                                {selects.includes('Strong Referrals') && (
                                  <>
                                    <td id={`strong${key}`}>
                                      <span id={`strong-refer-${key}`}>
                                        {candidate.strongReferrals.length}
                                      </span>
                                    </td>
                                    {candidate.strongReferrals.length > 0 && (
                                      <UncontrolledTooltip
                                        placement="right"
                                        target={`strong-refer-${key}`}
                                      >
                                        {candidate.strongReferrals}
                                      </UncontrolledTooltip>
                                    )}
                                  </>
                                )}

                                {selects.includes('Referrals') && (
                                  <>
                                    <td>
                                      <span id={`refer-${key}`}>{candidate.referrals.length}</span>
                                    </td>
                                    {candidate.referrals.length > 0 && (
                                      <UncontrolledTooltip
                                        placement="right"
                                        target={`refer-${key}`}
                                      >
                                        {candidate.referrals}
                                      </UncontrolledTooltip>
                                    )}
                                  </>
                                )}

                                {selects.includes('Avg Interview Score') && (
                                  <td> {avgInterviewScore(candidate.interviews)}</td>
                                )}

                                {selects.includes(selectByEnum.NUM_INTERVIEWS) && (
                                  <td> {getNumOfInterviews(candidate.interviews)}</td>
                                )}

                                {selects.includes('Facemash Score') && (
                                  <td>
                                    {candidate.facemashRankings != undefined &&
                                      candidate.facemashRankings.elo}
                                  </td>
                                )}

                                {selects.includes('Number of Matches') && (
                                  <td>
                                    {candidate.facemashRankings != undefined
                                      ? candidate.facemashRankings.numOfMatches
                                      : null}
                                  </td>
                                )}

                                <td>
                                  <ChangeStatus
                                    candidateID={candidate._id}
                                    handleChange={this.handleChange}
                                  />
                                </td>
                                <td>
                                  <Link href="/candidate/[cid]" as={`/candidate/${candidate._id}`}>
                                    <a>
                                      <img height="10" src="/static/icons/external-icon.png" />
                                    </a>
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <div className="center">
                              <p>No Candidates exist given the filters.</p>
                            </div>
                          )}
                        </tbody>
                      </Table>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
