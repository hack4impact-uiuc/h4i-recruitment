// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Badge, Row, Col } from 'reactstrap'
import Router from 'next/router'
import { setCandidateStatus } from '../utils/api'
import { statusEnum } from '../utils/enums'
import { setStatus } from '../actions/actionCreators'
import CandidateLinksBadge from '../components/candidateLinksBadge'

const handler = (_id: string) => Router.push('/candidate/[cid]', (as = `/candidate/${_id}`))

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setStatus,
    },
    dispatch
  )
}

class CandidateCardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.candidate.status,
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
            <Row>
              <Col md={12}>
                {candidate.name && (
                  <Link href="/candidate/[cid]" as={`/candidate/${candidate._id}`}>
                    <a className="card-title">{candidate.name}</a>
                  </Link>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {candidate.status && candidate.status === 'Accepted' && (
                  // Replaced the span with Badge for easier, more consistent styling
                  <h5>
                    <Badge color="success">Accepted</Badge>
                  </h5>
                )}

                {candidate.status && candidate.status === 'Pending' && (
                  <h5>
                    <Badge color="warning">Pending</Badge>
                  </h5>
                )}

                {candidate.status && candidate.status === 'Rejected' && (
                  <h5>
                    <Badge color="danger">Rejected</Badge>
                  </h5>
                )}

                {candidate.status && candidate.status === 'Interviewing' && (
                  <h5>
                    <Badge color="info">Interviewing</Badge>
                  </h5>
                )}
              </Col>
            </Row>
          </CardTitle>
          <div onClick={e => handler(candidate._id)}>
            {candidate.major && (
              <p>
                Major: <span className="highlight">{candidate.major}</span>
              </p>
            )}
            {candidate.graduationDate && (
              <p>
                <span className="highlight">{candidate.graduationDate}</span>
              </p>
            )}

            {candidate.role && (
              <p>
                <span className="highlight">{candidate.role.join(', ')}</span>
              </p>
            )}

            {candidate.timeCanDevote && (
              <p>
                Hours: <span className="highlight">{candidate.timeCanDevote}</span>
              </p>
            )}

            {candidate.year && (
              <p>
                Year: <span className="highlight">{candidate.year}</span>
              </p>
            )}

            {candidate.facemashRankings && candidate.facemashRankings.elo && (
              <p>
                Facemash Score: <span className="highlight">{candidate.facemashRankings.elo}</span>
              </p>
            )}

            {candidate.facemashRankings && candidate.facemashRankings.numOfMatches && (
              <p>
                Number of Matches:
                <span className="highlight">{candidate.facemashRankings.numOfMatches}</span>
              </p>
            )}
          </div>
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

          <Row>
            <Col md={12}>
              <CandidateLinksBadge link={candidate.resumeID} text="Resume" />
              <CandidateLinksBadge link={candidate.linkedIn} text="LinkedIn" />
              <CandidateLinksBadge link={candidate.github} text="Github" />
              <CandidateLinksBadge link={candidate.website} text="Website" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CandidateCardComponent)
