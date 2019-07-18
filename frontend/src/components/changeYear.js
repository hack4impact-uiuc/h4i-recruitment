// Change Year dropdown
// handler function must be included for logic
import React from 'react'
import { yearsEnum } from '../utils/enums'

const ChangeYear = ({ memberID, year, handleChange }) => (
  <select name={memberID} value={year} onChange={handleChange}>
    <option selected disabled hidden>
      Change Year
    </option>
    <option value={yearsEnum.FRESHMAN}>Freshman</option>
    <option value={yearsEnum.SOPHOMORE}>Sophomore</option>
    <option value={yearsEnum.JUNIOR}>Junior</option>
    <option value={yearsEnum.SENIOR}>Senior</option>
  </select>
)

export default ChangeYear
