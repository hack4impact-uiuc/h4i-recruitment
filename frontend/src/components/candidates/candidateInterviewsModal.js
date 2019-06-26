// This is a Modal that opens up, showing a
// list of interviews a candidate
import React from 'react'
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import InterviewCard from '../interviewCard'
import InterviewDetails from '../interviewDetails'
import { getCandidateInterviews } from '../../utils/api'
type Props = {}

class CandidateInterviewsModal extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      viewDetails: false,
      currentInterview: null,
      verificationModalOpen: false,
      interviewToDelete: null,
      interviews: []
    }
  }

  async componentDidMount() {
    const interviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: interviews.result || []
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
  handleDeleteClick = (interviewId, candidateId) => {
    this.setState({
      verificationModalOpen: true,
      interviewToDelete: { interviewId, candidateId }
    })
  }
  delete = async () => {
    this.setState({
      loading: true
    })
    const interview = this.state.interviewToDelete
    await deleteInterview(this.props.candidateId, interview.interviewId)
    const newInterviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: newInterviews,
      verificationModalOpen: false,
      interviewToDelete: null,
      loading: false
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
            ) : this.state.interviews ? (
              this.state.interviews.map(interview => {
                return (
                  <InterviewCard
                    onViewDetails={this.handleViewDetails}
                    interview={interview}
                    key={interview._id}
                    overallScore={interview.overall_score}
                    interviewer={interview.interviewer_name}
                  />
                )
              })
            ) : (
              <h1> No Interviews Have Been Recorded So Far </h1>
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
