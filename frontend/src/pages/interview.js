import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap'
import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import { fetchCandidates, addFilter, removeFilter } from '../actions'
import CandidateDropdown from '../components/candidateDropdown'
import InterviewCategory from '../components/interviewCategory'
import ErrorMessage from '../components/errorMessage'
import { getKey, addInterview } from '../utils/api'
import InterviewCard from '../components/interviewCard'

type Props = {
  candidates: Array<any>,
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
      fetchCandidates,
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
      candidates: this.props.candidates,
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
      ]
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

  handleSubmit = async e => {
    e.preventDefault()
    console.log('Adding Interview....')
    const overallScore = this.state.sections.reduce((accumulator, section) => {
      section.questions[0].score + accumulator
    })
    if (this.props.candidateName === '' || this.props.candidateId === '') {
      const msg = 'Interview does not have a Candidate. Please put down a candidate.'
      console.log(msg)
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
  componentDidMount() {
    if (this.props.candidates.length == 0) {
      this.props.fetchCandidates(
        this.props.filters.statuses,
        this.props.filters.years,
        this.props.filters.gradDates,
        this.props.filters.sortBy,
        this.props.filters.roles,
        this.props.filters.selectBy
      )
    }
  }

  query = () => {
    if (this.props.candidates.length == 0) {
      this.props.fetchCandidates(
        this.props.filters.statuses,
        this.props.filters.years,
        this.props.filters.gradDates,
        this.props.filters.sortBy,
        this.props.filters.roles,
        this.props.filters.selectBy
      )
    }
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

  render() {
    let { candidates, error, loading, filters, sort } = this.props
    if (error) {
      console.error(error)
      return (
        <ErrorMessage code="404" message={`Bad Fetch with ${error}. Check if you are logged in.`} />
      )
    }
    const statusFilter = filters.statuses
    candidates = candidates.filter(candidate => {
      return statusFilter.includes(candidate.status)
    })
    return (
      <Container>
        <Row>
          <Col md="2">
            <h3>Interviewing</h3>
          </Col>
          <Col md="5">
            <CandidateDropdown candidates={candidates} />
          </Col>
        </Row>
        {this.props.candidateName !== '' && this.props.candidateID !== '' ? (
          <Link href={{ pathname: '/candidate', query: { id: this.props.candidateId } }}>
            <a>
              Candidate&#39;s Page (OPEN A NEW TAB. YOU WILL LOSE YOUR FILLED OUT FORMS IF YOU CLICK
              ON IT.)
            </a>
          </Link>
        ) : null}
        <Form>
          <InterviewCard title="Time Commitment (7 points)">
            -1 for each:
            <ul>
              <li>Exec member for another org Consulting Club such as IBC, OTCR</li>
              <li>
                Some other club that requires time that I can’t think of (ex: Enactus Fraternity
                Pledge during the same semester)
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
            <Label>
              <b>Give them a score out of 7:</b>
            </Label>
            <Input
              value={
                this.state.sections.filter(section => section.section_name === 'Time Commitment')[0]
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
            <Label>
              <b>Explain Why you gave them those points:</b>
            </Label>
            <Input
              style={{ height: '130px' }}
              value={
                this.state.sections.filter(section => section.section_name === 'Time Commitment')[0]
                  .section_notes
              }
              onChange={this.handleTextChange}
              type="textarea"
              name="Time Commitment"
              id="time-commitment-explanation"
              placeholder="Explain as much as possible. It'll help during deliberations!"
            />
          </InterviewCard>
          <InterviewCard title="Initiative and Passion (5 points)">
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
                sentences about Hack4Impact and applied and that's it.
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
                5 - Goes above and beyond and gives you a new idea on how you can contribute to the
                org
              </Label>
            </FormGroup>
          </InterviewCard>
          <InterviewCard title="Community (5 points)">
            <FormGroup>
              <Label>
                <b>Give them score out of 5:</b>
              </Label>
              <Input
                value={
                  this.state.sections.filter(section => section.section_name === 'Community')[0]
                    .score
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
                  Will they contribute to community or are they just using this as a resume booster?
                  Explain your reasoning for your score.
                </b>
              </Label>
              <Input
                style={{ height: '130px' }}
                type="textarea"
                name="Community"
                value={
                  this.state.sections.filter(section => section.section_name === 'Community')[0]
                    .section_notes
                }
                onChange={this.handleTextChange}
                placeholder="Please explain in as much as possible. It'll help a lot during deliberations!"
              />
            </FormGroup>
          </InterviewCard>
          <InterviewCard title="Resume and Tech Knowledge (3 Points)">
            <FormGroup>
              <FormGroup check>
                <Label>
                  <Input
                    type="radio"
                    value="0"
                    onClick={this.onSelect}
                    name="Resume And Tech Knowledge"
                  />
                  0 - No Experience
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
                  1 - has worked on 1 to 2 projects
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
                  2 - Has internship or a couple substantial projects
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
                  3 - Multiple
                </Label>
              </FormGroup>
            </FormGroup>
          </InterviewCard>
          <InterviewCard title="Knowledge of Web Dev or Data (2 points)">
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
          </InterviewCard>
          <InterviewCard title="Technical Challenge (5 points)">
            <FormGroup>
              <FormGroup check>
                <Label>
                  <Input
                    type="radio"
                    value="0"
                    onClick={this.onSelect}
                    name="Technical Challenge"
                  />
                  0 - couldn’t complete
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
                  5 - damn [enter pronoun]’s good
                </Label>
              </FormGroup>
            </FormGroup>
          </InterviewCard>

          <InterviewCard title="Category">
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
          </InterviewCard>
          <InterviewCard title="General Notes">
            <Label>
              <b>Any other notes that the rubrik didn't cover or emphasis you'd like to make?</b>
            </Label>
            <Input
              style={{ height: '150px' }}
              type="textarea"
              name="generalNotes"
              value={this.state.generalNotes}
              onChange={this.handleChange}
              placeholder="Please put as many notes as possible! It'll help a lot during deliberations."
            />
          </InterviewCard>
          <FormGroup>
            <Link prefetch href="/interviewportal">
              <Button color="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}
// export default Interview
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interview)
