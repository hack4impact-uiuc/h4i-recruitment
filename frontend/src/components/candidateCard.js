// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Button, Badge, Row, Col } from 'reactstrap'
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
            <Row>
              <Col md={12}>
                {candidate.name ? (
                  <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
                    <a className="card-title">{candidate.name}</a>
                  </Link>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {candidate.status && candidate.status === 'Accepted' ? (
                  // Replaced the span with Badge for easier, more consistent styling
                  <Badge color="success">Accepted</Badge>
                ) : (
                  <></>
                )}

                {candidate.status && candidate.status === 'Pending' ? (
                  <Badge color="warning">Pending</Badge>
                ) : (
                  <></>
                )}

                {candidate.status && candidate.status === 'Rejected' ? (
                  <Badge color="danger">Rejected</Badge>
                ) : (
                  <></>
                )}

                {candidate.status && candidate.status === 'Interviewing' ? (
                  <Badge color="info">Interviewing</Badge>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
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
                Number of Matches:{' '}
                <span className="highlight">{candidate.facemashRankings.numOfMatches}</span>
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

          <Row>
            <Col md={12}>
              {candidate.resumeID ? (
                <a className="card-links" href={`${candidate.resumeID}`}>
                  <Badge color="primary">Resume</Badge>
                </a>
              ) : (
                // Needed to create a placeholder class to use display: none,
                // which causes the element to basically not exist on the page
                // and take up no space
                <p className="space-fix-placeholder"> </p>
              )}
              <p className="space-fix-placeholder"> </p>

              {candidate.website ? (
                <a className="card-links" href={`${candidate.website}`}>
                  <Badge color="primary">Website</Badge>
                </a>
              ) : (
                <p className="space-fix-placeholder"> </p>
              )}
              <p className="space-fix-placeholder"> </p>

              {candidate.linkedIn ? (
                <a className="card-links" href={`${candidate.linkedIn}`}>
                  <Badge color="primary">LinkedIn</Badge>
                </a>
              ) : (
                <p className="space-fix-placeholder"> </p>
              )}
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
