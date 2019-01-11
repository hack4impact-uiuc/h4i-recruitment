import { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Card, CardBody, CardText, CardTitle, Container, Col, Row } from 'reactstrap'
import InterviewSectionCard from '../components/interviewSectionCard'
import roundData from '../../../data/roundData.js'
import CandidateDropdown from '../components/candidateDropdown'
import { setRoundRedux } from '../actions'
import { timingSafeEqual } from 'crypto'

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  loading: state.candidateListPage.candidatesLoading,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
  sort: state.candidateListPage.sort,
  candidateId: state.interview.candidateId,
  candidateName: state.interview.candidateName,
  round: state.round
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

class Rounds extends Component {
  constructor(props) {
    super(props)
  }
  state = {}

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  produceCurrentRound = () => {
    return roundData.rounds[this.props.round].type === 'interview' ? (
      roundData.rounds[this.props.round].questions.map(this.interpretQuestions)
    ) : (
      <InterviewSectionCard
        title={
          'The current round is ' +
          roundData.rounds[this.props.round].name +
          " which doesn't necessitate an interview."
        }
      />
    )
  }

  interpretQuestions = questions => {
    return (
      <InterviewSectionCard
        title={questions.filter(question => question.type === 'title')[0]['title']}
      >
        {questions.map(this.interpretQuestion)}
      </InterviewSectionCard>
    )
  }

  interpretQuestion = question => {
    switch (question.type) {
      case 'title':
        return
      case 'text':
        return <CardText>{question.body}</CardText>
      case 'dropdown':
        return 'idk how to make a dropdown'
      case 'prompt':
        return 'write something here: jk idk how to make a prompt box thing'
      case 'list':
        return (
          <CardText>
            <ul>
              {question.items.map(item => (
                <li>item</li>
              ))}
            </ul>
          </CardText>
        )
      default:
        return 'erm . . . something in roundData.js was not formatted correctly'
    }
  }

  render() {
    let { error, filters, sort } = this.props
    let { candidates } = this.state
    if (error) {
      console.error(error)
      return (
        <ErrorMessage
          code="404"
          message={`Bad Fetch with ${error}. Candidates may be empty. Check if you are logged in.`}
        />
      )
    }
    const statusFilter = filters.statuses
    const { sections } = this.state
    let candidate = null
    if (candidates != undefined) {
      candidates = candidates.filter(candidate => {
        return statusFilter.includes(candidate.status)
      })
      const filtered_candidates = candidates.filter(
        candidate => candidate._id == this.props.candidateId
      )
      if (filtered_candidates.length != 0) {
        candidate = filtered_candidates[0]
      }
    } else {
      candidates = []
    }
    return (
      <Container>
        <Row style={{ marginTop: '20px' }}>
          <Col md="2" />
          <Col md="2">
            <h3>Interviewing</h3>
          </Col>
          <Col md="4">
            <CandidateDropdown candidates={candidates} />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            Some quick links:
            <ul>
              {this.props.candidateName !== '' && this.props.candidateID !== '' ? (
                <li>
                  <a
                    href={`/candidate?id=${this.props.candidateId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.props.candidateName}&#39;s Page
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/document/d/1S-rDqfEOWVCQImTQ8zIu_Aj4L-YBi5aCjlawvQrQJ6A/edit#"
                >
                  Interview Guide
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/document/d/1119YvTWvh58L7eOy-FvVvLyb9wLzZLImQSPBO3yPszI/edit"
                >
                  Interview Tips
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="align-middle round-box">{this.produceCurrentRound()}</div>
      </Container>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rounds)
