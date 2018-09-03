import React from 'react'
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormText
} from 'reactstrap'
import { getCandidateInterviews } from '../utils/api'
import InterviewCard from './interviewCard';
type Props = {}

class CandidateInterviewsModal extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
        interviews: []
    }
  }
  handleChange = e => {
    this.setState({
      inputText: e.target.value
    })
  }
  async componentDidMount() {
    const interviews = await getCandidateInterviews(this.props.candidateId)
    this.setState({
        interviews: interviews
    })
  }

  render() {
    return (
      <Container>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader toggle={this.props.toggle}>{this.props.candidate}'s Interviews</ModalHeader>
          <ModalBody>
            {interviews.map(interview => {
                return (
                  <CardCol key={interview._id}>
                    <InterviewCard
                        overallScore={interview.overall_score}
                        category = "Don't Accept"
                        interviewer = {interview.interviewer_key}
                    />
                  </CardCol>
                )
              })}
            <InterviewCard
                overallScore='0'
                category = "Don't Accept"
                interviewer = 'Megha Mallya'
            />

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default CandidateInterviewsModal
