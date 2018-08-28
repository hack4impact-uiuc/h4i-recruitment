import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Container, Button, Alert, Row, Col } from 'reactstrap'
import Router, { withRouter } from 'next/router'
import { getCandidateById, addCommentToCandidate } from '../utils/api'
import configureStore from './../store/appStore'
import Candidate from '../components/candidateBox'
import AddCommentsModal from '../components/addCommentsModal'
import CommentBox from '../components/commentBox'
import { addInterviewCandidate } from './../actions'
import { bindActionCreators } from 'redux'

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
  async handleAddInterview(candidateId, candidateName) {
    const { addInterviewCandidate } = this.props
    await addInterviewCandidate(candidateId, candidateName)
    Router.push('/interview')
  }
  render() {
    if (this.state.candidate == null) {
      return <div>User doesn&#39;t exist</div>
    }
    const candidate = this.state.candidate
    return (
      <>
        <Container className="mt-5">
          <Row>
            <Col md={12}>
              <Candidate candidate={candidate} />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Button
                onClick={() => this.handleAddInterview(candidate._id, candidate.name)}
                outline
                color="primary"
              >
                Add Interview
              </Button>
              <Button outline color="primary" onClick={this.toggle}>
                Add Comment
              </Button>
            </Col>
            <Col md={6} className="text-right">
              <Button color="primary" onClick={this.goBack}>
                Back
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
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
