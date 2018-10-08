// @flow
import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Container, Button, ListGroup, ListGroupItem } from 'reactstrap'
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
      <Container>
        <p>
          <b>Overall Score:</b> {interview.overall_score}
        </p>
        <p>
          <b>Category:</b> {interview.category}
        </p>
        <p>
          <b>Category Notes:</b> {interview.category_notes}
        </p>
        <p className="textarea-input">
          <b>General Notes:</b> {interview.general_notes}
        </p>
        <ListGroup>
          {interview.sections.map(section => {
            return (
              <ListGroupItem key={section.section_name}>
                <h5>
                  {section.section_name}: {section.questions[0].score}
                </h5>
                <p className="textarea-input">Notes:{section.section_notes}</p>
              </ListGroupItem>
            )
          })}
        </ListGroup>
        <div>
          <Button value={this.props.interview} onClick={() => this.handleExitDetails()}>
            Exit Details
          </Button>
        </div>
      </Container>
    )
  }
}

export default InterviewDetails
