// Change Role dropdown
// handler function must be included for logic
import React from 'react'
import { permissionRolesEnum } from '../utils/enums'

const ChangeRole = ({ memberID, role, handleChange }) => (
  <select name={memberID} value={role} onChange={handleChange}>
    <option selected disabled hidden>
      Change Permission Role
    </option>
    <option value={permissionRolesEnum.M}>Member</option>
    <option value={permissionRolesEnum.L}>Lead</option>
    <option value={permissionRolesEnum.D}>Director</option>
  </select>
)

export default ChangeRole
