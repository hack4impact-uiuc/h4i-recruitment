//@flow
import React from 'react'
import { Container, Row, Table, Badge, Media, Col, Button } from 'reactstrap'
import Link from 'next/link'
import { getCandidates, setCandidateStatus, getAllCandidates } from '../utils/api'
import { statusEnum } from '../utils/enums'
import CandidateStatus from '../components/candidateStatus'
import CandidateLinksBadge from '../components/candidateLinksBadge'
import FilterComponent from '../components/filterComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilter, removeFilter } from '../actions'

type Props = {}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
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

class Dashboard extends React.Component<Props> {
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
  async componentDidMount() {
    const res = await getCandidates()
    let candidates = res.result
    this.setState({
      candidates: res.result == undefined ? [] : res.result
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters
    })
    // console.log(this.state.filters.statuses)
    // this.state.candidates.map(candidate => this.filters.statuses.contains(candidate.status))
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
  // sort function
  compareByFacemashScore = (candidate1, candidate2) => {
    if (candidate1.facemashRankings == undefined) {
      return 0
    }
    if (candidate1.facemashRankings.elo > candidate2.facemashRankings.elo) {
      return -1
    }
    if (candidate1.facemashRankings.elo < candidate2.facemashRankings.elo) {
      return 1
    }
    return 0
  }

  render() {
    let filteredCandidates = this.state.candidates
      .filter(x => this.state.filters.gradDates.includes(x.graduationDate))
      .filter(x => this.state.filters.statuses.includes(x.status))
      .filter(x => this.state.filters.years.includes(x.year))

    let selects = this.state.filters.selectBy
    return (
      <>
        <div className="page-content-wrapper">
          <Container fluid>
            <Row>
              <Col lg="2" sm="3" className="ml-2">
                <FilterComponent />
              </Col>
              <Col lg="9" sm="8">
                <Container>
                  <Row>
                    <h4>Ordered by Facemash Ranking. 'Rejected' Filtered out</h4>
                    <Table size="m" hover className="candidate-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          {selects.includes('Status') ? <th>Status</th> : <> </>}
                          <th>Year</th>
                          <th>Graduation Date</th>
                          <th>Roles</th>
                          <th>Hours</th>
                          <th>Links</th>
                          <th>FaceMash Score</th>
                          <th>Matches</th>
                          <th>Change Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCandidates != undefined &&
                          filteredCandidates.map((candidate, key) => (
                            <tr key={candidate._id}>
                              <th scope="row">{key + 1}</th>
                              <td>{candidate.name}</td>
                              {selects.includes('Status') ? (
                                <td>
                                  <h6>
                                    <CandidateStatus status={candidate.status} />
                                  </h6>
                                </td>
                              ) : (
                                <> </>
                              )}

                              <td>{candidate.year}</td>
                              <td>{candidate.graduationDate}</td>
                              <td>{candidate.role.join(' ')}</td>
                              <td>{candidate.timeCommitment}</td>
                              <td>
                                <CandidateLinksBadge link={candidate.resumeID} text="Resume" />
                                <CandidateLinksBadge link={candidate.linkedIn} text="LinkedIn" />
                                <CandidateLinksBadge link={candidate.github} text="Github" />
                                <CandidateLinksBadge link={candidate.website} text="Website" />
                              </td>
                              <td>
                                {candidate.facemashRankings != undefined
                                  ? candidate.facemashRankings.elo
                                  : null}
                              </td>
                              <td>
                                {candidate.facemashRankings != undefined
                                  ? candidate.facemashRankings.numOfMatches
                                  : null}
                              </td>
                              <td>
                                <select name={candidate._id} onChange={this.handleChange}>
                                  <option value="" selected disabled hidden>
                                    Change status
                                  </option>
                                  <option value={statusEnum.PENDING}>Pending</option>
                                  <option value={statusEnum.ACCEPTED}>Accepted</option>
                                  <option value={statusEnum.DENIED}>Rejected</option>
                                  <option value={statusEnum.INTERVIEWING}>Interviewing</option>
                                </select>
                              </td>
                              <td>
                                <Link
                                  href={{ pathname: '/candidate', query: { id: candidate._id } }}
                                >
                                  <a>
                                    <img height="10" src="/static/icons/external-icon.png" />
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Row>
                </Container>
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
)(Dashboard)
