import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
// import {  } from '../utils/api'
import Router from 'next/router'
import Link from 'next/link'

class Workspaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workspaces: []
    }
  }

  async componentDidMount() {
    // get workspaces and cycle, if applicable
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
      </>
    )
  }
}

export default Workspaces
