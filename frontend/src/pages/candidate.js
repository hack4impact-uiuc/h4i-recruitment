import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
import Router from 'next/router'
import { getCandidateById } from '../utils/api'
import configureStore from './../store/appStore'
import Head from '../components/head'
import Nav from '../components/nav'
import Candidate from '../components/candidateBox'

class CandidatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {}
    }
  }
  static async getInitialProps({ query }) {
    // check whether query.id is real candidate
    try {
      const { result } = await getCandidateById(query.id)
      return { result }
    } catch (err) {
      console.log('Candidate Page error: ', err.message)
      return { error: 'Bad Request' }
    }
  }
  goBack = () => {
    Router.back()
  }
  render() {
    if (!this.props.result) {
      return <div>User doesn&#39;t exist</div>
    }
    const candidate = this.props.result
    return (
      <>
        <Container className="mt-5">
          <Button color="primary" onClick={this.goBack}>
            Back
          </Button>
          <Candidate candidate={candidate} />
          <Button outline color="primary">
            Add Interview
          </Button>
        </Container>
      </>
    )
  }
}

export default CandidatePage
