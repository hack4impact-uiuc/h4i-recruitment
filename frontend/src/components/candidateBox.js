// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Badge, Row, Col } from 'reactstrap'
import { setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import { setStatus } from '../actions/actionCreators'
import { getCandidateInterviews } from '../utils/api'
import ErrorMessage from '../components/errorMessage'

type Props = {
  candidate: {},
  hideStatus?: boolean
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setStatus
    },
    dispatch
  )
}

class CandidateBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.candidate == undefined ? '' : this.props.candidate.status,
      interviews: [],
      avgInterviewscore: null
    }
  }
  handleChange = e => {
    setCandidateStatus(this.props.candidate._id, e.target.value)
    this.props.setStatus(this.props.candidate._id, e.target.value)
    this.setState({ status: e.target.value })
  }
  async componentDidMount() {
    const res = await getCandidateInterviews(this.props.candidate._id)
    console.log(res.result)
    console.log('boi')
    this.setState({
      interviews: res.result,
      avgInterviewscore: this.avgInterviewscore()
    })
  }
  avgInterviewscore = e => {
    let avgs = 0
    for (var i = 0; i < this.state.interviews.length; i++) {
      avgs += this.state.interviews[0].overall_score
    }
    if (avgs != 0) {
      return avgs / this.state.interviews.length
    }
    return avgs
  }
  render() {
    // includes null
    console.log('candidate', this.props.candidate)
    if (this.props.candidate == undefined) {
      return <ErrorMessage message="User doesn&#39;t exist" />
    }
    const { candidate } = this.props
    return (
      <div>
        <Row>
          <Col md={6}>
            <h3>{candidate.name}</h3>
          </Col>
          <Col md={6} className="text-right">
            <a
              style={{ textDecoration: candidate.resumeID ? null : 'line-through' }}
              className="pr-2"
              href={`${candidate.resumeID}`}
            >
              Resume
            </a>
            <a
              style={{ textDecoration: candidate.website ? null : 'line-through' }}
              className="pr-2"
              href={candidate.website}
            >
              Website
            </a>
            <a
              style={{ textDecoration: candidate.linkedIn ? null : 'line-through' }}
              className="pr-2"
              href={candidate.linkedIn}
            >
              LinkedIn
            </a>
            <a
              style={{ textDecoration: candidate.github ? null : 'line-through' }}
              className="pr-2"
              href={candidate.github}
            >
              Github
            </a>
          </Col>
        </Row>

        <Row className="divider-bottom">
          <Col md={6}>
            <h3>
              {this.state.status && this.state.status === 'Accepted' ? (
                // Replaced the span with Badge for easier, more consistent styling
                <Badge color="success">Accepted</Badge>
              ) : (
                <></>
              )}

              {this.state.status && this.state.status === 'Pending' ? (
                <Badge color="warning">Pending</Badge>
              ) : (
                <></>
              )}

              {this.state.status && this.state.status === 'Rejected' ? (
                <Badge color="danger">Rejected</Badge>
              ) : (
                <></>
              )}

              {this.state.status && this.state.status === 'Interviewing' ? (
                <Badge color="info">Interviewing</Badge>
              ) : (
                <></>
              )}
            </h3>
          </Col>
          <Col md={6} className="text-right">
            {!this.props.hideStatus && (
              <a>
                <p>
                  Change Status:
                  <select onChange={this.handleChange}>
                    <option value="" selected disabled hidden>
                      Choose here
                    </option>
                    <option value={statusEnum.PENDING}>Pending</option>
                    <option value={statusEnum.ACCEPTED}>Accepted</option>
                    <option value={statusEnum.DENIED}>Rejected</option>
                    <option value={statusEnum.INTERVIEWING}>Interviewing</option>
                  </select>
                </p>
              </a>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <p>
              <b>Applied Role:</b> {candidate.role.join(', ')}
            </p>
            <p>
              <b>Role Reason:</b> {candidate.roleReason}
            </p>
            <p>
              <b>Reason for joining:</b> {candidate.joinReason}
            </p>
            <p>
              <b>Time Commitment:</b> {candidate.timeCanDevote}
            </p>
            <p>
              <b>Time Commitment List:</b> {candidate.timeCommitment}
            </p>
            <p>
              <b>Tech Experience:</b> {candidate.techExperience}
            </p>
            <p>
              <b>How They know us:</b> {candidate.howTheyKnowUs}
            </p>
            <p>
              <b>Additional Comments:</b> {candidate.additionalComments}
            </p>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Additional Information</h5>

                {candidate.major ? (
                  <p>
                    {' '}
                    <b>Major:</b> {candidate.major}{' '}
                  </p>
                ) : (
                  <p> </p>
                )}
                <p>
                  <b>Minor:</b> {candidate.minor}
                </p>
                <p>
                  <b>Graduation Date:</b> {candidate.graduationDate}
                </p>
                <p>
                  <b>Github Contributions:</b> {candidate.githubContributions}
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h5>Facemash Statistics</h5>
                <p>
                  <b>Facemash Score: </b> {candidate.facemashRankings.elo}
                </p>
                <p>
                  <b>Number of Matches: </b> {candidate.facemashRankings.numOfMatches}
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h5>Interview Information</h5>
                <p>
                  <b>Average Score: </b> {this.state.avgInterviewscore}
                </p>
                {this.state.interviews.map(interview => (
                  <p>
                    {' '}
                    <b> General Notes: </b> {interview.general_notes}
                    <br></br>
                    <b> Category: </b> {interview.category}
                  </p>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CandidateBox)
