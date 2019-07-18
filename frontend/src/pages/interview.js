import { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Row,
  FormFeedback,
  Toast,
  ToastHeader,
  ToastBody,
} from 'reactstrap'
import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import { fetchAllCandidates, addFilter, removeFilter } from '../actions'
import CandidateDropdown from '../components/candidateDropdown'
import ErrorMessage from '../components/errorMessage'
import InterviewSectionCard from '../components/interviewSectionCard'
import VerificationModal from '../components/verificationModal'
import InterviewSectionModular from '../components/interviewSectionModular'
import { getKey, addInterview, getCandidates } from '../utils/api'
import roundData from '../data/roundData'
import Nav from '../components/nav'
import Head from '../components/head'

type Props = {
  error: boolean,
  filters: Object,
  sort: Object,
  candidateId: String,
  candidateName: String,
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAllCandidates,
      addFilter,
      removeFilter,
    },
    dispatch
  )
}

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  loading: state.candidateListPage.candidatesLoading,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
  sort: state.candidateListPage.sort,
  candidateId: state.interview.candidateId,
  candidateName: state.interview.candidateName,
  round: state.round,
})

class Interview extends Component<Props> {
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      candidates: [],
      error: this.props.error,
      filters: this.props.filters,
      sort: this.props.sort,
      candidateId: '',
      candidateName: '',
      overallScore: 0,
      generalNotes: '',
      sections: roundData.rounds[this.props.round].sections,
      interviewName: roundData.rounds[this.props.round].name,
      interviewScored: roundData.rounds[this.props.round].scored,
      verificationModalOpen: false,
    }
  }

  handleSubmitClick = e => {
    e.preventDefault()
    this.setState({
      verificationModalOpen: true,
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submit = async e => {
    this.setState({
      loading: true,
    })
    console.log('Adding Interview....')
    let overallScore = 0
    let scoreInSectionFlag = false
    const sections = this.state.sections
    for (let idx in sections) {
      if (sections[idx].response.score !== undefined) {
        overallScore += parseInt(sections[idx].response.score)
        scoreInSectionFlag = true
      }
    }
    // if all sections don't have a score section
    if (!scoreInSectionFlag) {
      overallScore = null
    }
    if (this.props.candidateName === '' || this.props.candidateId === '') {
      const msg = 'Interview does not have a Candidate. Please put down a candidate.'
      alert(msg)
    } else {
      const res = await addInterview(
        getKey(),
        this.props.candidateId,
        this.props.candidateName,
        overallScore,
        this.state.generalNotes,
        this.state.sections,
        this.state.interviewName,
        this.state.interviewScored
      )
      alert('Successfully added interview')
      Router.push({ pathname: '/candidate', query: { id: this.props.candidateId } })
    }
    this.setState({
      loading: false,
    })
  }
  async componentDidMount() {
    const res = await getCandidates()
    this.setState({
      candidates: res.result,
    })
  }

  toggle = () => {
    this.setState({
      verificationModalOpen: !this.state.verificationModalOpen,
    })
  }

  render() {
    let { error, filters, sort } = this.props
    let { candidates } = this.state
    if (error) {
      console.error(error)
      return (
        <>
          <Nav />
          <ErrorMessage
            code="404"
            message={`Bad Fetch with ${error}. Candidates may be empty. Check if you are logged in.`}
          />
        </>
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
      <>
        <Head title={`Adding ${this.props.candidateName} Interview`} />
        <Nav />
        <Container>
          <Row style={{ marginTop: '20px' }}>
            <Col md="2" />
            <Col md="2">
              <h3>Interviewing</h3>
            </Col>
            <Col md="4">
              <CandidateDropdown candidates={candidates} />
            </Col>
            <Col md="4">
              <Toast>
                <ToastHeader icon="warning">
                  Write your notes somewhere else & copy it over afterwards!
                </ToastHeader>
                <ToastBody>Just in case, so you won't lose any of your notes.</ToastBody>
              </Toast>
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
                    href={roundData.rounds[this.props.round].interviewGuide}
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
          <VerificationModal
            loading={this.state.loading}
            open={this.state.verificationModalOpen}
            cancelAction={this.toggle}
            submitAction={this.submit}
            header="Are you sure you want to submit? Have you filled out everything?"
            body="There&#39;s no turning back... Everything is immutable :) The backend often goes
                  to sleep. Wait a bit before you click 'Submit' again."
          />

          <Row>
            <Col>
              <Form>
                {sections.map(section => (
                  <InterviewSectionModular
                    title={section.title}
                    description={section.description}
                    prompt={section.prompt}
                    type={section.type}
                    scoreOptions={section.scoreOptions}
                    textOptions={section.textOptions}
                    notesPrompt={section.notesPrompt}
                    response={section.response}
                  />
                ))}
                <InterviewSectionCard title="General Notes">
                  <Label>
                    <b>
                      Any other notes that the rubric didn&#39;t cover or emphasis you&#39;d like to
                      make? Any general thoughts about this Candidate?
                    </b>
                  </Label>
                  <Input
                    style={{ height: '150px' }}
                    type="textarea"
                    className="textarea-input"
                    name="generalNotes"
                    value={this.state.generalNotes}
                    onChange={this.handleChange}
                    placeholder="Please put as many notes as possible! It'll help a lot during deliberations."
                    invalid={this.state.generalNotes === ''}
                  />
                  <FormFeedback>
                    Please fill in your general thoughts about this candidate!
                  </FormFeedback>
                </InterviewSectionCard>
                <FormGroup>
                  <Link prefetch href="/interviewportal">
                    <Button
                      disabled={this.state.generalNotes === ''}
                      color="primary"
                      onClick={this.handleSubmitClick}
                    >
                      Submit
                    </Button>
                  </Link>
                </FormGroup>
              </Form>
            </Col>
            {/* <Col md="6">
            {candidate != undefined ? (
              <FacemashProfile showFacemash={true} candidate={candidate} />
            ) : (
              <h4 className="text-center align-middle">
                Pick a User to interview and their profile will show up here
              </h4>
            )}
            <iframe
              className="embed-doc embed-responsive-item"
              src="https://docs.google.com/a/illinois.edu/document/d/e/2PACX-1vRISnK6xFN-_10jJWyORT-xvp8KGPNSi0YOkHNvN8PlMaHc-U-DAjssfDe1T4SFHhUQpxyPCQk--nP2/pub?embedded=true"
            />
          </Col> */}
          </Row>
        </Container>
      </>
    )
  }
}
// export default Interview
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interview)
