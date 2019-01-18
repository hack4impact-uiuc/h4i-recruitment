import { Container, Button, Table, Row } from 'reactstrap'
import { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VerificationModal from '../components/verificationModal'
import ActionButton from '../components/actionButton'
import { getInterviewSchedule, addInterviewSchedule } from '../utils/api'

type Props = {}

const mapStateToProps = state => ({})

class InterviewSchedule extends Component<Props> {
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

  getInterviewCard = (interview) => {
    if(interview === undefined){
      return null;
    }
    //return populated interview card
    return (
      <div className="interview-card future-interview">
        <a>Time: {interview.time}</a><br/>
        <a>Room: {interview.room}</a><br/>
        <a>Interviewers: {interview.interviewers.join(', ')}</a><br/>
        <a>Candidates: {interview.candidates.join(', ')}</a><br/>
      </div>
    );
  }

  getAllInterviewCards = (interviews) => {
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var d = new Date()
    var currDate = d.getDate()
    var currMonth = d.getMonth()
    var currYear = d.getFullYear()
    var dstring = "" + (currMonth + 1) + "/" + currDate + "/" + currYear

    var jsx = []

    //sort interviews by date
    interviews = interviews.sort((a,b) => {
      var adatetime = a.date + " " + a.time
      var bdatetime = b.date + " " + b.time
      return this.compareDates(adatetime,bdatetime)
    })

    var cd = new Date() //current date we're operating on, for day grouping
    cd.setHours(0,0,0,0)
    interviews.forEach((i) => {
      if(d > new Date(i.date + " " + i.time)){ return; }
      var fd = i.date.split('/') //first date in list
      if(cd.getDate() !== (new Date(i.date)).getDate()){
        cd = new Date(i.date)
        cd.setHours(0,0,0,0)
        jsx.push(<br/>)
        jsx.push(<h4 style={{"clear":"both"}}>{days[cd.getDay()] + ", " + i.date}</h4>)
      }
      jsx.push(this.getInterviewCard(i))
    })
    return jsx;
  }

  compareDates = (a,b) => {
    var adate = new Date(a)
    var bdate = new Date(b)
    if (adate < bdate){
      return -1;
    } else if (adate > bdate) {
      return 1;
    } else {
      return 0;
    }
  }

  async componentDidMount(){
    const res = await getInterviewSchedule();
    var interviewList = res.result.interviews;
    console.log(interviewList)
    this.setState({
      interviews: interviewList === undefined ? [] : interviewList,
      interviewCards: interviewList === undefined ? [] : this.getAllInterviewCards(interviewList)
    });
  }


  render() {
    return (
      <div>
        <Container style={{"overflow":"hidden"}}>
          <h1>Upcoming Interviews</h1>
          {this.state.interviewCards}
        </Container>
        <hr/>
        <Container>
          <form onSubmit={this.uploadSchedule}>
            <div>
              <h2>Select CSV file to upload</h2>
              <input
                ref={ref => {
                  this.uploadInput = ref
                }}
                type="file"
              />
            </div>
            <button type="submit">Parse Schedule</button>
          </form>
        </Container>
      </div>
    )
  }
}

export default connect()(InterviewSchedule)
