import React from 'react'
import { Button, Table } from 'reactstrap'
import ChangeRole from '../components/changeRole'
import ChangeYear from '../components/changeYear'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllUsers } from '../utils/api'

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      users: []
    }
  }

  getUsers() {
    getAllUsers().then(resp => {
      this.setState({ users: resp.result })
    })
  }

  componentDidMount() {
    this.getUsers()
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
                    <td>{user.role}</td>
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
