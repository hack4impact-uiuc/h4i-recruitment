// This is a Modal that opens up, showing a
// list of interviews a candidate
import React, { Component } from 'react'
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import InterviewCard from '../interviewCard'
import InterviewDetails from '../interviewDetails'
import { getCandidateInterviews, deleteInterview } from '../../utils/api'


class CandidateInterviewsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewDetails: false,
      currentInterview: null,
      interviews: []
    }
  }

  async componentDidMount() {
    const interviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: interviews ? interviews.result : []
    })
  }

  handleViewDetails = interview => {
    this.setState({
      viewDetails: true,
      currentInterview: interview
    })
  }
  handleExitDetails = e => {
    this.setState({
      viewDetails: false,
      currentInterview: null
    })
  }
  delete = async interview => {
    await deleteInterview(this.props.candidateId, interview._id)
    const newInterviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: newInterviews ? newInterviews.result : []
    })
  }
  toggle = () => {
    this.setState({
      interviewToDelete: null,
      verificationModalOpen: false
    })
  }

  render() {
    return (
      <Container>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader>
            {!this.state.viewDetails
              ? this.props.candidateName + "'s Interviews"
              : this.state.currentInterview.candidate_name +
                "'s Interview By " +
                this.state.currentInterview.interviewer_name}
          </ModalHeader>
          <ModalBody>
            {this.state.viewDetails ? (
              <InterviewDetails
                onExitDetails={this.handleExitDetails}
                interview={this.state.currentInterview}
              />
            ) : this.state.interviews && this.state.interviews.length > 0 ? (
              this.state.interviews.map(interview => {
                return (
                  <InterviewCard
                    onViewDetails={this.handleViewDetails}
                    interview={interview}
                    key={interview._id}
                    overallScore={interview.overall_score}
                    interviewer={interview.interviewer_name}
                    handleDelete={() => this.delete(interview)}
                  />
                )
              })
            ) : (
              <p> No interviews for {this.props.candidateName} have been recorded so far </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.exitModal}>
              Exit
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default CandidateInterviewsModal
