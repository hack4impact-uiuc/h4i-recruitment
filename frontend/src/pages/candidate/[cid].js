/* route to page is /candidate/[cid] where [cid] is a string value of a candidate's id */

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import Router from 'next/router'
import Head from '../../components/head'
import { bindActionCreators } from 'redux'
import Candidate from '../../components/candidates/candidateBox'
import CandidateInterviewsModal from '../../components/candidates/candidateInterviewsModal'
import AddCommentsModal from '../../components/comments/addCommentsModal'
import CommentBox from '../../components/comments/commentBox'
import { ErrorMessage } from '../../components/common'
import Nav from '../../components/nav'
import {
  addReferral,
  addStrongReferral,
  deleteReferral,
  getCandidateById,
  addCommentToCandidate,
  getCandidateInterviews,
} from '../../utils/api'
import { addInterviewCandidate } from '../../actions'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addInterviewCandidate,
    },
    dispatch
  )
}

const mapStateToProps = state => ({})

class CandidatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
      interviews: [],
      addNotesModal: false,
      candidate: null,
      modalOpen: false,
      comments: [],
    }
  }
  async componentDidMount() {
    const query = Router.query
    const { result } = await getCandidateById(query.cid)
    this.setState({
      candidate: result,
      comments: result != undefined ? result.comments : [],
    })
  }

  toggle = () => {
    this.setState({
      addNotesModal: !this.state.addNotesModal,
    })
  }

  submitComment = comment => {
    addCommentToCandidate(this.state.candidate._id, comment)
    this.setState({
      addNotesModal: !this.state.addNotesModal,
    })
    let commentsState = this.state.comments
    commentsState.push({ writerName: 'You', text: comment, created_at: 'Now' })
    this.setState({
      comments: commentsState,
    })
  }

  goBack = () => {
    Router.back()
  }

  // handles the click to show all interviews. Modal pops up
  handleShowAllInterviews = async id => {
    const { result } = await getCandidateInterviews(id)
    this.setState({
      interviews: result,
      modalOpen: true,
    })
  }

  // goes to add the interview
  async handleAddInterview(candidateId, candidateName) {
    const { addInterviewCandidate } = this.props
    await addInterviewCandidate(candidateId, candidateName)
    Router.push('/interview')
  }

  // adds referral
  async handleReferral(candidateId) {
    const { result } = await addReferral(candidateId)
    this.setState({ candidate: { ...this.state.candidate, strongReferrals: result[0] } })
    this.setState({ candidate: { ...this.state.candidate, referrals: result[1] } })
  }

  // adds strong referral
  async handleStrongReferral(candidateId) {
    const { result } = await addStrongReferral(candidateId)
    this.setState({ candidate: { ...this.state.candidate, strongReferrals: result[0] } })
    this.setState({ candidate: { ...this.state.candidate, referrals: result[1] } })
  }

  // removes referral
  async handleRemoveReferral(candidateId) {
    const { result } = await deleteReferral(candidateId)
    this.setState({ candidate: { ...this.state.candidate, strongReferrals: result[0] } })
    this.setState({ candidate: { ...this.state.candidate, referrals: result[1] } })
  }

  exitModal = () => {
    this.setState({
      modalOpen: false,
    })
  }

  render() {
    if (!this.state.candidate) {
      return (
        <ErrorMessage message="User doesn&#39;t exist. Check if your key has the correct privileges." />
      )
    }
    const { candidate } = this.state
    return (
      <>
        <Head title={candidate.name} />
        <Nav />
        <Container className="mt-5">
          <Row>
            <Col md={12}>
              <Candidate
                candidate={candidate}
                handleShowAllInterviews={this.handleShowAllInterviews}
              />
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
              <Button
                outline
                color="primary"
                onClick={() => this.handleStrongReferral(candidate._id)}
              >
                Strong Refer
              </Button>
              <Button
                outline
                color="primary"
                className="ml-3"
                onClick={() => this.handleReferral(candidate._id)}
              >
                Refer
              </Button>
              <Button
                outline
                color="warning"
                className="ml-3"
                onClick={() => this.handleRemoveReferral(candidate._id)}
              >
                Delete Refer
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
              <CandidateInterviewsModal
                isOpen={this.state.modalOpen}
                candidateId={candidate._id}
                exitModal={this.exitModal}
                candidateName={candidate.name}
              />
              <AddCommentsModal
                submit={this.submitComment}
                isOpen={this.state.addNotesModal}
                toggle={this.toggle}
              />
              <hr />
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
