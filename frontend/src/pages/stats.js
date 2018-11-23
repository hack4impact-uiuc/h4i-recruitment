import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { getCandidates } from '../utils/api'
import { statusEnum, yearsEnum } from '../utils/enums'

type Props = {}

class StatsPage extends Component<Props> {
  constructor() {
    super()
    this.state = {
      candidates: []
    }
  }
  async componentDidMount() {
    const res = await getCandidates()
    this.setState({
      candidates: res.result
    })
  }
  getInterviewingEmails = () => {
    let filtered = this.state.candidates.filter(
      candidate => candidate.status === statusEnum.INTERVIEWING
    )
    return filtered.map(candidate => candidate.email)
  }
  render() {
    const { candidates } = this.state
    const interviewingCandidates = candidates.filter(
      candidate => candidate.status === statusEnum.INTERVIEWING
    )
    return (
      <>
        <Container>
          <h1>Statistics</h1>
          <p>This is a place for a bunch of unorganized stats</p>
          <p>
            Pending:
            {candidates.filter(candidate => candidate.status === statusEnum.PENDING).length}
          </p>
          <p>
            Interviewed:
            {candidates.filter(candidate => candidate.status === statusEnum.INTERVIEWING).length}
          </p>
          <p>
            Done Interviewing:
            {
              candidates.filter(candidate => candidate.status === statusEnum.DONE_INTERVIEWING)
                .length
            }
          </p>
          <p>
            Rejected:
            {candidates.filter(candidate => candidate.status === statusEnum.REJECTED).length}
          </p>
          <p>
            Invalid:
            {candidates.filter(candidate => candidate.status === statusEnum.INVALID).length}
          </p>
          <p>
            Accepted:
            {candidates.filter(candidate => candidate.status === statusEnum.ACCEPTED).length}
          </p>

          <h4>Class Distribution After initial Sweep:</h4>
          <p>
            # of Freshman Applied:
            {candidates.filter(candidate => candidate.year === yearsEnum.FRESHMAN).length}
          </p>
          <p>
            # of Sophomores Applied:{
              candidates.filter(candidate => candidate.year === yearsEnum.SOPHOMORE).length
            }
          </p>
          <p>
            # of Juniors Applied:{
              candidates.filter(candidate => candidate.year === yearsEnum.JUNIOR).length
            }
          </p>
          <p>
            # of Seniors Applied:
            {candidates.filter(candidate => candidate.year === yearsEnum.SENIOR).length}
          </p>

          <h3>Matches</h3>
          <p># of Matches made: </p>
          <p>Avg number of matches per Candidate</p>
          <p>Lowest Score: </p>
          <p>Highest Score: </p>
          <p>Average Score: </p>

          <h3>Status: Interviewing</h3>
          <p>
            # of Freshman:
            {
              interviewingCandidates.filter(candidate => candidate.year === yearsEnum.FRESHMAN)
                .length
            }
          </p>
          <p>
            # of Sophomores:
            {
              interviewingCandidates.filter(candidate => candidate.year === yearsEnum.SOPHOMORE)
                .length
            }
          </p>
          <p>
            # of Juniors:
            {interviewingCandidates.filter(candidate => candidate.year === yearsEnum.JUNIOR).length}
          </p>
          <p>
            # of Seniors:
            {interviewingCandidates.filter(candidate => candidate.year === yearsEnum.SENIOR).length}
          </p>

          <h3>List of Emails of the students who have status: Interviewing</h3>
          <p>
            {this.state.candidates
              .filter(candidate => candidate.status === statusEnum.INTERVIEWING)
              .map(candidate => candidate.email + ', ')}
          </p>

          <h3>Emails: Rejected</h3>
          <p>
            {this.state.candidates
              .filter(candidate => candidate.status === statusEnum.REJECTED)
              .map(candidate => candidate.email + ', ')}
          </p>
          <h3>Emails: Accepted</h3>
          <p>
            {this.state.candidates
              .filter(candidate => candidate.status === statusEnum.ACCEPTED)
              .map(candidate => candidate.email + ', ')}
          </p>
        </Container>
      </>
    )
  }
}

export default StatsPage
