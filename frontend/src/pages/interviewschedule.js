import { Container, Button, Table, Row } from 'reactstrap'
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import {
  getInterviewSchedule,
  addCandidateSchedules,
  addInterviewerSchedules,
  generateSchedules,
  deleteAllSchedules,
} from '../utils/api'
import Nav from '../components/nav'
import Head from '../components/head'
import { Alert } from 'reactstrap'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mapStateToProps = state => ({})

class InterviewSchedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      interviews: this.props.interviews,
      interviewCards: this.props.interviewCards,
      apiResponses: [],
      clickedDeleteOnce: false,
    }
  }

  getAlerts = () => {
    return this.state.apiResponses.map(elem => {
      return (
        <Alert color={elem.code === 200 ? 'success' : 'danger'} key={elem.title}>
          <h4 className="alert-heading">{elem.title}</h4>
          {elem.message}
        </Alert>
      )
    })
  }

  pushAPIResponse = (obj, title) => {
    obj.title = title
    this.setState(prevState => ({
      apiResponses: [...prevState.apiResponses, obj],
    }))
  }
  uploadSchedule = async e => {
    e.preventDefault()
    this.setState({ isLoading: true, apiResponses: [] })
    const candidateResp = await addCandidateSchedules(this.candidateInput.files[0])
    this.pushAPIResponse(candidateResp, 'Candidate Submission')
    const interviewerResp = await addInterviewerSchedules(this.interviewerInput.files[0])
    this.pushAPIResponse(interviewerResp, 'Interviewer Submission')
    const generationResp = await generateSchedules()
    this.pushAPIResponse(generationResp, 'Generate Schedule')
    this.setState({ isLoading: false })
    this.populateInterviewSchedules()
  }

  deleteScheduleHandler = async e => {
    e.preventDefault()
    if (!this.state.clickedDeleteOnce) {
      // if it hasn't already been clicked, don't yet delete and prompt with warning
      this.setState({ clickedDeleteOnce: true })
      setTimeout(() => this.setState({ clickedDeleteOnce: false }), 4000)
      return
    }
    const deleteResp = await deleteAllSchedules()
    this.pushAPIResponse(deleteResp, 'Delete Schedule Request')
    this.populateInterviewSchedules()
    this.setState({ clickedDeleteOnce: false })
  }

  getInterviewCard = interview => {
    if (interview === undefined) {
      return null
    }
    //return populated interview card
    return (
      <Link href="/interview">
        <div className="interview-card future-interview">
          <p>
            <b>Time:</b> {interview.time}
          </p>
          <p>
            <b>Room:</b> {interview.room}
          </p>
          <p>
            <b>Interviewers:</b> {interview.interviewers.join(', ')}
          </p>
          <p>
            <b>Candidates:</b> {interview.candidates.join(', ')}
          </p>
        </div>
      </Link>
    )
  }

  getAllInterviewCards = interviews => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var d = new Date()

    var jsx = []

    //sort interviews by date
    interviews = interviews.sort((a, b) => {
      var adatetime = a.date + ' ' + a.time
      var bdatetime = b.date + ' ' + b.time
      return this.compareDates(adatetime, bdatetime)
    })

    var cd = new Date() //current date we're operating on, for day grouping
    cd.setHours(0, 0, 0, 0)
    cd.setFullYear(0, 0, 0)
    interviews.forEach(i => {
      if (d > new Date(i.date + ' ' + i.time)) {
        return
      }
      if (cd.getDate() !== new Date(i.date).getDate()) {
        cd = new Date(i.date)
        cd.setHours(0, 0, 0, 0)
        jsx.push(<br />)
        jsx.push(
          <h4 className="pt-5" style={{ clear: 'both' }}>
            {days[cd.getDay()] + ', ' + i.date}
          </h4>
        )
      }
      jsx.push(this.getInterviewCard(i))
    })
    return jsx
  }

  compareDates = (a, b) => {
    //Given two datetime strings, compare them
    var adate = new Date(a)
    var bdate = new Date(b)
    if (adate < bdate) {
      return -1
    } else if (adate > bdate) {
      return 1
    } else {
      return 0
    }
  }

  populateInterviewSchedules = async () => {
    const res = await getInterviewSchedule()
    if (res.code !== 200) {
      // only populate if the GET is not successful
      this.pushAPIResponse(res, 'Get Schedule Response')
    }
    var interviewList = res.result.interviews
    this.setState({
      interviews: interviewList === undefined ? [] : interviewList,
      interviewCards: interviewList === undefined ? [] : this.getAllInterviewCards(interviewList),
    })
  }

  async componentDidMount() {
    this.populateInterviewSchedules()
  }

  render() {
    return (
      <>
        <Head title="Interview Schedule" />
        <Nav />
        <Container style={{ overflow: 'hidden' }}>
          {this.getAlerts()}
          <h1>Upcoming Interviews</h1>
          {this.state.interviewCards}
        </Container>
        <hr />
        <Container>
          <form onSubmit={this.uploadSchedule}>
            <>
              <h2>Upload a New Schedule</h2>
              <h4>Candidates</h4>
              <input
                ref={ref => {
                  this.candidateInput = ref
                }}
                onChange={_ => this.setState({ candidateFileSelected: true })}
                type="file"
                accept=".xls,.xlsx"
              />
            </>
            <>
              <h4>Interviewers</h4>
              <input
                ref={ref => {
                  this.interviewerInput = ref
                }}
                onChange={_ => this.setState({ interviewerFileSelected: true })}
                type="file"
                accept=".xls,.xlsx"
              />
            </>
            <br />
            <Button
              type="submit"
              disabled={
                this.state.isLoading ||
                !this.state.interviewerFileSelected ||
                !this.state.candidateFileSelected
              }
            >
              Parse Schedule
              {this.state.isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
            </Button>
            <Button
              color="danger"
              onClick={this.deleteScheduleHandler}
              disabled={this.state.isLoading}
            >
              {this.state.clickedDeleteOnce ? 'Are you sure?' : 'Delete Schedule'}
            </Button>
          </form>
          <br />
        </Container>
      </>
    )
  }
}

export default connect()(InterviewSchedule)
