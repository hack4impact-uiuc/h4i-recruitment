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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import { fetchAllCandidates, addFilter, removeFilter } from '../actions'
import CandidateDropdown from '../components/candidateDropdown'
import InterviewCategory from '../components/interviewCategory'
import ErrorMessage from '../components/errorMessage'
import { getKey, addInterview, getCandidates } from '../utils/api'
import InterviewSectionCard from '../components/interviewSectionCard'
import FacemashProfile from '../components/facemashProfile'
type Props = {
  loading: boolean,
  error: boolean,
  filters: Object,
  sort: Object,
  candidateId: String,
  candidateName: String
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAllCandidates,
      addFilter,
      removeFilter
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
  candidateName: state.interview.candidateName
})

class Interview extends Component<Props> {
  constructor(props, context) {
    super(props)
    this.state = {
      candidates: [],
      error: this.props.error,
      loading: this.props.loading,
      filters: this.props.filters,
      sort: this.props.sort,
      candidateId: '',
      candidateName: '',
      overallScore: 0,
      generalNotes: '',
      categoryNotes: '',
      category: '',
      sections: [
        {
          section_name: 'Time Commitment',
          questions: [
            {
              question_text: 'Time Commitment',
              score: 0
            }
          ],
          section_notes: ''
        },
        {
          section_name: 'Initiative and Passion',
          questions: [
            {
              question_text: 'Initiative and Passion',
              score: 0
            }
          ],
          section_notes: ''
        },
        {
          section_name: 'Community',
          questions: [
            {
              question_text: 'Community',
              score: 0
            }
          ],
          section_notes: ''
        },
        {
          section_name: 'Resume And Tech Knowledge',
          questions: [
            {
              question_text: 'Resume And Tech Knowledge',
              score: 0
            }
          ],
          section_notes: ''
        },
        {
          section_name: 'Knowledge of Web Dev',
          questions: [
            {
              question_text: 'Knowledge of Web Dev',
              score: 0
            }
          ],
          section_notes: ''
        },
        {
          section_name: 'Technical Challenge',
          questions: [
            {
              question_text: 'Technical Challenge',
              score: 0
            }
          ],
          section_notes: ''
        }
      ],
      verificationModalOpen: false
    }
  }

  handleTextChange = e => {
    let newSections = this.state.sections
    const currSection = newSections.filter(section => section.section_name === e.target.name)[0]
    currSection.section_notes = e.target.value
    this.setState({ sections: newSections })
  }

  chooseCategory = e => {
    console.log(e)
    this.setState({
      category: e
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmitClick = e => {
    e.preventDefault()
    this.setState({
      verificationModalOpen: true
    })
  }
  submit = async e => {
    console.log('Adding Interview....')
    let overallScore = 0
    const sections = this.state.sections
    for (let idx in sections) {
      overallScore += sections[idx].questions[0].score
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
        this.state.categoryNotes,
        this.state.category,
        this.state.sections
      )
      console.log('Interview response', res)
      alert('Successfully added interview')
      Router.push({ pathname: '/candidate', query: { id: this.props.candidateId } })
    }
  }
  async componentDidMount() {
    const res = await getCandidates()
    this.setState({
      candidates: res.result
    })
  }

  onSelect = e => {
    let newSections = this.state.sections
    const currSection = newSections.filter(section => section.section_name === e.target.name)[0]
    const currQuestion = currSection.questions.filter(
      question => question.question_text === e.target.name
    )[0]
    currQuestion.score = parseInt(e.target.value)
    this.setState({
      sections: newSections
    })
  }
  toggle = () => {
    this.setState({
      verificationModalOpen: !this.state.verificationModalOpen
    })
  }

  render() {
    let { error, loading, filters, sort } = this.props
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
      <Container fluid>
        <Row>
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
        <Row>
          <Modal isOpen={this.state.verificationModalOpen}>
            <ModalHeader>
              Are you sure you want to submit? Have you filled out everything?
            </ModalHeader>
            <ModalBody>There&#39;s no turning back... Everything is immutable :)</ModalBody>
            <ModalFooter>
              <Button onClick={this.toggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.submit} color="primary">
                Submit
              </Button>
            </ModalFooter>
          </Modal>
        </Row>
        <Row>
          <Col md="6">
            <Form>
              <InterviewSectionCard title="Time Commitment (7 points)">
                -1 for each:
                <ul>
                  <li>Exec member for another org Consulting Club such as IBC, OTCR</li>
                  <li>
                    Some other club that requires time that I can&#39;t think of (ex: Enactus
                    Fraternity Pledge during the same semester)
                  </li>
                  <li>Hard/Time-consuming classes</li>
                </ul>
                -2 for each:
                <ul>
                  <li>
                    Hard course-load (still take one point off for each hard class they have as
                    described above)
                  </li>
                  <li>Too many org obligations</li>
                </ul>
                <FormGroup>
                  <Label>
                    <b>Give them a score out of 7:</b>
                  </Label>
                  <Input
                    value={
                      sections.filter(section => section.section_name === 'Time Commitment')[0]
                        .score
                    }
                    onChange={this.onSelect}
                    type="select"
                    name="Time Commitment"
                    id="time-commitment-input"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </Input>
                </FormGroup>
                <Label>
                  <b>Explain Why you gave them those points:</b>
                </Label>
                <Input
                  style={{ height: '130px' }}
                  value={
                    sections.filter(section => section.section_name === 'Time Commitment')[0]
                      .section_notes
                  }
                  onChange={this.handleTextChange}
                  type="textarea"
                  name="Time Commitment"
                  id="time-commitment-explanation"
                  placeholder="Explain as much as possible. It'll help during deliberations!"
                />
              </InterviewSectionCard>
              <InterviewSectionCard title="Initiative and Passion (5 points)">
                <FormGroup check>
                  <Label>
                    <Input
                      type="radio"
                      value="0"
                      onClick={this.onSelect}
                      name="Initiative and Passion"
                    />
                    0 - Definitely using this as a resume booster
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label>
                    <Input
                      type="radio"
                      value="1"
                      onClick={this.onSelect}
                      name="Initiative and Passion"
                    />
                    1 - Had a general idea of what hack4impact was. They probably only read a couple
                    sentences about Hack4Impact and applied and that&#39;s it.
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label>
                    <Input
                      type="radio"
                      value="2"
                      onClick={this.onSelect}
                      name="Initiative and Passion"
                    />
                    2 - Really into it, thinking about ways they could contribute to the org
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label>
                    <Input
                      type="radio"
                      value="3"
                      onClick={this.onSelect}
                      name="Initiative and Passion"
                    />
                    3 - Thinking about how they fit into Hack4Impact plans
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label>
                    <Input
                      type="radio"
                      value="5"
                      onClick={this.onSelect}
                      name="Initiative and Passion"
                    />
                    5 - Goes above and beyond and gives you a new idea on how you can contribute to
                    the org
                  </Label>
                </FormGroup>
              </InterviewSectionCard>
              <InterviewSectionCard title="Community (5 points)">
                <p>Gauging Community is really hard. Fill this out in the end.</p>
                Identifying those who embody Intentionality, Curiosity, and Empathy... Subtract the
                points from 7.
                <hr />
                Asking Questions at the end
                <ul>
                  <li>
                    <b>-2 points:</b> Didn&#39;t ask you any questions at end
                  </li>
                  <li>
                    <b>-1 point:</b> Asked you some BS questions. Beyond just logistical questions
                  </li>
                  <li>
                    Asked you solid questions and about what we do, what you do, your
                    recommendation, etc: Great!
                  </li>
                </ul>
                Technical Interview Portion
                <ul>
                  <li>
                    <b>-1 point:</b> Didn&#39;t communicate with you at all during technical
                    interview
                  </li>
                  <li>Let you know what and why they chose to do things: Great!</li>
                </ul>
                Subjective:
                <ul>
                  <li>
                    <b>No: -2 Meh: -1. Hell ya: 0</b> Are they someone you&#39;d enjoy working with?
                  </li>
                </ul>
                <FormGroup>
                  <Label>
                    <b>Give them score out of 5:</b>
                  </Label>
                  <Input
                    value={
                      sections.filter(section => section.section_name === 'Community')[0].score
                    }
                    onChange={this.onSelect}
                    type="select"
                    name="Community"
                    id="community-input"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                  <Label>
                    <b>
                      Will they contribute to community or are they just using this as a resume
                      booster? Explain your reasoning for your score.
                    </b>
                  </Label>
                  <Input
                    style={{ height: '130px' }}
                    type="textarea"
                    name="Community"
                    value={
                      sections.filter(section => section.section_name === 'Community')[0]
                        .section_notes
                    }
                    onChange={this.handleTextChange}
                    placeholder="Please explain in as much as possible. It'll help a lot during deliberations!"
                  />
                </FormGroup>
              </InterviewSectionCard>
              <InterviewSectionCard title="Resume and Tech Knowledge (3 Points)">
                Do they have projects? Internships? Do they actually know what they are talking
                about? Do they understand the underlying technologies they&#39;ve used?
                <hr />
                If you detect they were kind of bullshitting: <b>-1 overall</b>
                <FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="0"
                        onClick={this.onSelect}
                        name="Resume And Tech Knowledge"
                      />
                      0 - No experience, or completely BS their experience
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="1"
                        onClick={this.onSelect}
                        name="Resume And Tech Knowledge"
                      />
                      1 - can speak about one or two projects, or a meh internship. Doesn't really
                      have an in-depth understanding of what they've used.
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="2"
                        onClick={this.onSelect}
                        name="Resume And Tech Knowledge"
                      />
                      2 - can speak to one internship with great experience or multiple projects
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="3"
                        onClick={this.onSelect}
                        name="Resume And Tech Knowledge"
                      />
                      3 - Multiple.
                    </Label>
                  </FormGroup>
                </FormGroup>
              </InterviewSectionCard>
              <InterviewSectionCard title="Knowledge of Web Dev or Data (2 points)">
                <FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="0"
                        onClick={this.onSelect}
                        name="Knowledge of Web Dev"
                      />
                      0 - No experience
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="1"
                        onClick={this.onSelect}
                        name="Knowledge of Web Dev"
                      />
                      1 - Some experience with it, has done a couple projects, knows what flask is,
                      experience with ltk, data visualizations. etc.
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="2"
                        onClick={this.onSelect}
                        name="Knowledge of Web Dev"
                      />
                      2 - Knows more than you - if they are a you think they could be a tech lead
                    </Label>
                  </FormGroup>
                </FormGroup>
              </InterviewSectionCard>
              <InterviewSectionCard title="Technical Challenge (5 points)">
                <FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="0"
                        onClick={this.onSelect}
                        name="Technical Challenge"
                      />
                      0 - couldn&#39;t complete
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="1"
                        onClick={this.onSelect}
                        name="Technical Challenge"
                      />
                      1 - completed but with a lot of help/slow
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="2"
                        onClick={this.onSelect}
                        name="Technical Challenge"
                      />
                      2 - completed in a reasonable amount of time with help
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="3"
                        onClick={this.onSelect}
                        name="Technical Challenge"
                      />
                      3 - completed in a reasonable amount of time with minimal help
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="4"
                        onClick={this.onSelect}
                        name="Technical Challenge"
                      />
                      4 - completed in reasonable amount of time with no help
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label>
                      <Input
                        type="radio"
                        value="5"
                        onClick={this.onSelect}
                        name="Technical Challenge"
                      />
                      5 - damn [enter pronoun]&#39;s good
                    </Label>
                  </FormGroup>
                </FormGroup>
              </InterviewSectionCard>

              <InterviewSectionCard title="Category">
                This will be used in addition to the overall score you gave your interviewee.
                <FormGroup>
                  <InterviewCategory chooseCategory={this.chooseCategory} />
                  <Input
                    style={{ marginTop: '15px', height: '100px' }}
                    type="textarea"
                    name="categoryNotes"
                    value={this.state.categoryNotes}
                    onChange={this.handleChange}
                    placeholder="Explain here why you've categorized the applicant like this."
                  />
                </FormGroup>
              </InterviewSectionCard>
              <InterviewSectionCard title="General Notes">
                <Label>
                  <b>
                    Any other notes that the rubrik didn&#39;t cover or emphasis you&#39;d like to
                    make? Any general thoughts about this Candidate?
                  </b>
                </Label>
                <Input
                  style={{ height: '150px' }}
                  type="textarea"
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
          <Col md="6">
            {/* {candidate != undefined ? (
              <FacemashProfile showFacemash={true} candidate={candidate} />
            ) : (
              <h4 className="text-center align-middle">
                Pick a User to interview and their profile will show up here
              </h4>
            )} */}
            <iframe
              className="embed-doc embed-responsive-item"
              src="https://docs.google.com/a/illinois.edu/document/d/e/2PACX-1vRISnK6xFN-_10jJWyORT-xvp8KGPNSi0YOkHNvN8PlMaHc-U-DAjssfDe1T4SFHhUQpxyPCQk--nP2/pub?embedded=true"
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
// export default Interview
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interview)
