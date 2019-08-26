// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import { bindActionCreators } from 'redux'
import ReactLoading from 'react-loading'
import { generateMatchData } from './../actions'
import { getCandidateMatch, setMatchWinner } from '../utils/api'
import Candidate from '../components/facemashProfile'
import { ErrorMessage } from '../components/common'
import Nav from '../components/nav'
import Head from '../components/head'

type Props = {
  candidates: Array<any>,
  matchID: string,
  error: boolean,
}

const mapStateToProps = state => ({
  candidates: state.facemash.candidates,
  matchID: state.facemash.matchID,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      generateMatchData,
    },
    dispatch
  )
}

class FaceMash extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      message: '',
      loading: false,
    }
  }

  async getNewMatch() {
    const { result } = await getCandidateMatch()
    const { generateMatchData } = this.props
    console.log('Getting new match')
    if (result === undefined) {
      console.log('Could not get new FaceMash match')
      generateMatchData(null, null, null)
    } else {
      generateMatchData(result.candidate1, result.candidate2, result.matchID)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.candidates !== this.props.candidates) {
      this.setState({ loading: false })
    }
  }
  componentDidMount() {
    const { candidates } = this.props
    if (
      candidates == undefined ||
      candidates.length != 2 ||
      candidates[0] == undefined ||
      candidates[1] == undefined
    ) {
      // if candidates are null, you need to manually change localStorage to get a new match
      // because you can't submit a match with candidates as null. this does it for you
      localStorage.removeItem('recruitment_tool_state')
      this.getNewMatch()
    }
  }
  handleClick = async e => {
    const winner = e.target.name
    try {
      this.setState({ loading: true })
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
          success: 'Successfully Submitted',
        })
      } else {
        console.error('Match not successfully submitted')
        window.alert('Match not successfully submitted. Are you logged in?')
      }
      this.getNewMatch()
    } catch (err) {
      console.error('Error', err)
    }
  }
  render() {
    if (this.props.error) {
      return <ErrorMessage message={`Bad Fetch: ${this.props.error}. Try again`} />
    }
    const { candidates } = this.props
    if (candidates == undefined || candidates[0] == undefined || candidates[1] == undefined) {
      return (
        <>
          <Nav />
          <ErrorMessage
            code="404"
            message="Match was not correctly retrieved. Check if you are logged in."
          />
        </>
      )
    }

    return candidates && candidates.length == 2 ? (
      <>
        <Head title="Facemash" />
        <Nav />
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
          {!this.state.loading ? (
            <Row>
              <Col md="6">
                <Candidate candidate={candidates[0]} hideStatus={true} />
                <Button
                  name="0"
                  size="lg"
                  className="btn btn-info margin-sm-top"
                  onClick={this.handleClick}
                  block
                >
                  Pick
                </Button>
              </Col>
              <Col md="6">
                <Candidate candidate={candidates[1]} hideStatus={true} />
                <Button
                  name="1"
                  size="lg"
                  className="btn btn-info margin-sm-top"
                  onClick={this.handleClick}
                  block
                >
                  Pick
                </Button>
              </Col>
            </Row>
          ) : (
            <ReactLoading className="loader-box" type="spinningBubbles" color="#000" />
          )}
        </Container>
      </>
    ) : (
      <ErrorMessage>Error: Couldn&#39;t get new FaceMash match. Please refresh page.</ErrorMessage>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceMash)
