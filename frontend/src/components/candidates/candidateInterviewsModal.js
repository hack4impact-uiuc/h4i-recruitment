// This is a Modal that opens up, showing a
// list of interviews a candidate
import React, { Component } from 'react'
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import Link from 'next/link'
import InterviewCard from '../interview/interviewCard'
import InterviewDetails from '../interview/interviewDetails'
import { getCandidateInterviews, deleteInterview } from '../../utils/api'

const closeBtn = ({ exitModal }) => (
  <button className="close" onClick={exitModal}>
    &times;
  </button>
)

class CandidateInterviewsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewDetails: false,
      currentInterview: null,
      interviews: [],
    }
  }

  async componentDidMount() {
    const interviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: interviews ? interviews.result : [],
    })
  }

  handleViewDetails = interview => {
    this.setState({
      viewDetails: true,
      currentInterview: interview,
    })
  }

  handleExitDetails = e => {
    this.setState({
      viewDetails: false,
      currentInterview: null,
    })
  }

  delete = async interview => {
    await deleteInterview(this.props.candidateId, interview._id)
    const newInterviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: newInterviews ? newInterviews.result : [],
    })
  }

  toggle = () => {
    this.setState({
      interviewToDelete: null,
      verificationModalOpen: false,
    })
  }

  render() {
    return (
      <Container>
        <Modal isOpen={this.props.isOpen} size="lg" toggle={this.props.exitModal}>
          <ModalHeader close={closeBtn}>
            {!this.state.viewDetails
              ? this.props.candidateName + "'s Interviews"
              : this.state.currentInterview.candidate_name +
                "'s Interview By " +
                this.state.currentInterview.interviewer_name}
          </ModalHeader>
          <ModalBody>
            {this.state.viewDetails ? (
              <>
                <InterviewDetails interview={this.state.currentInterview} />
                <div className="mt-3">
                  <Button outline value={this.props.interview} onClick={this.handleExitDetails}>
                    Exit Details
                  </Button>
                  <Link
                    href="/interview/[interviewID]"
                    as={`/interview/${this.state.currentInterview._id}`}
                  >
                    <Button outline className="ml-2" color="success">
                      View Full Page
                    </Button>
                  </Link>
                </div>
              </>
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
