import { Button, Container } from 'reactstrap'
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { newInterview } from './../actions'

type Props = {}

const mapStateToProps = state => ({})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newInterview
    },
    dispatch
  )
}

// Main app
class InterviewPortal extends Component<Props> {
  constructor(props) {
    super(props)
  }

  handleNewInterview = e => {
    const { newInterview } = this.props
    newInterview()
    Router.push('/interview')
  }

  render() {
    return (
      <Container>
        <h1>Interviews</h1>
        <Button onClick={this.handleNewInterview} color="primary">
          New Interview
        </Button>
        <Link prefetch href="/past-interviews">
          <Button color="primary">Past Interviews</Button>
        </Link>
        <Link prefetch href="/interviewlist">
          <Button color="primary">All Interviews</Button>
        </Link>
      </Container>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewPortal)
