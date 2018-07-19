// @flow
import { Component } from 'react'
import { generateMatchData } from './../actions'
import withRedux from 'next-redux-wrapper'
import configureStore from './../store/appStore'
import { bindActionCreators } from 'redux'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllCandidates, getCandidateMatch, setMatchWinner } from '../utils/api'
import Candidate from '../components/candidateBox'
import { Container } from 'reactstrap'
type Props = {
  candidates: Array<any>,
  matchID: string,
  error: boolean
}

const mapStateToProps = state => ({
  candidates: state.candidates,
  matchID: state.matchID
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      generateMatchData
    },
    dispatch
  )
}

class FaceMash extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      message: ''
    }
  }

  async getNewMatch() {
    const { result } = await getCandidateMatch()
    const { generateMatchData } = this.props
    if (result === undefined) {
      console.log('Could not get new FaceMash match')
      generateMatchData(null, null, null)
    } else {
      generateMatchData(result.candidate1, result.candidate2, result.matchID)
    }
  }

  componentDidMount() {
    const { candidates } = this.props
    if (candidates == null || candidates.length != 2) {
      this.getNewMatch()
    }
  }

  handleClick = async e => {
    const winner = e.target.name
    try {
      const { candidates, matchID } = this.props
      if (!candidates || candidates.length != 2 || !matchID) {
        console.error('Missing match information.')
        return
      }
      const res = await setMatchWinner(
        candidates[0]._id,
        candidates[1]._id,
        winner === '0' ? candidates[0]._id : candidates[1]._id,
        matchID
      )
      if (res.success) {
        this.setState({
          success: 'Successfully Submitted'
        })
      } else {
        console.error('Match not successfully submitted')
        window.alert('Match not successfully submitted')
      }
      this.getNewMatch()
    } catch (err) {
      console.error(('Error': err))
    }
  }

  render() {
    if (this.props.error) {
      return <div>Bad Fetch. Try again</div>
    }
    const { candidates } = this.props
    return candidates && candidates.length == 2 ? (
      <div>
        <Head title="FaceMash" />
        <Nav />
        <Container>
          <p>{this.state.message}</p>
          <div className="row">
            <div className="col-md-6">
              <Candidate candidate={candidates[0]} />
              <button name="0" className="btn btn-info" onClick={this.handleClick}>
                Pick
              </button>
            </div>
            <div className="col-md-6">
              <Candidate candidate={candidates[1]} />
              <button name="1" className="btn btn-info" onClick={this.handleClick}>
                Pick
              </button>
            </div>
          </div>
        </Container>
      </div>
    ) : (
      <h4>Error: Couldn&#39;t get new FaceMash match. Please refresh page.</h4>
    )
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(FaceMash)
