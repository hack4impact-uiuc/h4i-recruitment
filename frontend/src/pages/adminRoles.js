import React from 'react'
import { Button, Table } from 'reactstrap'
import ChangeRole from '../components/changeRole'
import ChangeYear from '../components/changeYear'
import Head from '../components/head'
import Nav from '../components/nav'

const SAMPLE_MEMBER_ID = 1234

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  render() {
    return (
      <>
        <Head title="Home" />
        <Nav />
        <Table size="sm" hover className="candidate-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'Insert Name Here'}</td>
              <td>
                <ChangeYear memberID={SAMPLE_MEMBER_ID} handleChange={this.handleChange} />
              </td>
              <td>
                <ChangeRole memberID={SAMPLE_MEMBER_ID} handleChange={this.handleChange} />
              </td>
              {this.state.isEditing && (
                <td>
                  <Button>Submit</Button>
                </td>
              )}
            </tr>
          </tbody>
        </Table>
        <Button
          variant="primary"
          disabled={this.state.isEditing}
          onClick={() => this.setState({ isEditing: true })}
        >
          Edit
        </Button>
        <Button
          variant="info"
          disabled={!this.state.isEditing}
          onClick={() => this.setState({ isEditing: false })}
        >
          Save
        </Button>
      </>
    )
  }
}

export default AdminRoles
