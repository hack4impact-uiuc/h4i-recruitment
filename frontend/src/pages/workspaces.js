import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import Nav from '../components/nav'
import Head from '../components/head'
import WorkspaceModal from '../components/workspaceModal'
import {
  getWorkspaces,
  createWorkspace,
  createCycle,
  getCyclesByWorkspace,
  setCurrentCycle,
} from '../utils/api'
import { newWorkspaceFields, newCycleFields } from '../utils/formFields'
import { ActionButton } from '../components/common'

class Workspaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workspaces: [],
      selectedWorkspace: '',
      cycles: [],
      workspaceModal: false,
      cycleModal: false,
    }
  }

  async componentDidMount() {
    // get workspaces and cycle, if applicable
    const workspaceRes = await getWorkspaces()
    if (workspaceRes) {
      this.setState({
        workspaces: workspaceRes.result.map(workspace => workspace.name),
      })

      if (!this.state.selectedWorkspace && this.state.workspaces.length) {
        this.setState({
          selectedWorkspace: this.state.workspaces[0],
        })
      }

      const cycleRes = await getCyclesByWorkspace(this.state.selectedWorkspace, false)
      console.log(cycleRes)
      if (cycleRes) {
        this.setState({
          cycles: cycleRes.result,
        })
      }
    }
  }

  toggleWorkspaceModal = () => {
    this.setState({
      workspaceModal: !this.state.workspaceModal,
    })
  }

  toggleCycleModal = () => {
    this.setState({
      cycleModal: !this.state.cycleModal,
    })
  }

  createWorkspace = async () => {
    const workspace = {
      name: this.state.name,
    }
    const response = await createWorkspace(workspace)
    return response
  }

  createCycle = async workspaceName => {
    const cycle = {
      term: this.state.term,
      workspaceName,
    }
    const response = await createCycle(cycle)
    return response
  }

  setCurrentCycle = async (cycle, workspaceName) => {
    const response = await setCurrentCycle(cycle, workspaceName)
    if (response.success) {
      const cycleRes = await getCyclesByWorkspace(this.state.selectedWorkspace, false)
      if (cycleRes) {
        this.setState({
          cycles: cycleRes.result,
        })
      }
    }
    return response
  }

  toggleImportModal = event => {
    // TODO: (in next PR) launch modal for file upload and parsing
    // use event.target.value to get the cycle ID
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSelectWorkspaceChange = e => {
    this.setState({ selectedWorkspace: e.target.value })

    getCyclesByWorkspace(e.target.value, false).then(cycleRes => {
      this.setState({
        cycles: cycleRes.result,
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
            <ActionButton
              className="button-margin margin-left-sm"
              text="Create Workspace"
              onClick={this.toggleWorkspaceModal}
            />
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
                            <ActionButton
                              className="button-margin"
                              text="Import Candidates"
                              onClick={this.toggleImportModal}
                            />
                            <ActionButton
                              className="button-margin"
                              text="Select Cycle"
                              onClick={() => {
                                this.setCurrentCycle(cycle._id, this.state.selectedWorkspace)
                              }}
                            />
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
                <ActionButton
                  className="button-margin"
                  text="Create Cycle"
                  onClick={this.toggleCycleModal}
                />
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
