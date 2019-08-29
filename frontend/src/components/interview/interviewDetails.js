// @flow
import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem } from 'reactstrap'
import InterviewSectionCard from './interviewSectionCard'

class InterviewDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { interview } = this.props

    return (
      <Container fluid>
        <p>
          <b>Round: </b>
          {interview.round}
        </p>
        <p>
          <b>Overall Score:</b> {interview.overall_score}
        </p>
        <p className="textarea-input">
          <b>General Notes:</b> {interview.general_notes}
        </p>
        {interview.sections.map(section => (
          <InterviewSectionCard title={section.title} key={section.title}>
            <h5>{section.response.text ? section.response.text : section.response.score}</h5>
            {section.response.notes ? (
              <p className="textarea-input">
                <b>Notes:</b> {section.response.notes}
              </p>
            ) : (
              <p>No Notes :(</p>
            )}
          </InterviewSectionCard>
        ))}
      </Container>
    )
  }
}

export default InterviewDetails
