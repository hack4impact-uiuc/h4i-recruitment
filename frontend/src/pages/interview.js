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
import { fetchAllCandidates, addFilter, removeFilter, fetchCandidatesSuccess } from '../actions'
import CandidateDropdown from '../components/candidateDropdown'
import { ErrorMessage } from '../components/common'
import InterviewSectionCard from '../components/interview/interviewSectionCard'
import VerificationModal from '../components/verificationModal'
import InterviewSectionModular from '../components/interviewSectionModular'
import { getKey, addInterview, getCandidates } from '../utils/api'
import roundData from '../data/roundData'
import Nav from '../components/nav'
import Head from '../components/head'
import InterviewQuickLinks from '../components/interview/interviewQuickLinks'
import GeneralNotesInput from '../components/interview/generalNotesInput'

type Props = {
  error: boolean,
  filters: Object,
  candidateId: String,
  candidateName: String,
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCandidatesSuccess,
      fetchAllCandidates,
      addFilter,
      removeFilter,
    },
    dispatch
  )
}

const mapStateToProps = state => ({
  candidates: state.candidateListPage.candidates,
  error: state.candidateListPage.candidatesError,
  filters: state.candidateListPage.filters,
  candidateId: state.interview.candidateId,
  candidateName: state.interview.candidateName,
  round: state.round,
})

class Interview extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      candidates: this.props.candidates,
      filters: this.props.filters,
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
      await addInterview(
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
      this.setState({
        sections: roundData.rounds[this.props.round].sections, // wipe inputs once submitted
      })
      Router.push('/candidate/[cid]', `/candidate/${this.props.candidateId}`)
    }
    this.setState({
      loading: false,
    })
  }

  async componentDidMount() {
    if (this.props.candidates.length !== 0) {
      return
    }
    // only fetch for candidates if redux store doesn't hold candidates
    const { result } = await getCandidates()
    this.props.fetchCandidatesSuccess(result)
    this.setState({
      candidates: result,
    })
  }

  componentDidUpdate(prevProps) {
    const { round } = this.props
    if (prevProps.round !== round) {
      const currRound = roundData.rounds[round]
      this.setState({
        sections: currRound.sections,
        interviewName: currRound.name,
        interviewScored: currRound.scored,
      })
    }
  }

  toggle = () => {
    this.setState({
      verificationModalOpen: !this.state.verificationModalOpen,
    })
  }

  render() {
    let { error, filters } = this.props
    let { candidates } = this.state
    if (error) {
      console.error(error)
      return (
        <>
          <Nav />
          <ErrorMessage
            code="404"
            message={`Bad Fetch with ${error}. Candidates may be empty.Check if you are logged in.`}
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
              <InterviewQuickLinks
                candidateName={this.props.candidateName}
                candidateID={this.props.candidateId}
                interviewGuideLink={roundData.rounds[this.props.round].interviewGuide}
              />
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
              {sections && (
                <Form className="mb-5">
                  {sections.map(section => (
                    <InterviewSectionModular
                      title={section.title}
                      description={section.description}
                      prompt={section.prompt}
                      dropdownPrompt={section.dropdownPrompt}
                      type={section.type}
                      scoreOptions={section.scoreOptions}
                      textOptions={section.textOptions}
                      notesPrompt={section.notesPrompt}
                      response={section.response}
                    />
                  ))}
                  <GeneralNotesInput
                    generalNotes={this.state.generalNotes}
                    handleChange={this.handleChange}
                  />
                  <Button
                    disabled={this.state.generalNotes === ''}
                    color="primary"
                    onClick={this.handleSubmitClick}
                  >
                    Submit
                  </Button>
                </Form>
              )}
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
