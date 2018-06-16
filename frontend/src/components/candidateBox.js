// @flow
import { Component } from 'react'
import { getCandidateById } from '../utils/api'
import Head from './head'
import { Container, Button } from 'reactstrap'

type Props = {
  candidate: {}
}

const CandidateBox = (props: Props) => {
  if (!props.candidate) {
    return <div>User doesn't exist</div>
  }
  const { candidate } = props
  return (
    <div>
      <div>
        <h2>{candidate.name}</h2>
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

export default CandidateBox
