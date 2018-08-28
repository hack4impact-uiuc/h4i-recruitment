import { Button, Container } from 'reactstrap'
import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { newInterview } from './../actions'
import { bindActionCreators } from 'redux'

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
        <Button onClick={this.handleNewInterview} color="primary">
          New Interview
        </Button>{' '}
        <Link prefetch href="/past-interviews">
          <Button color="primary">Past Interviews</Button>
        </Link>
      </Container>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewPortal)
