// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
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

class InterviewCard extends Component {
  constructor(props) {
    super(props)
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
            <b>Interviewer: </b>
            {this.props.interviewer}
          </p>
          <div>
            <Button onClick={() => this.handleViewDetails()}>View Details</Button>
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default InterviewCard
