import React from 'react'
import Router from 'next/router'
import {
  Table,
  Row,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap'

class AdminRoles extends React.Component<Props> {
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
        ) 
        <Table.Column header="Delete" accessor="deleteButton" />
      </Table>
    )
  }

  editButton() {
    return (
      <Button onClick={this.handleEditClick()}/> 
    )
  }

  saveButton() {
    return (
      <Button onClick={this.handleSaveClick()}/> 
    )
  }

  handleSaveClick() {
    this.setState({ isEditing: false }); 
  }

  handleEditClick() {
    this.setState({ isEditing: true }); 
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
      <div>
        {table}
        {button}
      </div>
    )
  }
}
