// Change Status dropdown
// handler function must be included for logic
import React from 'react'
import { statusEnum } from '../../utils/enums'

const ChangeStatus = ({ candidateID, status, handleChange }) => (
  <select name={candidateID} value={status} onChange={handleChange}>
    <option selected disabled hidden>
      Change Status
    </option>
    <option value={statusEnum.PENDING}>Pending</option>
    <option value={statusEnum.ACCEPTED}>Accepted</option>
    <option value={statusEnum.REJECTED}>Rejected</option>
    <option value={statusEnum.INTERVIEWING}>Interviewing</option>
    <option value={statusEnum.DONE_INTERVIEWING}>Done Interviewing</option>
    <option value={statusEnum.INVALID}>Invalid</option>
  </select>
)

export default ChangeStatus
