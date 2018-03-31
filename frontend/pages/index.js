import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import CandidateListComponent from '../components/candidateList'
import { getAllCandidates } from '../utils'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: []
    }
  }
  async componentDidMount () {
    try {
      const { result } = await getAllCandidates()

      this.setState({
        candidates: result
      })
    } catch (err) {
      console.log('Fetching Error: ', err)

      this.setState({
        error: true
      })
    }
  }
  render () {
    return (
      <div className='container-fluid' style={{padding: '0 30px 0 30px'}}>
        <Head title='Home' />
        <Nav />
        <h1>Hack4Impact Recruitment Portal</h1>
        <div className='hero'>
          <CandidateListComponent candidates={this.state.candidates} />
        </div>
      </div>
    )
  }
}

export default HomePage
