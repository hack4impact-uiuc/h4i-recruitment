// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import Router from 'next/router'

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

class InterviewCard extends Component {
  constructor(props) {
    super(props)
  }
  handleChange = e => {
    setCandidateStatus(this.props.candidate._id, e.target.value)
    this.props.setStatus(this.props.candidate._id, e.target.value)
    this.setState({ status: e.target.value })
  }

  handleViewDetails() {
    this.props.onViewDetails(this.props.interview)
  }

  render() {
    return (
      <Card className="candidate-card">
        <CardBody>
          <CardTitle>Overall Interview Score: {this.props.overallScore}</CardTitle>
          <p>
            <b>Category: </b>
            {this.props.category}
          </p>
          <p>
            <b>Interviewer: </b>
            {this.props.interviewer}
          </p>
          <div>
            <Button onClick={() => this.handleViewDetails()}>
              View Details
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default InterviewCard
