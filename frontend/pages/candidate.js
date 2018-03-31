import { Component } from 'react'
import { getCandidateById } from '../utils'
import Head from '../components/head'

class CandidatesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: { }
    }
  }
  static async getInitialProps ({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getCandidateById(query.id)
      return { result }
    } catch (err) {
      console.log('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }
  render () {
    if (!this.props.result) {
      return (<div>User doesn't exist</div>)
    }
    const candidate = this.props.result
    return (
      <div className='container'>
        <Head title='Candidate' />
        <div>
          <h2>{this.props.result.name}</h2>
          <a style={{textDecoration: candidate.resumeID ? null : 'line-through'}} href={`http://localhost:8080/files/${candidate.resumeID}`}>Resume</a>
          <a style={{textDecoration: candidate.website ? null : 'line-through'}} href={candidate.website}>Website</a>
          <a style={{textDecoration: candidate.linkedIn ? null : 'line-through'}} href={candidate.linkedIn}>LinkedIn</a>
          <a style={{textDecoration: candidate.github ? null : 'line-through'}} href={candidate.github}>Github</a>
        </div>
        <p>Major: {candidate.major}</p>
        <p>Graduation Date: {candidate.graduationDate}</p>
        <p>Minor: {candidate.minor}</p>
        
        <p>Applied Role: {candidate.role}</p>
        <p>Role Reason: {candidate.roleReason}</p>
        <p>Reason for joining: {candidate.joinReason}</p>
        <p>Time Commitment: {candidate.timeCanDevote}</p>
        <p>Time Commitment List: {candidate.timeCommitment}</p>
        <p>Tech Experience: {candidate.techExperience}</p>
        <p>How They know us: {candidate.howTheyKnowUs}</p>
        <p>Additional Comments: {candidate.additionalComments}</p>
        <button className='btn btn-primary'>Add Interview</button>
      </div>
    )
  }
}

export default CandidatesPage
