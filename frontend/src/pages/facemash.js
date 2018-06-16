import { Component } from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllCandidates, getCandidateMatch, setMatchWinner } from '../utils/api'
import Candidate from '../components/candidateBox'
import { Container } from 'reactstrap'

class FaceMash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: this.props.result,
      error: false,
      message: ''
    }
  }
  static async getInitialProps({ query }) {
    // check whether query.id is real candidate
    // TODO: do not fetch again, if user hasn't responded to previous match
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
  handleClick = async e => {
    const winner = e.target.name
    try {
      const { candidate1, candidate2, matchID } = this.state.results
      const res = await setMatchWinner(
        candidate1._id,
        candidate2._id,
        winner === '0' ? candidate1._id : candidate2._id,
        matchID
      )
      if (res.success) {
        this.setState({
          success: 'Successfully Submitted'
        })
      }
      // TODO: fetch for new match
    } catch (err) {
      console.err(('Error': err.message))
    }
  }
  render() {
    if (this.props.error) {
      return <div>Bad Fetch. Try again</div>
    }
    return (
      <div>
        <Head title="FaceMash" />
        <Nav />
        <Container>
          <p>{this.state.message}</p>
          <div className="row">
            <div className="col-md-6">
              <Candidate candidate={this.state.results.candidate1} />
              <button name="0" className="btn btn-info" onClick={this.handleClick}>
                Pick
              </button>
            </div>
            <div className="col-md-6">
              <Candidate candidate={this.state.results.candidate2} />
              <button name="1" className="btn btn-info" onClick={this.handleClick}>
                Pick
              </button>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default FaceMash
