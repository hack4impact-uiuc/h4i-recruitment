import React from 'react'
import { Button, Table, Card, CardBody } from 'reactstrap'
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
      selectedUser: -1,
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

  handleRoleChange = (e, idx) => {
    console.log(e)
    e.persist() // not sure why this is needed?
    this.setState({ newRole: e.target.value, selectedUser: idx })
  }

  handleRoleSubmit = userEmail => {
    updateUserRole(userEmail, this.state.newRole).then(resp => {
      console.log(userEmail, this.state.newRole, resp)
      if (resp.success) {
        this.setState({ newRole: -1, selectedUser: -1 })
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
        <Card className="admin-roles-card">
          <CardBody>
            <Table size="sm" hover className="candidate-table">
              <thead class="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  {isEditing && <th>Submit</th>}
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
                            <ChangeRole
                              value={user.role}
                              handleChange={e => {
                                this.handleRoleChange(e, i)
                              }}
                            />
                          ) : (
                            user.role
                          )}
                        </td>
                        {isEditing && (
                          <td>
                            <Button
                              color="success"
                              size="sm"
                              onClick={() => this.handleRoleSubmit(user.email)}
                              disabled={
                                !(this.state.newRole != -1 && this.state.selectedUser === i)
                              }
                            >
                              Submit
                            </Button>
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
          </CardBody>
        </Card>
      </>
    )
  }
}

export default AdminRoles
