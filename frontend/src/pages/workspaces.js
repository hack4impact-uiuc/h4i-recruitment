import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
import { getWorkspaces, createWorkspace, createCycle, getCyclesByWorkspace } from '../utils/api'
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
    const workspaceRes = await getWorkspaces()
    if (workspaceRes) {
      workspaceRes.result.forEach(workspace => {
        const cycleRes = await getCyclesByWorkspace(workspace.name)
        if (cycleRes) {
          workspace.cycles = cycleRes.result
          this.setState({
            workspaces: [...this.state.workspaces, workspace]
          })
        }
      })
    }
  }

  render() {
    return (
      <>
        <Head />
        <Nav />
        <h1>HI</h1>
        <ul>
          {this.state.workspaceRes.map((workspace, index) => {
            return (
              <>
                <h2>{workspace.name}</h2>
                <Table size="m" hover>
                  <tr>
                    <th>Term</th>
                    <th>Current</th>
                    <th>Actions</th>
                  </tr>
                  {workspace.cycles.map((cycle, index) => {
                    return (
                      <tr key={index} className={cycle.current && 'current'}>
                        <td>{cycle.term}</td>
                        <td>{cycle.current}</td>
                        <td>Import things</td>
                      </tr>
                    )
                  })}
                </Table>
              </>
            )
          })}
        </ul>
      </>
    )
  }
}

export default Workspaces
