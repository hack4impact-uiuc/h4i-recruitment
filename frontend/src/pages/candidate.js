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
      addNotesModal: false
    }
  }
  static async getInitialProps({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getCandidateById(query.id)
      return { result }
    } catch (err) {
      console.log('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }
  toggle = () => {
    this.setState({
      addNotesModal: !this.state.addNotesModal
    })
  }
  submitComment = comment => {
    // TODO: make request
    const res = addCommentToCandidate(this.props.result._id, comment)
    this.setState({
      addNotesModal: !this.state.addNotesModal
    })
    // workaround for now
    window.location.reload()
  }
  goBack = () => {
    Router.back()
  }

  render() {
    if (!this.props.result) {
      return <div>User doesn&#39;t exist</div>
    }
    const candidate = this.props.result
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

export default withRouter(CandidatePage)
