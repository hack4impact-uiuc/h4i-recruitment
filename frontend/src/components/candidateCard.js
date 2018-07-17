// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/appStore'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import FileIcon from '../static/icons/file.svg'
import Router from 'next/router'
import { setCandidateStatus } from '../utils/api'
import { statusenum } from '../utils/enums'
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
            <Link href={{ pathname: '/candidate', query: { id: candidate._id } }}>
              <a className="card-title">{candidate.name}</a>
            </Link>
            <a
              className="card-links"
              style={{
                textDecoration: candidate.resumeID ? null : 'line-through'
              }}
              href={`${candidate.resumeID}`}
            >
              Resume
            </a>
            <a
              className="card-links"
              style={{
                textDecoration: candidate.website ? null : 'line-through'
              }}
              href={`${candidate.website}`}
            >
              Website
            </a>
          </CardTitle>
          <div onClick={e => handler(candidate._id)}>
            <p>
              Major: <span className="highlight">{candidate.major}</span>
            </p>
            <p>
              <span className="highlight">{candidate.graduationDate}</span>
            </p>
            <p>
              <span className="highlight">{candidate.role}</span>
            </p>
            <p>
              Hours: <span className="highlight">{candidate.timeCanDevote}</span>
            </p>
            <p>
              Status: <span className="highlight">{this.state.status}</span>
            </p>
            <p>
              Year: <span className="highlight">{candidate.year}</span>
            </p>
          </div>
          <p>
            Change Status:
            <select onChange={this.handleChange}>
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value={statusenum.PENDING}>Pending</option>
              <option value={statusenum.ACCEPTED}>Accepted</option>
              <option value={statusenum.DENIED}>Rejected</option>
              <option value={statusenum.INTERVIEWING}>Interviewing</option>
            </select>
          </p>
        </CardBody>
      </Card>
    )
  }
}

const connectedCandidateCardComponent = connect(
  null,
  mapDispatchToProps
)(CandidateCardComponent)

export default withRedux(configureStore)(connectedCandidateCardComponent)
