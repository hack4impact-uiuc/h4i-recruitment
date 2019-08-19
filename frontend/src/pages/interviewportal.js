import { Container, Button, Table, Row } from 'reactstrap'
import { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editInterview, newInterview } from '../actions'
import { getKey, getPastInterviews, deleteInterview } from '../utils/api'
import VerificationModal from '../components/verificationModal'
import ActionButton from '../components/actionButton'
import Nav from '../components/nav'
import Head from '../components/head'

const mapStateToProps = state => ({})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      editInterview,
      newInterview
    },
    dispatch
  )
}

// Main app
class InterviewPortal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interviews: [],
      verificationModalOpen: false,
      interviewToDelete: null,
      loading: false
    }
  }

  async componentDidMount() {
    const { result } = await getPastInterviews(getKey())
    if (result) {
      this.setState({ interviews: result })
    }
  }

  handleNewInterview = e => {
    const { newInterview } = this.props
    newInterview()
    Router.push('/interview')
  }

  async handleEditInterview(interview) {
    if (interview) {
      const { editInterview } = this.props
      await editInterview(interview)
      Router.push('/interview')
    }
  }

  toggle = () => {
    this.setState({
      interviewToDelete: null,
      verificationModalOpen: false
    })
  }

  handleDeleteClick = (interviewId, candidateId) => {
    this.setState({
      verificationModalOpen: true,
      interviewToDelete: { interviewId, candidateId }
    })
  }

  delete = async () => {
    this.setState({
      loading: true
    })
    const interview = this.state.interviewToDelete
    await deleteInterview(interview.candidateId, interview.interviewId)
    const newInterviews = this.state.interviews.filter(x => x._id !== interview.interviewId)
    this.setState({
      interviews: newInterviews,
      verificationModalOpen: false,
      interviewToDelete: null,
      loading: false
    })
  }

  render() {
    const { interviews } = this.state

    return (
      <>
        <Head title="Your Interviews" />
        <Nav />
        <Container>
          <h1>Interviews</h1>
          <Row style={{ marginBottom: '30px' }}>
            <ActionButton
              className="button-margin"
              text="New Interview"
              onClick={this.handleNewInterview}
            />
            <ActionButton className="button-margin" text="All Interviews" link="/interviewlist" />
          </Row>
          <VerificationModal
            open={this.state.verificationModalOpen}
            loading={this.state.loading}
            cancelAction={this.toggle}
            submitAction={this.delete}
            header="Are you sure you want to delete this interview?"
            body="There's no going back!"
          />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate Name</th>
                <th>Interview Overall Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews ? (
                interviews.map((interview, i) => {
                  return [
                    <tr key={i + 1}>
                      <td>{i + 1}</td>
                      <td>
                        <Link
                          href={{ pathname: '/candidate', query: { id: interview.candidate_id } }}
                        >
                          <a className="regular-anchor">{interview.candidate_name}</a>
                        </Link>
                      </td>
                      <td>{interview.overall_score}</td>
                      <td>
                        <Button onClick={() => this.handleEditInterview(interview)}>
                          Edit Interview
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() =>
                            this.handleDeleteClick(interview._id, interview.candidate_id)
                          }
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ]
                })
              ) : (
                <tr>No Interviews</tr>
              )}
            </tbody>
          </Table>
        </Container>
      </>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewPortal)
