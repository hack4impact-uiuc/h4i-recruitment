import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Container, Button, Alert, Row, Col } from 'reactstrap'
import Router, { withRouter } from 'next/router'
import { getCandidateById, addCommentToCandidate } from '../utils/api'
import configureStore from './../store/appStore'
import Candidate from '../components/candidateBox'
import candidateInterviewsModal from '../components/candidateInterviewsModal'
import AddCommentsModal from '../components/addCommentsModal'
import CommentBox from '../components/commentBox'
import ErrorMessage from '../components/errorMessage'
import { addInterviewCandidate } from './../actions'
import { bindActionCreators } from 'redux'
import { getCandidateInterviews } from '../utils/api'
import CandidateInterviewsModal from '../components/candidateInterviewsModal'

type Props = {}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addInterviewCandidate
    },
    dispatch
  )
}

const mapStateToProps = state => ({})

class CandidatePage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
      interviews:[],
      addNotesModal: false,
      candidate: null,
      modalOpen: false,
      comments: []
    }
  }
  async componentDidMount() {
    const { query } = Router
    const { result } = await getCandidateById(query.id)
    this.setState({
      candidate: result,
      comments: result != undefined ? result.comments : []
    })
  }
  toggle = () => {
    this.setState({
      addNotesModal: !this.state.addNotesModal
    })
  }
  submitComment = comment => {
    const res = addCommentToCandidate(this.state.candidate._id, comment)
    this.setState({
      addNotesModal: !this.state.addNotesModal
    })
    let commentsState = this.state.comments
    commentsState.push({ writerName: 'You', text: comment, created_at: 'Now' })
    this.setState({
      comments: commentsState
    })
  }
  goBack = () => {
    Router.back()
  }
  async handleShowAllInterviews(id){
    const {result} = await getCandidateInterviews(id)
    this.setState({
      interviews: result,
      modalOpen: true
    })
  }
  async handleAddInterview(candidateId, candidateName) {
    const { addInterviewCandidate } = this.props
    await addInterviewCandidate(candidateId, candidateName)
    Router.push('/interview')
  }
  exitModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  render() {
    if (this.state.candidate == undefined) {
      return (
        <ErrorMessage message="User doesn&#39;t exist. Check if your key has the correct privileges." />
      )
    }
    const { candidate } = this.state
    return (
      <>
        <Container className="mt-5">
          <Row>
            <Col md={12}>
              <Candidate candidate={candidate} />
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Button
                onClick={() => this.handleAddInterview(candidate._id, candidate.name)}
                outline
                color="primary"
              >
                Add Interview
              </Button>
              <Button outline color="primary" className="margin-sm-all" onClick={this.toggle}>
                Add Comment
              </Button>
              <Button outline color="primary" onClick={() => this.handleShowAllInterviews(candidate._id)}>
                Show Candidate Interviews
              </Button>
            </Col>
            <Col md={4}>
              <Button color="primary" onClick={this.goBack}>
                Back
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <CandidateInterviewsModal isOpen={this.state.modalOpen} candidateId={candidate._id} exitModal={this.exitModal} candidateName ={candidate.name} interviews={this.state.interviews} />
              <AddCommentsModal
                submit={this.submitComment}
                isOpen={this.state.addNotesModal}
                toggle={this.toggle}
              />
              <CommentBox comments={candidate.comments} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidatePage)
