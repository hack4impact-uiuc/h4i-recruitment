import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
import WorkspaceModal from '../components/workspaceModal'
import { getWorkspaces, createWorkspace, createCycle, getCyclesByWorkspace } from '../utils/api'
import { newWorkspaceFields, newCycleFields } from '../utils/formFields'
import { Button } from 'reactstrap'

class Workspaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workspaces: [],
      workspaceModal: false,
      cycleModal: false
    }
  }

  async componentDidMount() {
    // get workspaces and cycle, if applicable
    const workspaceRes = await getWorkspaces()
    if (workspaceRes) {
      workspaceRes.result.forEach(async workspace => {
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

  toggleWorkspaceModal = () => {
    this.setState({
      workspaceModal: !this.state.workspaceModal
    })
  }

  toggleCycleModal = () => {
    this.setState({
      cycleModal: !this.cycleModal
    })
  }

  createWorkspace = async () => {
    const workspace = {
      name: this.state.name,
      owner: this.state.owner
    }
    const response = await createWorkspace(workspace)
    return response
  }

  createCycle = async event => {
    const cycle = {
      name: this.state.term,
      workspaceName: event.value
    }
    console.log(event.value)
  }

  toggleImportModal = event => {
    // TODO: (in next PR) launch modal for file upload and parsing
    // use event.target.value to get the cycle ID
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <>
        <Head title="Workspaces" />
        <Nav />
        <div className="page-content-wrapper">
          <Container fluid>
            <WorkspaceModal
              title="Add New Workspace"
              isOpen={this.state.workspaceModal}
              formFields={newWorkspaceFields}
              toggle={this.toggleWorkspaceModal}
              onSubmit={this.createWorkspace}
              handleChange={this.handleChange}
              alert="All fields are required."
              pathname="/workspaces"
            />
            <Button color="primary" onClick={this.toggleWorkspaceModal}>
              Create Workspace
            </Button>
            <ul>
              {this.state.workspaces.map((workspace, index) => {
                return (
                  <div key={index}>
                    <h2>{workspace.name}</h2>
                    <Table size="m" hover>
                      <tbody>
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
                              <td>
                                <Button
                                  color="primary"
                                  value={cycle.id}
                                  onClick={this.toggleImportModal}
                                >
                                  Import Candidates
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                    <WorkspaceModal
                      title="Add New Cycle"
                      isOpen={this.state.cycleModal}
                      formFields={newCycleFields}
                      toggle={this.toggleCycleModal}
                      onSubmit={this.createCycle}
                      handleChange={this.handleChange}
                      alert="All fields are required."
                      pathname="/workspaces"
                    />
                    <Button color="primary" value={workspace.id} onClick={this.toggleCycleModal}>
                      Create cycle
                    </Button>
                  </div>
                )
              })}
            </ul>
          </Container>
        </div>
      </>
    )
  }
}

export default Workspaces
