// new users are routed to this page while their access is pending
import React, { Component } from 'react'
import Nav from '../components/nav'
import Head from '../components/head'
import { Card, CardBody, CardTitle } from 'reactstrap'

class PendingPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <Card className="pending-card">
          <CardTitle>Your account is pending approval.</CardTitle>
          <CardBody>Refresh this page when access is granted.</CardBody>
          <a>
            <img height="200" src="../static/loading.gif" />
          </a>
        </Card>
      </>
    )
  }
}

export default PendingPage
