//@flow
import React from 'react'
import { Container, Row, Table, Badge, Media } from 'reactstrap'
import Link from 'next/link'
import { getCandidates, setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import CandidateStatus from '../components/candidateStatus'
import CandidateLinksBadge from '../components/candidateLinksBadge'
import { compareByFacemashScore } from '../utils/core'
import ChangeStatus from '../components/changeStatus'

type Props = {}

class TablePage extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      candidates: []
    }
  }
  async componentDidMount() {
    const res = await getCandidates()
    let candidates = res.result
    this.setState({
      candidates: res.result == undefined ? [] : res.result
    })
  }
  handleChange = async e => {
    let newCandidates = this.state.candidates.map(candidate => {
      if (candidate._id === e.target.name) {
        candidate.status = e.target.value
      }
      return candidate
    })
    await setCandidateStatus(e.target.name, e.target.value)
    this.setState({ candidates: newCandidates })
  }

  render() {
    const { candidates } = this.state
    let filteredCandidates = candidates.filter(
      candidate =>
        candidate.status !== statusEnum.REJECTED && candidate.status !== statusEnum.INVALID
    )
    filteredCandidates.sort(compareByFacemashScore)
    return (
      <Container>
        <Row>
          <h4>Ordered by Facemash Ranking. 'Rejected'/'Invalid' Filtered out</h4>
          <Table size="sm" hover className="candidate-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Graduation Date</th>
                <th>Links</th>
                <th>FaceMash Score</th>
                <th>Matches</th>
                <th>Change Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredCandidates != undefined &&
                filteredCandidates.map((candidate, key) => (
                  <tr key={candidate._id}>
                    <th scope="row">{key + 1}</th>
                    <td>{candidate.name}</td>
                    <td>{candidate.email}</td>
                    <td>
                      <h6>
                        <CandidateStatus status={candidate.status} />
                      </h6>
                    </td>
                    <td>{candidate.graduationDate}</td>
                    <td>
                      <CandidateLinksBadge link={candidate.resumeID} text="Resume" />
                      <CandidateLinksBadge link={candidate.linkedIn} text="LinkedIn" />
                      <CandidateLinksBadge link={candidate.github} text="Github" />
                      <CandidateLinksBadge link={candidate.website} text="Website" />
                    </td>
                    <td>
                      {candidate.facemashRankings != undefined
                        ? candidate.facemashRankings.elo
                        : null}
                    </td>
                    <td>
                      {candidate.facemashRankings != undefined
                        ? candidate.facemashRankings.numOfMatches
                        : null}
                    </td>
                    <td>
                      <ChangeStatus candidateID={candidate._id} handleChange={this.handleChange} />
                    </td>
                    <td>
                      <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
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
    )
  }
}

export default TablePage
