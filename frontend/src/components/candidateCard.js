// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import Router from 'next/router'
import { setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import { setStatus } from '../actions/actionCreators'

const handler = (_id: string) =>
  Router.push({
    pathname: '/candidate',
    query: { id: _id }
  })

type Props = {
  candidate: Array<mixed> // TODO: make this more specific
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setStatus
    },
    dispatch
  )
}

class CandidateCardComponent extends Component {
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
    const { candidate } = this.props
    return (
      <Card className="candidate-card">
        <CardBody>
          <CardTitle>
            {candidate.name ? (
              <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
                <a className="card-title">{candidate.name}</a>
              </Link>
            ) : (
              <></>
            )}
            {candidate.resumeID ? (
              <a className="card-links" href={`${candidate.resumeID}`}>
                <span class="badge badge-pill badge-primary">Resume</span>
              </a>
            ) : (
              <></>
            )}

            {candidate.website ? (
              <a className="card-links" href={`${candidate.website}`}>
                <span class="badge badge-pill badge-primary">Website</span>
              </a>
            ) : (
              <></>
            )}

            {candidate.linkedIn ? (
              <a className="card-links" href={`${candidate.linkedIn}`}>
                <span class="badge badge-pill badge-primary">LinkedIn</span>
              </a>
            ) : (
              <></>
            )}
          </CardTitle>
          <div onClick={e => handler(candidate._id)}>
            {candidate.major ? (
              <p>
                Major: <span className="highlight">{candidate.major}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.graduationDate ? (
              <p>
                <span className="highlight">{candidate.graduationDate}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.role ? (
              <p>
                <span className="highlight">{candidate.role.join(', ')}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.timeCanDevote ? (
              <p>
                Hours: <span className="highlight">{candidate.timeCanDevote}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.status ? (
              <p>
                Status: <span className="highlight">{this.state.status}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.year ? (
              <p>
                Year: <span className="highlight">{candidate.year}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.facemashRankings.elo ? (
              <p>
                Facemash Score: <span className="highlight">{candidate.facemashRankings.elo}</span>
              </p>
            ) : (
              <></>
            )}

            {candidate.facemashRankings.numOfMatches ? (
              <p>
                Number of Matches: <span className="highlight">{candidate.facemashRankings.numOfMatches}</span>
              </p>
            ) : (
              <></>
            )}
          </div>
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
        </CardBody>
      </Card>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CandidateCardComponent)
