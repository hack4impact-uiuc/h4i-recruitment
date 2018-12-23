//@flow
import React from 'react'
import { Container, Row, Table, Col, FormGroup, Label, Input } from 'reactstrap'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFilter, removeFilter } from '../actions'
import { getCandidates, setCandidateStatus } from '../utils/api'
import CandidateStatus from '../components/candidateStatus'
import CandidateLinksBadge from '../components/candidateLinksBadge'
import FilterComponent from '../components/filterComponent'
import ChangeStatus from '../components/changeStatus'
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

class Dashboard extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: this.props.candidates,
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters,
      search: ''
    }
  }
  async componentDidMount() {
    const res = await getCandidates()
    console.log(res)
    this.setState({
      candidates: res.result === undefined ? [] : res.result
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters
    })
  }
  handleSearchInput = e => {
    this.setState({
      search: e.target.value
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
    let filteredCandidates = this.state.candidates
      .filter(x => this.state.filters.gradDates.includes(x.graduationDate))
      .filter(x => this.state.filters.statuses.includes(x.status))
      .filter(x => this.state.filters.years.includes(x.year))
      .filter(x => !x.role.map(role => this.state.filters.roles.includes(role)).includes(false))
      .filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase()))
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
    }
    let selects = this.state.filters.selectBy
    return (
      <>
        <div className="page-content-wrapper">
          <Container fluid>
            <Row>
              <Col lg="2" sm="3" className="ml-2">
                <FilterComponent />
              </Col>
              <Col lg="7" sm="8">
                <Container>
                  <Row>
                    <Col sm={12}>
                      <FormGroup>
                        <Label htmlFor="search" />
                        <Input
                          type="search"
                          id="search"
                          value={this.state.search}
                          placeholder="Search Candidates"
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
                          {selects.includes('Name') ? <th>Name</th> : <> </>}
                          {selects.includes('Status') ? <th>Status</th> : <> </>}
                          {selects.includes('Year') ? <th>Year</th> : <> </>}
                          {selects.includes('Graduation Year') ? <th>Graduation Date</th> : <> </>}
                          {selects.includes('Roles') ? <th>Roles</th> : <> </>}
                          {selects.includes('Major') ? <th>Major</th> : <> </>}
                          {selects.includes('Hours') ? <th>Hours</th> : <> </>}
                          {selects.includes('Links') ? <th>Links</th> : <> </>}
                          {selects.includes('Facemash Score') ? <th>FaceMash Score</th> : <> </>}
                          {selects.includes('Number of Matches') ? <th>Matches</th> : <> </>}
                          <th>Change Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCandidates != undefined &&
                          filteredCandidates.map((candidate, key) => (
                            <tr key={candidate._id}>
                              <th scope="row">{key + 1}</th>
                              {selects.includes('Name') ? (
                                <td>
                                  <Link
                                    href={{ pathname: '/candidate', query: { id: candidate._id } }}
                                  >
                                    <a className="regular-anchor">{candidate.name}</a>
                                  </Link>
                                </td>
                              ) : (
                                <> </>
                              )}

                              {selects.includes('Status') ? (
                                <td>
                                  <h6>
                                    <CandidateStatus status={candidate.status} />
                                  </h6>
                                </td>
                              ) : (
                                <> </>
                              )}

                              {selects.includes('Year') ? <td>{candidate.year}</td> : <> </>}
                              {selects.includes('Graduation Year') ? (
                                <td>{candidate.graduationDate}</td>
                              ) : (
                                <> </>
                              )}
                              {selects.includes('Roles') ? (
                                <td>{candidate.role.join(' ')}</td>
                              ) : (
                                <> </>
                              )}
                              {selects.includes('Major') ? <td>{candidate.major}</td> : <> </>}
                              {selects.includes('Hours') ? (
                                <td>{candidate.timeCommitment}</td>
                              ) : (
                                <> </>
                              )}

                              {selects.includes('Links') ? (
                                <td>
                                  <CandidateLinksBadge link={candidate.resumeID} text="Resume" />
                                  <CandidateLinksBadge link={candidate.linkedIn} text="LinkedIn" />
                                  <CandidateLinksBadge link={candidate.github} text="Github" />
                                  <CandidateLinksBadge link={candidate.website} text="Website" />
                                </td>
                              ) : (
                                <> </>
                              )}

                              {selects.includes('Facemash Score') ? (
                                <td>
                                  {candidate.facemashRankings != undefined
                                    ? candidate.facemashRankings.elo
                                    : null}
                                </td>
                              ) : (
                                <> </>
                              )}

                              {selects.includes('Number of Matches') ? (
                                <td>
                                  {candidate.facemashRankings != undefined
                                    ? candidate.facemashRankings.numOfMatches
                                    : null}
                                </td>
                              ) : (
                                <> </>
                              )}

                              <td>
                                <ChangeStatus
                                  candidateID={candidate._id}
                                  handleChange={this.handleChange}
                                />
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
