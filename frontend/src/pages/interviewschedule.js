import { Container, Button, Table, Row } from 'reactstrap'
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { getInterviewSchedule, addInterviewSchedule } from '../utils/api'
import Nav from '../components/nav'
import Head from '../components/head'

const mapStateToProps = state => ({})

class InterviewSchedule extends Component {
  constructor(props) {
    super(props)
    this.uploadSchedule = this.uploadSchedule.bind(this)

    this.state = {
      interviews: this.props.interviews,
      interviewCards: this.props.interviewCards
    }
  }

  uploadSchedule(e) {
    e.preventDefault()

    addInterviewSchedule(this.uploadInput.files[0])
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

  async componentDidMount() {
    const res = await getInterviewSchedule()
    var interviewList = res.result.interviews
    this.setState({
      interviews: interviewList === undefined ? [] : interviewList,
      interviewCards: interviewList === undefined ? [] : this.getAllInterviewCards(interviewList)
    })
  }

  render() {
    return (
      <>
        <Head title="Interview Schedule" />
        <Nav />
        <Container style={{ overflow: 'hidden' }}>
          <h1>Upcoming Interviews</h1>
          {this.state.interviewCards}
        </Container>
        <hr />
        <Container>
          <form onSubmit={this.uploadSchedule}>
            <>
              <h2>Upload a New Schedule</h2>
              <input
                ref={ref => {
                  this.uploadInput = ref
                }}
                type="file"
              />
            </>
            <Button type="submit">Parse Schedule</Button>
          </form>
          <br />
        </Container>
      </>
    )
  }
}

export default connect()(InterviewSchedule)
