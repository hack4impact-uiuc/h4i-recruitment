// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { generateMatchData } from './../actions'
import { getCandidateMatch, setMatchWinner } from '../utils/api'
import Candidate from '../components/candidateBox'

type Props = {
  candidates: Array<any>,
  matchID: string,
  error: boolean
}

const mapStateToProps = state => ({
  candidates: state.facemash.candidates,
  matchID: state.facemash.matchID
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
    if (candidates == undefined || candidates.length != 2) {
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
      console.error('Error', err)
    }
  }

  render() {
    if (this.props.error) {
      return <Error>Bad Fetch. Try again</Error>
    }
    const { candidates } = this.props
    return candidates && candidates.length == 2 ? (
      <div>
        <Container>
          <div className="mt-5" style={{ color: '#7f8e9e' }}>
            <h4>Decide impartially on who you think would be more successful at Hack4Impact.</h4>
            <p>
              Although we need as many matches made as possible, please still take the time to look
              and think critically when making your choice. Each decision you make will affect each
              candidate&#39;s ability to move on to the interview rounds.
            </p>
          </div>
          <p>{this.state.message}</p>
          <Row>
            <Col md="6">
              <Candidate candidate={candidates[0]} hideStatus={true} />
              <button name="0" className="btn btn-info" onClick={this.handleClick}>
                Pick
              </button>
            </Col>
            <Col md="6">
              <Candidate candidate={candidates[1]} hideStatus={true} />
              <button name="1" className="btn btn-info" onClick={this.handleClick}>
                Pick
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <h4>Error: Couldn&#39;t get new FaceMash match. Please refresh page.</h4>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceMash)
