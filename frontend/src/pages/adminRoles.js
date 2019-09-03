import React from 'react'
import {
  Button,
  Table,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'
import ChangeRole from '../components/changeRole'
import Head from '../components/head'
import Nav from '../components/nav'
import { getAllUsers, updateUserRole, updateServerUserRole } from '../utils/api'

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      newRole: -1,
      selectedUser: -1,
      users: [],
      adminPassword: '',
      showPasswordModal: false,
      error: '',
    }
  }

  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    getAllUsers().then(resp => {
      this.setState({ users: resp.result })
    })
  }

  handleRoleChange = (e, idx) => {
    e.persist() // not sure why this is needed?
    this.setState({ newRole: e.target.value, selectedUser: idx })
  }

  handleRoleSubmit = userEmail => {
    if (this.state.adminPassword === '') {
      this.setState({ showPasswordModal: true })
    }
  }

  handleChange = event => {
    const value = event.target.value
    this.setState({ adminPassword: value })
  }

  handlePasswordComplete = () => {
    const { users, selectedUser, newRole, adminPassword } = this.state

    updateServerUserRole(users[selectedUser].email, newRole, adminPassword).then(resp => {
      console.log(resp)
      if (resp.status != 400) {
        updateUserRole(users[selectedUser].email, newRole).then(resp => {
          if (resp.success) {
            this.setState({ newRole: -1, selectedUser: -1, showPasswordModal: false })
            this.getUsers()
          } else {
            this.setState({ error: resp.message })
          }
        })
      } else {
        this.setState({ error: resp.message })
      }
    })
  }

  render() {
    const {
      users,
      isEditing,
      newRole,
      selectedUser,
      adminPassword,
      showPasswordModal,
      error,
    } = this.state
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
                              disabled={!(newRole != -1 && selectedUser === i)}
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
              }}
            >
              Edit
            </Button>
            {isEditing && (
              <Button variant="info" onClick={() => this.setState({ isEditing: false })}>
                Back to View
              </Button>
            )}
          </CardBody>
        </Card>
        <Modal autoFocus={false} isOpen={showPasswordModal}>
          <ModalHeader>{'Please enter your password.'}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={adminPassword}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Form>
            {error != '' && (
              <>
                <p>There was an error with your request. Please try again.</p>
                <p>{error}</p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              size="sm"
              onClick={this.handlePasswordComplete}
              color="secondary"
            >
              Submit
            </Button>
            <Button
              color="warning"
              size="sm"
              onClick={() =>
                this.setState({ showPasswordModal: false, newRole: -1, selectedUser: -1 })
              }
              color="secondary"
            >
              x
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default AdminRoles
