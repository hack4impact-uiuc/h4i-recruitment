import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates } from '../utils/api'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: []
    }
  }
  static async getInitialProps ({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getAllCandidates()
      if (result === undefined) {
        return { error: 'Bad Request' }
      }
      return { result }
    } catch (err) {
      console.log('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }
  render () {
    if (this.props.error) {
      return <div>Bad Fetch. Try again</div>
    }
    return (
      <div className='container-fluid' style={{padding: '0 30px 0 30px'}}>
        <Head title='Home' />
        <Nav />
        <h1>Hack4Impact Recruitment Portal</h1>
        <button className="btn btn-primary">Sort by</button>
        <div className='hero'>
          <CandidateListComponent candidates={this.props.result} />
        </div>
      </div>
    )
  }
}

export default HomePage
