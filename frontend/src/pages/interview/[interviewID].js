/* route to page is /interview/[interviewID] where [interviewID] is a string value of an interview's id */
import { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Container, Button, Row, Col } from 'reactstrap'
import { getInterviewByID } from '../../utils/api'
import { ErrorMessage } from '../../components/common'
import InterviewDetails from '../../components/interview/interviewDetails'
import VerificationModal from '../../components/verificationModal'
import Nav from '../../components/nav'
import Head from '../../components/head'
import { getKey, deleteInterview } from '../../utils/api'

class InterviewDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      interview: null,
      candidateID: '',
      candidateName: '',
      verificationModalOpen: false,
      loading: false,
    }
  }

  async componentDidMount() {
    const query = Router.query
    const { result, success, message } = await getInterviewByID(query.interviewID)
    if (success && result) {
      this.setState({
        interview: result.interview,
        candidateID: result.candidateID,
        candidateName: result.candidateName,
      })
    } else {
      this.setState({
        errorMessage: message,
      })
    }
  }

  goBack = () => {
    Router.back()
  }

  toggleOff = () => {
    this.setState({
      verificationModalOpen: false,
    })
  }
  handleDeleteClick = () => {
    this.setState({
      verificationModalOpen: true,
    })
  }

  delete = async () => {
    this.setState({
      loading: true,
    })
    const interview = this.state.interview
    await deleteInterview(interview.candidate_id, interview._id)
    this.setState({
      verificationModalOpen: false,
      loading: false,
    })
    Router.push('/interviewportal')
  }

  render() {
    const { interview, candidateName, candidateID } = this.state
    if (this.state.errorMessage !== '' || !interview) {
      return (
        <>
          <Head />
          <Nav />
          <ErrorMessage code={400} message={this.state.errorMessage} />
        </>
      )
    }
    const userKey = getKey()
    return (
      <>
        <Head
          title={candidateName !== '' ? `${candidateName} Interview Notes` : `Interview Notes`}
        />
        <Nav />
        <Container>
          <VerificationModal
            open={this.state.verificationModalOpen}
            loading={this.state.loading}
            cancelAction={this.toggleOff}
            submitAction={this.delete}
            header="Are you sure you want to delete this interview?"
            body="There's no going back!"
            danger={true}
          />
          <Row className="mt-3">
            <h2>{`${candidateName}'s Interview by ${interview.interviewer_name}`}</h2>
          </Row>
          <Row>
            <Button color="primary" onClick={this.goBack}>
              Back
            </Button>
            <Link href="/candidate/[cid]" as={`/candidate/${candidateID}`}>
              <Button className="ml-2" color="info" outline>
                {candidateName}'s Page
              </Button>
            </Link>
            <Link href="/interviewportal">
              <Button className="ml-2" color="primary" outline>
                Your Interviews
              </Button>
            </Link>
          </Row>
          <Row className="mt-4">
            <Col md="8">
              <InterviewDetails interview={interview} />
            </Col>
            <Col md="3">
              {userKey === interview.interviewer_key && (
                <Button className="ml-2" color="danger" onClick={this.handleDeleteClick}>
                  Delete
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default InterviewDetailPage
