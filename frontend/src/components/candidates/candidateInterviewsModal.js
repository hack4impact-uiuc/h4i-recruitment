// This is a Modal that opens up, showing a
// list of interviews a candidate
import React from 'react'
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import InterviewCard from '../interviewCard'
import InterviewDetails from '../interviewDetails'
import { getCandidateInterviews, deleteInterview } from '../../utils/api'
type Props = {}

class CandidateInterviewsModal extends React.Component<Props> {
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
    interviews &&
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
  delete = async interview => {
    this.setState({
      loading: true
    })
    await deleteInterview(this.props.candidateId, interview._id)
    const newInterviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
      interviews: newInterviews ? newInterviews.result : [],
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
                    handleDelete={() => this.delete(interview)}
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
