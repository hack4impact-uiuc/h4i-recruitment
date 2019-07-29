import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
import { getCycles } from '../utils/api'
import Router from 'next/router'
import Link from 'next/link'

class Workspaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycles: []
    }
  }

  async componentDidMount() {
    // get workspaces and cycle, if applicable
    // TODO: need way to store and get workspace name- how are we going to deal with finding who owns what workspace
    const res = await getCycles('UIUC')
    this.setState({
      cycles: res && res.result
    })
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <h1>HI</h1>
        <ul>
          {this.state.cycles.map((cycle, index) => {
            return (
              <li key={index} className={cycle.current && 'current'}>
                {cycle.term}
              </li>
            )
          })}
        </ul>
      </>
    )
  }
}

export default Workspaces
