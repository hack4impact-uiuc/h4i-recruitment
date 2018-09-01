import React from 'react'
import { Badge } from 'reactstrap'
import { statusEnum } from '../utils/enums'

// a Bootstrap badge that changes colors depending on the status
class CandidateStatus extends React.Component {
  render() {
    const { status } = this.props
    return (
      <>
        {status && status === statusEnum.ACCEPTED ? (
          // Replaced the span with Badge for easier, more consistent styling
          <Badge color="success">Accepted</Badge>
        ) : (
          <></>
        )}

        {status && status === statusEnum.PENDING ? <Badge color="warning">Pending</Badge> : <></>}

        {status && status === statusEnum.DENIED ? <Badge color="danger">Rejected</Badge> : <></>}

        {status && status === statusEnum.INTERVIEWING ? (
          <Badge color="info">Interviewing</Badge>
        ) : (
          <></>
        )}
      </>
    )
  }
}

export default CandidateStatus
