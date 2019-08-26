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
      selectedWorkspace: '',
      cycles: [],
      workspaceModal: false,
      cycleModal: false
    }
  }

  async componentDidMount() {
    // get workspaces and cycle, if applicable
    const workspaceRes = await getWorkspaces()
    if (workspaceRes) {
      workspaceRes.result.forEach(async workspace => {
        this.setState({
          workspaces: [...this.state.workspaces, workspace.name]
        })
      })

      if (!this.state.selectedWorkspace && this.state.workspaces.length) {
        this.setState({
          selectedWorkspace: this.state.workspaces[0]
        })
      }

      const cycleRes = await getCyclesByWorkspace(this.state.selectedWorkspace)
      if (cycleRes) {
        this.setState({
          cycles: cycleRes.result
        })
      }
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

  createCycle = async workspaceName => {
    const cycle = {
      term: this.state.term,
      workspaceName
    }
    const response = await createCycle(cycle)
    return response
  }

  setCurrentCycle = async cycle => {
    // new endpoint for cycle setting? do we want this functionality?
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

  handleSelectWorkspaceChange = e => {
    this.setState({ selectedWorkspace: e.target.value })

    getCyclesByWorkspace(e.target.value).then(cycleRes => {
      this.setState({
        cycles: cycleRes.result
      })
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
            <select value={this.selectedWorkspace} onChange={this.handleSelectWorkspaceChange}>
              <option selected disabled hidden>
                Select Workspace
              </option>
              {this.state.workspaces.map((workspaceName, index) => {
                return (
                  <option value={workspaceName} key={index}>
                    {workspaceName}
                  </option>
                )
              })}
            </select>
            <Button color="primary" onClick={this.toggleWorkspaceModal}>
              Create Workspace
            </Button>
            {this.state.selectedWorkspace ? (
              <>
                <h2>{this.state.selectedWorkspace}</h2>
                <Table size="m" hover>
                  <tbody>
                    <tr>
                      <th>Term</th>
                      <th>Actions</th>
                    </tr>
                    {this.state.cycles.map((cycle, index) => {
                      return (
                        <tr key={index} className={cycle.current ? 'current' : ''}>
                          <td>{cycle.term}</td>
                          <td>
                            <Button
                              color="primary"
                              value={cycle.id}
                              onClick={this.toggleImportModal}
                            >
                              Import Candidates
                            </Button>
                            <Button color="primary" onClick={this.setCurrentCycle}>
                              Select cycle
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
                  onSubmit={() => {
                    return this.createCycle(this.state.selectedWorkspace)
                  }}
                  handleChange={this.handleChange}
                  alert="All fields are required."
                  pathname="/workspaces"
                />
                <Button color="primary" onClick={this.toggleCycleModal}>
                  Create cycle
                </Button>
              </>
            ) : (
              <p>You don't have any workspaces!</p>
            )}
          </Container>
        </div>
      </>
    )
  }
}

export default Workspaces
