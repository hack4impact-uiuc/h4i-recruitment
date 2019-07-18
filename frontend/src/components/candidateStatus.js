import React, { Component } from 'react'
import { Badge } from 'reactstrap'
import { statusEnum } from '../utils/enums'

// a Bootstrap badge that changes colors depending on the status
class CandidateStatus extends Component {
  render() {
    const { status } = this.props
    return (
      <>
        {status && status === statusEnum.ACCEPTED && <Badge color="success">Accepted</Badge>}
        {status && status === statusEnum.PENDING && <Badge color="warning">Pending</Badge>}
        {status && status === statusEnum.REJECTED && <Badge color="danger">Rejected</Badge>}
        {status && status === statusEnum.INTERVIEWING && <Badge color="info">Interviewing</Badge>}
        {status && status === statusEnum.INVALID && <Badge color="secondary">Invalid</Badge>}
        {status && status === statusEnum.DONE_INTERVIEWING && (
          <Badge color="primary">Done Interviewing</Badge>
        )}
      </>
    )
  }
}

export default CandidateStatus
