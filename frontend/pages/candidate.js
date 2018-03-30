import { Component } from 'react'
import { getCandidateById } from '../utils/api'
import Head from '../components/head'
import Nav from '../components/nav'
import Candidate from '../components/candidateBox'

class CandidatePage extends Component {
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
      console.log('cad', this.props.result)
      return (<div>User doesn't exist</div>)
    }
    const candidate = this.props.result
    return (
      <div className='container'>
        <Head title='Candidate' />
        <Nav/>
        <Candidate candidate={candidate}/>
        <button className='btn btn-primary'>Add Interview</button>
      </div>
    )
  }
}

export default CandidatePage
