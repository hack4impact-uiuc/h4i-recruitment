import { Component } from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllCandidates, getCandidateMatch, setMatchWinner } from '../utils/api'
import Candidate from '../components/candidateBox'

class FaceMash extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: this.props.result,
      error: false
    }
  }
  static async getInitialProps ({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getCandidateMatch()
      if (result === undefined) {
        return { error: 'Bad Request' }
      }
      return { result }
    } catch (err) {
      console.log('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }
  handleClick = async (e) => {
    const winner = e.target.name
    try { 
      const res = await setMatchWinner(this.state.candidates[0].id, this.state.candidates[1].id,this.state.candidates[winner].id,)
    }
    catch (err) {

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
              <Candidate candidate={this.state.result[0]}/>
              <button name="0" className="btn btn-info" onClick={this.handleClick}>Pick</button>
            </div>
            <div className="col-md-6">
              <Candidate candidate={this.state.result[1]}/>
              <button name="1" className="btn btn-info" onClick={this.handleClick}>Pick</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FaceMash
