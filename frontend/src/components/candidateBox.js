// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Badge, Row, Col } from 'reactstrap'
import { setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import { setStatus } from '../actions/actionCreators'

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
      status: this.props.candidate.status
    }
  }
  handleChange = e => {
    setCandidateStatus(this.props.candidate._id, e.target.value)
    this.props.setStatus(this.props.candidate._id, e.target.value)
    this.setState({ status: e.target.value })
  }
  render() {
    if (!this.props.candidate) {
      return <div>User doesn&#39;t exist</div>
    }
    const { candidate } = this.props
    return (
      <div>
        <Row>
          <Col md={6}>
            <h2>
              {candidate.name}
            </h2>
          </Col>
          <Col md={6} className="text-right">
            <a
              style={{ textDecoration: candidate.resumeID ? null : 'line-through' }}
              href={`${candidate.resumeID}`}
            >
              Resume
            </a>
            <a
              style={{ textDecoration: candidate.website ? null : 'line-through' }}
              href={candidate.website}
            >
              Website
            </a>
            <a
              style={{ textDecoration: candidate.linkedIn ? null : 'line-through' }}
              href={candidate.linkedIn}
            >
              LinkedIn
            </a>
            <a
              style={{ textDecoration: candidate.github ? null : 'line-through' }}
              href={candidate.github}
            >
              Github
            </a>
          </Col>
        </Row>

        <Row className="divider-bottom">
          <Col md={6}>
            <h3>
              {!this.props.hideStatus && (
                <Badge color={this.state.status == 'rejected' ? 'danger' : 'success'}>
                  {this.state.status}
                </Badge>
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
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h4>Additional Information</h4>

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
                <h4>Facemash Statistics</h4>
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

        <Row>
          <Col md={12}>
            <p>
              <b>Additional Comments:</b> {candidate.additionalComments}
            </p>
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
