import { Component } from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllCandidates } from '../utils.api'
import Candidate from '../components/candidate'

class FaceMash extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: [],
      error: false
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
      <div>
        <Head title='FaceMash' />
        <Nav/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Candidate candidate={this.props.result[0]}/>
            </div>
            <div className="col-md-6">
              <Candidate candidate={this.props.result[1]}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FaceMash
