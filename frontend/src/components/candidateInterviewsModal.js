import React from 'react'
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardCol,
  Button,
  Input,
  FormText
} from 'reactstrap'
import InterviewCard from './interviewCard'
import InterviewDetails from './interviewDetails'
type Props = {}

class CandidateInterviewsModal extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      viewDetails: false,
      currentInterview: null
    }
  }
  async componentDidMount() {}
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
            ) : this.props.interviews ? (
              this.props.interviews.map(interview => {
                return (
                  <InterviewCard
                    onViewDetails={this.handleViewDetails}
                    interview={interview}
                    key={interview._id}
                    overallScore={interview.overall_score}
                    category={interview.category}
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
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default CandidateInterviewsModal
