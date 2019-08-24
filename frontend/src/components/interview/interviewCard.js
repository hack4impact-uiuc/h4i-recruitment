// @flow
import React, { Component } from 'react'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalFooter } from 'reactstrap'
import VerificationModal from '../verificationModal'

class InterviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleViewDetails = () => {
    this.props.onViewDetails(this.props.interview)
  }

  handleDeleteClick = async () => {
    await this.props.handleDelete()
    this.toggle()
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    )

    return (
      <>
        <VerificationModal
          open={this.state.modal}
          cancelAction={this.toggle}
          submitAction={this.handleDeleteClick}
          header="Are you sure you want to delete this interview? You won't be able to get it back."
          submitText="Delete"
          danger={true}
        />
        <Card className="candidate-card">
          <CardBody>
            <CardTitle onClick={this.handleViewDetails}>
              Overall Interview Score: {this.props.overallScore}
            </CardTitle>
            <p>
              <b>Round: </b> {this.props.interview.round}
            </p>
            <p>
              <b>Interviewer: </b>
              {this.props.interviewer}
            </p>
            <>
              <Button color="info" onClick={this.handleViewDetails}>
                View Details
              </Button>
              <Button color="danger" className="ml-3" onClick={this.toggle}>
                Delete (Directors Only)
              </Button>
              <Link href="/interview/[interviewID]" as={`/interview/${this.props.interview._id}`}>
                <Button outline className="ml-2" color="success">
                  View Full Page
                </Button>
              </Link>
            </>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default InterviewCard
