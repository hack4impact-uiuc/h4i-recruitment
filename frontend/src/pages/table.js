//@flow
import React from 'react'
import { Container, Row, Table, Badge, Media } from 'reactstrap'
import Link from 'next/link'
import { getCandidates, setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import CandidateStatus from '../components/candidateStatus'

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
    this.setState({
      candidates: res.result == undefined ? [] : res.result
    })
  }
  handleChange = e => {
    let newCandidates = this.state.candidates.map(candidate => {
      if (candidate._id === e.target.name) {
        candidate.status = e.target.value
      }
      return candidate
    })
    setCandidateStatus(e.target.name, e.target.value)
    console.log(e.target.name)
    this.setState({ candidates: newCandidates })
  }
  // sort function
  compareByFacemashScore = (candidate1, candidate2) => {
    if (candidate1.facemashRankings == undefined) {
      return 0
    }
    if (candidate1.facemashRankings.elo > candidate2.facemashRankings.elo) {
      return -1
    }
    if (candidate1.facemashRankings.elo < candidate2.facemashRankings.elo) {
      return 1
    }
    return 0
  }

  render() {
    const { candidates } = this.state
    let filteredCandidates = candidates.filter(candidate => candidate.status !== statusEnum.DENIED)
    filteredCandidates.sort(this.compareByFacemashScore)
    return (
      <Container>
        <Row>
          <h4>Ordered by Facemash Ranking. 'Rejected' Filtered out</h4>
          <Table size="sm" hover className="candidate-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
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
                    <td>
                      <h6>
                        <CandidateStatus status={candidate.status} />
                      </h6>
                    </td>
                    <td>{candidate.graduationDate}</td>
                    <td>
                      {candidate.resumeID ? (
                        <a className="card-links" href={`${candidate.resumeID}`}>
                          <Badge color="primary">Resume</Badge>
                        </a>
                      ) : (
                        <p className="space-fix-placeholder"> </p>
                      )}
                      {candidate.linkedIn ? (
                        <a className="card-links" href={`${candidate.linkedIn}`}>
                          <Badge color="primary">LinkedIn</Badge>
                        </a>
                      ) : (
                        <p className="space-fix-placeholder"> </p>
                      )}
                      {candidate.github ? (
                        <a className="card-links" href={`${candidate.github}`}>
                          <Badge color="primary">Github</Badge>
                        </a>
                      ) : (
                        <p className="space-fix-placeholder"> </p>
                      )}
                      {candidate.website ? (
                        <a className="card-links" href={`${candidate.website}`}>
                          <Badge color="primary">Website</Badge>
                        </a>
                      ) : (
                        <p className="space-fix-placeholder"> </p>
                      )}
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
                      <select name={candidate._id} onChange={this.handleChange}>
                        <option value="" selected disabled hidden>
                          Change status
                        </option>
                        <option value={statusEnum.PENDING}>Pending</option>
                        <option value={statusEnum.ACCEPTED}>Accepted</option>
                        <option value={statusEnum.DENIED}>Rejected</option>
                        <option value={statusEnum.INTERVIEWING}>Interviewing</option>
                      </select>
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
