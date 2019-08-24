// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import { setStatus } from '../actions/actionCreators'
import { ErrorMessage } from '../components/common'
import CandidateStatus from '../components/candidateStatus'
import CandidateLinks from '../components/candidateLinks'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setStatus,
    },
    dispatch
  )
}

class FacemashProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.candidate != undefined ? this.props.candidate.status : null,
    }
  }

  handleChange = e => {
    setCandidateStatus(this.props.candidate._id, e.target.value)
    this.props.setStatus(this.props.candidate._id, e.target.value)
    this.setState({ status: e.target.value })
  }

  render() {
    const { candidate } = this.props
    if (!this.props.candidate || candidate === undefined) {
      return (
        <ErrorMessage message="User doesn&#39;t exist or cannot be queried. Check if you are logged In" />
      )
    }

    return (
      <div className="rounded-lightblue-border">
        <div className="lightblue-section padded-all-sm">
          <h2>
            {candidate.name}
            {!this.props.hideStatus && <CandidateStatus status={this.state.status} />}
          </h2>
          {!this.props.hideStatus && (
            <a>
              <p>
                Change Status:
                <select value={this.state.status} onChange={this.handleChange}>
                  <option selected disabled hidden>
                    Choose here
                  </option>
                  <option value={statusEnum.PENDING}>Pending</option>
                  <option value={statusEnum.ACCEPTED}>Accepted</option>
                  <option value={statusEnum.REJECTED}>Rejected</option>
                  <option value={statusEnum.INTERVIEWING}>Interviewing</option>
                </select>
              </p>
            </a>
          )}
          <CandidateLinks link={candidate.resumeID} text="Resume" />
          <CandidateLinks link={candidate.website} text="Website" />
          <CandidateLinks link={candidate.linkedIn} text="LinkedIn" />
          <CandidateLinks link={candidate.github} text="Github" />
        </div>
        <div className="padded-all-sm">
          {candidate.major ? (
            <p>
              <b>Major:</b> {candidate.major}
            </p>
          ) : (
            <p> </p>
          )}
          <p>
            <b>Graduation Date:</b> {candidate.graduationDate}
          </p>
          <p>
            <b>Year:</b> {candidate.year}
          </p>
          {candidate.minor ? (
            <p>
              <b>Minor:</b> {candidate.minor}
            </p>
          ) : null}

          <p>
            <b>Applied Role:</b> {candidate.role !== undefined ? candidate.role.join(', ') : null}
          </p>
          <p>
            <b>Github Contributions:</b> {candidate.githubContributions}
          </p>
          <p>
            <b>Role Reason:</b> {candidate.roleReason}
          </p>
          <p>
            <b>Reason for joining:</b> {candidate.joinReason}
          </p>
          <p>
            <b>Time Commitment List:</b> {candidate.timeCommitment}
          </p>
          <p>
            <b>Tech Experience:</b> {candidate.techExperience}
          </p>
          <p>
            <b>Classes Taken:</b>
            {candidate.classesTaken != undefined ? candidate.classesTaken.join(', ') : null}
          </p>
          <p>
            <b>How They know us:</b> {candidate.howTheyKnowUs}
          </p>
          <p>
            <b>Additional Comments:</b> {candidate.additionalComments}
          </p>
          {this.props.showFacemash && candidate.facemashRankings != undefined ? (
            <>
              <h5>Facemash Statistics</h5>
              <p>
                <b>Facemash Score: </b> {candidate.facemashRankings.elo}
              </p>
              <p>
                <b>Number of Matches: </b> {candidate.facemashRankings.numOfMatches}
              </p>
            </>
          ) : null}
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FacemashProfile)
