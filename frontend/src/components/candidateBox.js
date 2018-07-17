// @flow
import React, { Component } from 'react'
import { getCandidateById } from '../utils/api'
import Head from './head'
import { Container, Button, Badge } from 'reactstrap'
import { setCandidateStatus } from '../utils/api'

type Props = {
  candidate: {}
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
    this.setState({ status: e.target.value })
  }
  render() {
    if (!this.props.candidate) {
      return <div>User doesn&#39;t exist</div>
    }
    const { candidate } = this.props
    return (
      <div>
        <div>
          <h2>
            {candidate.name}
            <Badge color={this.state.status == 'rejected' ? 'danger' : 'success'}>
              {this.state.status}
            </Badge>
          </h2>
          <a>
            <p>
              Change Status:
              <select onChange={this.handleChange}>
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="interviewing">Interviewing</option>
              </select>
            </p>
          </a>
          <a
            style={{ textDecoration: candidate.resumeID ? null : 'line-through' }}
            href={`http://localhost:8080/files/${candidate.resumeID}`}
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
        </div>
        <p>
          <b>Major:</b> {candidate.major}
        </p>
        <p>
          <b>Graduation Date:</b> {candidate.graduationDate}
        </p>
        <p>
          <b>Minor:</b> {candidate.minor}
        </p>

        <p>
          <b>Applied Role:</b> {candidate.role}
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
      </div>
    )
  }
}

export default CandidateBox
