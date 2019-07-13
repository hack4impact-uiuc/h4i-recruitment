import React from 'react'
import {
  Button,
  Table,
} from 'reactstrap'
import ChangeRole from '../components/changeRole';

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false 
    }
  }

  notEditingTable() {
    return (
      <Table>
         <Table.Column header="Name" accessor="fullName" sortable />
         <Table.Column header="Year" accessor="year" />
         <Table.Column header="Role" accessor="role" />
      </Table>
    )
  }

  editingTable() {
    return (
      <Table>
         <Table.Column header="Name" accessor="fullName" sortable />
         <Table.Column header="Year" accessor="year" />
         <Table.Column header="Role" accessor="role"/>
         cell={({ value }) => (
          <Table.Cell key="roleDropdown">
            <DropdownButton >
                <Dropdown.Item eventKey="1">Admin</Dropdown.Item>
                <Dropdown.Item eventKey="2">Lead</Dropdown.Item>
                <Dropdown.Item eventKey="3">
                  Member
                </Dropdown.Item>
              </DropdownButton>
          </Table.Cell>
        ) }
        <Table.Column header="Delete" accessor="deleteButton" />
      </Table>
    )
  }

  editButton() {
    return (
      <Button onClick={() => this.setState({ isEditing: true })}/> 
    )
  }

  saveButton() {
    return (
      <Button onClick={() => this.setState({ isEditing: false })}/> 
    )
  }

  render() {
    let table; 
    let button; 
    if (this.state.isEditing) {
      table = this.editingTable(); 
      button = this.editButton()
    } else {
      table = this.notEditingTable(); 
      button = this.editButton()
    }

    return (
      // <div>
      //   {this.editingTable()}
      //   {/* {button} */}
      // </div>
      // <div>hello</div>
      <Table>
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
                                <ChangeRole
                                  candidateID={1}
                                  handleChange={this.handleChange}
                                />
                              </td>
                              <td>
                                <ChangeRole
                                  candidateID={1}
                                  handleChange={this.handleChange}
                                />
                              </td>
                              <td>
                                <ChangeRole
                                  candidateID={1}
                                  handleChange={this.handleChange}
                                />
                              </td>
                </tr>
              </tbody>
              
            </Table>
    )
  }
}

export default AdminRoles