import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Container, Button, Alert, Row, Col } from 'reactstrap'
import Router, { withRouter } from 'next/router'
import { getCandidateById, addCommentToCandidate } from '../utils/api'
import configureStore from './../store/appStore'
import Candidate from '../components/candidateBox'
import AddCommentsModal from '../components/addCommentsModal'
import CommentBox from '../components/commentBox'

type Props = {}

class CandidatePage extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
      addNotesModal: false,
      candidate: null
    }
  }
  async componentDidMount() {
    const { query } = Router
    const { result } = await getCandidateById(query.id)
    this.setState({
      candidate: result
    })
  }
  toggle = () => {
    this.setState({
      addNotesModal: !this.state.addNotesModal
    })
  }
  submitComment = comment => {
    // TODO: make request

    const res = addCommentToCandidate(this.state.candidate._id, comment)
    this.setState({
      addNotesModal: !this.state.addNotesModal
    })
    Router.push(Router.route)
  }
  goBack = () => {
    Router.back()
  }
  render() {
    if (this.state.candidate == null) {
      return <div>User doesn&#39;t exist</div>
    }
    const candidate = this.state.candidate
    return (
      <>
        <Container className="mt-5">
          <Button color="primary" onClick={this.goBack}>
            Back
          </Button>
          <Candidate candidate={candidate} />
          <Button outline color="primary">
            Add Interview
          </Button>
          <Button outline color="primary" onClick={this.toggle}>
            Add Comment
          </Button>
          <AddCommentsModal
            submit={this.submitComment}
            isOpen={this.state.addNotesModal}
            toggle={this.toggle}
          />
          <CommentBox comments={candidate.comments} />
        </Container>
      </>
    )
  }
}

export default CandidatePage
