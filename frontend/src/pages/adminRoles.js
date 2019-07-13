import React from 'react'
import { Button, Table } from 'reactstrap'
import ChangeRole from '../components/changeRole'
import Head from '../components/head'

import Nav from '../components/nav'

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  editButton() {
    return <Button onClick={() => this.setState({ isEditing: true })}>Edit</Button>
  }

  saveButton() {
    return <Button onClick={() => this.setState({ isEditing: false })}>Save</Button>
  }

  render() {
    return (
      <>
        <Head title="Home" />
        <Nav />
        <Table className="candidate-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ChangeRole candidateID={1} handleChange={this.handleChange} />
              </td>
              <td>
                <ChangeRole candidateID={1} handleChange={this.handleChange} />
              </td>
              <td>
                <ChangeRole candidateID={1} handleChange={this.handleChange} />
              </td>
            </tr>
          </tbody>
        </Table>
        {this.editButton()}
        {this.saveButton()}
      </>
    )
  }
}

export default AdminRoles
