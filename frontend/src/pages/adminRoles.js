import React from 'react'
import { Button, Table } from 'reactstrap'
import ChangeRole from '../components/changeRole'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllUsers, updateUserRole } from '../utils/api'

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      newRole: -1,
      users: []
    }
  }

  getUsers = () => {
    getAllUsers().then(resp => {
      this.setState({ users: resp.result })
    })
  }

  componentDidMount = () => {
    this.getUsers()
  }

  handleRoleChange = e => {
    e.persist() // not sure why this is needed?
    this.setState({ newRole: e.target.value })
  }

  handleRoleSubmit = userEmail => {
    updateUserRole(userEmail, this.state.newRole).then(resp => {
      if (resp.success) {
        this.setState({ newRole: -1 })
        this.getUsers()
      }
    })
  }

  render() {
    const { users, isEditing } = this.state
    return (
      <>
        <Head title="Home" />
        <Nav />
        <Table size="sm" hover className="candidate-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <>
                  <tr key={i}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      {isEditing ? (
                        <ChangeRole value={user.role} handleChange={this.handleRoleChange} />
                      ) : (
                        user.role
                      )}
                    </td>
                    {isEditing && (
                      <td>
                        <Button onClick={() => this.handleRoleSubmit(user.email)}>Submit</Button>
                      </td>
                    )}
                  </tr>
                </>
              )
            })}
          </tbody>
        </Table>
        <Button
          variant="primary"
          disabled={isEditing}
          onClick={() => {
            this.setState({ isEditing: true })
            console.log(this.state)
          }}
        >
          Edit
        </Button>
        <Button
          variant="info"
          disabled={!isEditing}
          onClick={() => this.setState({ isEditing: false })}
        >
          Save
        </Button>
      </>
    )
  }
}

export default AdminRoles
