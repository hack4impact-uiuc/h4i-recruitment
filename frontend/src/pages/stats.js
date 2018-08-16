import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Head from '../components/head'
import Nav from '../components/nav'

type Props = {}

class StatsPage extends Component<Props> {
  constructor() {
    super()
  }
  render() {
    return (
      <>
        <Container>
          <h1>Statistics</h1>
          <p>This is a place for a bunch of unorganized stats</p>
          <p>Pending:</p>
          <p>Interviewed: </p>
          <p>Rejected: </p>
          <p>Accepted: </p>

          <p># of Freshman Applied: </p>
          <p># of Sophomores Applied: </p>
          <p># of Juniors Applied: </p>
          <p># of Seniors Applied: </p>

          <h3>Matches</h3>
          <p># of Matches made: </p>
          <p>Avg number of matches per Candidate</p>
          <p>Lowest Score: </p>
          <p>Highest Score: </p>
          <p>Average Score: </p>
        </Container>
      </>
    )
  }
}

export default StatsPage
