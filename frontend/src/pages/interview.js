import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'
import Link from 'next/link'
import { addInterview } from '../utils/api'

import React from 'react'
import configureStore from './../store/appStore'
import { bindActionCreators } from 'redux'
import { fetchCandidates, addFilter, removeFilter } from '../actions'
import { yearsEnum, statusEnum, rolesEnum } from '../utils/enums'
import CandidateDropdown from '../components/candidateDropdown'
import { connect } from 'react-redux'

type Props = {
  candidates: Array<any>,
  loading: boolean,
  error: boolean,
  filters: Object,
  sort: Object
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
  candidateId: state.Interview.candidateId,
  candidateName: state.Interview.candidateName
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

  handleSubmit = e => {
    console.log('Adding Interview....')
    addInterview(
      localStorage.getItem('interviewerKey'),
      this.state.candidateId,
      this.state.candidateName,
      this.state.overallScore,
      this.state.generalNotes,
      this.state.sections
    )
    alert('Successfully added interview')
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
      return <div>Bad Fetch. Try again</div>
    }
    const statusFilter = filters.statuses
    const roleFilter = filters.roles
    const yearFilter = filters.years
    const gradFilter = filters.gradDates
    candidates = candidates.filter(candidate => {
      return statusFilter.includes(candidate.status)
    })
    return (
      <Container>
        <Form>
          <CandidateDropdown candidates={candidates} />
          <FormGroup>
            <legend>Time Commitment (7 points)</legend>
            -1 for each:
            <ul>
              <li>Exec member for another org Consulting Club such as IBC</li>
              <li>
                OTCR Some other club that requires time that I can’t think of (ex: Enactus
                Fraternity Pledge during the same semester)
              </li>
              <li>Hard/Time-consuming classes</li>
            </ul>
            -2 for each:
            <ul>
              <li>
                Hard course-load (still take one point off for each hard class they have as
                described above){' '}
              </li>
              <li>Too many org obligations</li>
            </ul>
            <Label>Give them a score out of 7:</Label>
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
            <Label>Explain Why you gave them those points:</Label>
            <Input
              value={
                this.state.sections.filter(section => section.section_name === 'Time Commitment')[0]
                  .section_notes
              }
              onChange={this.handleTextChange}
              type="textarea"
              name="Time Commitment"
              id="time-commitment-explanation"
            />
          </FormGroup>
          <FormGroup>
            <legend>Initiative and Passion (5 points)</legend>
            <FormGroup check>
              <Label>
                <Input
                  type="radio"
                  value="0"
                  onClick={this.onSelect}
                  name="Initiative and Passion"
                />{' '}
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
                />{' '}
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
                />{' '}
                2 - Really into it, thinking about ways they could contribute to the org
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Community (5 points)</legend>
            <Label>Give them score out of 5:</Label>
            <Input
              value={
                this.state.sections.filter(section => section.section_name === 'Community')[0].score
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
              Will they contribute to community or are they just using this as a resume booster?
              Explain your reasoning for your score.{' '}
            </Label>
            <Input
              type="text"
              name="Community"
              value={
                this.state.sections.filter(section => section.section_name === 'Community')[0]
                  .section_notes
              }
              onChange={this.handleTextChange}
              placeholder="Your Answer"
            />
          </FormGroup>
          <FormGroup>
            <legend>Resume and Tech Knowledge (3 Points)</legend>
            <FormGroup check>
              <Label>
                <Input
                  type="radio"
                  value="0"
                  onClick={this.onSelect}
                  name="Resume And Tech Knowledge"
                />{' '}
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
                />{' '}
                1 - 1 to 2 projects
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input
                  type="radio"
                  value="2"
                  onClick={this.onSelect}
                  name="Resume And Tech Knowledge"
                />{' '}
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
                />{' '}
                3 - Multiple
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Knowledge of Web Dev or Data (2 points)</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" value="0" onClick={this.onSelect} name="Knowledge of Web Dev" />{' '}
                0 - No experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="1" onClick={this.onSelect} name="Knowledge of Web Dev" />{' '}
                1 - Some experience with it
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="2" onClick={this.onSelect} name="Knowledge of Web Dev" />{' '}
                2 - Has done a couple projects, knows what flask is. etc.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="3" onClick={this.onSelect} name="Knowledge of Web Dev" />{' '}
                3 - Knows more than you - if they are a you think they could be a tech lead
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>Technical Challenge (5 points)</legend>
            <FormGroup check>
              <Label>
                <Input type="radio" value="0" onClick={this.onSelect} name="Technical Challenge" />{' '}
                0 - No experience
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="1" onClick={this.onSelect} name="Technical Challenge" />{' '}
                1 - Completed but with a lot of help/slow
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="2" onClick={this.onSelect} name="Technical Challenge" />{' '}
                2 - Completed in a reasonable amount of time
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" value="3" onClick={this.onSelect} name="Technical Challenge" />{' '}
                3 - Damn they are good
              </Label>
            </FormGroup>
          </FormGroup>
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
