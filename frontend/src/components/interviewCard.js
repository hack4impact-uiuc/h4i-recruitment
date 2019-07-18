// @flow
import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalFooter } from 'reactstrap'

class InterviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleViewDetails() {
    this.props.onViewDetails(this.props.interview)
  }

  async handleDeleteClick() {
    await this.props.handleDelete()
    this.toggle()
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalHeader>
            Are you sure you want to delete this interview? You won't be able to get it back.
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => this.toggle()}>Return</Button>
            <Button onClick={this.handleDeleteClick}>Delete</Button>
          </ModalFooter>
        </Modal>
        <Card className="candidate-card">
          <CardBody>
            <CardTitle>Overall Interview Score: {this.props.overallScore}</CardTitle>
            <p>
              <b>Round: </b> {this.props.interview.round}
            </p>
            <p>
              <b>Interviewer: </b>
              {this.props.interviewer}
            </p>
            <>
              <Button onClick={() => this.handleViewDetails()}>View Details</Button>
              <Button onClick={() => this.toggle()}>Delete (Directors Only)</Button>
            </>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default InterviewCard
