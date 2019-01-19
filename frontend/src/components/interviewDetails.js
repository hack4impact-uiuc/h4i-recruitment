// @flow
import React, { Component } from 'react'
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap'
import Router from 'next/router'

const handler = (_id: string) =>
  Router.push({
    pathname: '/candidate',
    query: { id: _id }
  })

type Props = {
  candidate: Array<mixed> // TODO: make this more specific
}

class InterviewDetails extends Component {
  constructor(props) {
    super(props)
  }

  handleExitDetails() {
    this.props.onExitDetails()
  }
  render() {
    let interview = this.props.interview
    return (
      <Container fluid>
        <p>
          <b>Overall Score:</b> {interview.overall_score}
        </p>
        <p className="textarea-input">
          <b>General Notes:</b> {interview.general_notes}
        </p>
        <ListGroup>
          {interview.sections.map(section => (
            <ListGroupItem key={section.title}>
              <h5>
                {section.title}:{' '}
                {section.response.score ? section.response.score : section.response.text}
              </h5>
              {section.response.notes ? (
                <p className="textarea-input">Notes: {section.response.notes}</p>
              ) : null}
            </ListGroupItem>
          ))}
        </ListGroup>
        <div>
          <Button
            style={{ marginTop: 5 }}
            value={this.props.interview}
            onClick={() => this.handleExitDetails()}
          >
            Exit Details
          </Button>
        </div>
      </Container>
    )
  }
}

export default InterviewDetails
