// @flow
// This Component shows the details of a candidate
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Badge, Row, Col } from 'reactstrap'
import { setCandidateStatus } from '../../utils/api'
import { setStatus } from '../../actions/actionCreators'
import ErrorMessage from '../errorMessage'
import CandidateStatus from '../candidateStatus'
import CandidateLinks from '../candidateLinks'
import ChangeStatus from '../changeStatus'
import { avgInterviewScore, interviewGetCategorySection } from '../../utils/core'

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
      avgInterviewScore: null
    }
  }
  handleChange = e => {
    setCandidateStatus(this.props.candidate._id, e.target.value)
    this.props.setStatus(this.props.candidate._id, e.target.value)
    this.setState({ status: e.target.value })
  }
  async componentDidMount() {
    const { interviews } = this.props.candidate
    this.setState({
      interviews: interviews,
      avgInterviewScore: avgInterviewScore(interviews)
    })
  }
  render() {
    // includes null
    if (this.props.candidate == undefined) {
      return <ErrorMessage message="User doesn&#39;t exist" />
    }
    const { candidate } = this.props
    return (
      <div className="candidate-box-wrapper">
        <Row>
          <Col md={6}>
            <h3>{candidate.name}</h3>
          </Col>
          <Col md={6} className="text-right">
            <CandidateLinks link={candidate.resumeID} text="Resume" />
            <CandidateLinks link={candidate.website} text="Website" />
            <CandidateLinks link={candidate.linkedIn} text="LinkedIn" />
            <CandidateLinks link={candidate.github} text="Github" />
          </Col>
        </Row>

        <Row className="divider-bottom">
          <Col md={6}>
            <h3>
              <CandidateStatus status={this.state.status} />
            </h3>
          </Col>
          <Col md={6} className="text-right">
            {!this.props.hideStatus && (
              <a>
                <p>
                  Change Status:{' '}
                  <ChangeStatus status={this.state.status} handleChange={this.handleChange} />
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
              <b>Time Commitment:</b> {candidate.timeCommitment}
            </p>
            <p>
              <b>Tech Experience:</b> {candidate.techExperience}
            </p>
            <p>
              <b>Classes Taken:</b>
              {candidate.classesTaken != undefined ? candidate.classesTaken.join(', ') : null}
            </p>{' '}
            <p>
              <b>Strong Referrals: </b>
              {candidate.strongReferrals != undefined ? candidate.strongReferrals.join(', ') : null}
            </p>
            <p>
              <b>Referrals: </b>
              {candidate.referrals != undefined ? candidate.referrals.join(', ') : null}
            </p>
            <p>
              <b>How They know us:</b> {candidate.howTheyKnowUs}
            </p>
            <p>
              <b>Additional Comments:</b> {candidate.additionalComments}
            </p>
            <h5 className="text-info pt-3">Interview Information</h5>
            <p>
              <b>Average Score: </b> {this.state.avgInterviewScore}
            </p>
            {this.state.interviews.map(interview => (
              <p key={interview._id}>
                <b>Interviewer: </b>
                {interview.interviewer_name}
                {interviewGetCategorySection(interview) !== null ? (
                  <p>
                    <b>Category given:</b> {interviewGetCategorySection(interview).response.text}
                  </p>
                ) : null}
              </p>
            ))}
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5 className="text-info pt-3">Additional Information</h5>

                {candidate.major ? (
                  <p>
                    <b>Major:</b> {candidate.major}
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
                  <b>Year</b> {candidate.year}
                </p>
                <p>
                  <b>Github Contributions:</b> {candidate.githubContributions}
                </p>
                <p>
                  <b>Email:</b> {candidate.email}
                </p>
                <p>
                  <b>_id:</b> {candidate._id}
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h5 className="text-info pt-3">Facemash Statistics</h5>
                <p>
                  <b>Facemash Score: </b> {candidate.facemashRankings.elo}
                </p>
                <p>
                  <b>Number of Matches: </b> {candidate.facemashRankings.numOfMatches}
                </p>
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
