import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilter, resetFilters } from '../actions'
import { getWorkspaces } from '../utils/api'
import { bindActionCreators } from 'redux'
import {
  yearsEnum,
  statusEnum,
  referralEnum,
  rolesEnum,
  gradEnum,
  sortByEnum,
  enumToArray,
  selectByEnum,
} from '../utils/enums'
import { Button } from 'reactstrap'
import { Checkbox, Box } from '@hack4impact-uiuc/bridge'

import styles from '../css/filterComponent.module.css'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter,
      resetFilter,
      resetFilters,
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    filters: state.candidateListPage.filters,
  }
}

type Props = {
  filters: Object,
}

const FilterComponent = (props: Props) => {
  const [workspaces, setWorkspaces] = useState([])

  // componentDidMount
  useEffect(async () => {
    const workspaces = await getWorkspaces()
    setWorkspaces(workspaces.result)
  }, [])

  const handleChange = useCallback(event => {
    if (event.target.checked) {
      props.addFilter(event.target.name, event.target.value)
    } else {
      props.removeFilter(event.target.name, event.target.value)
    }
  })

  const handleSortChange = useCallback(async event => {
    console.log(event)
    if (event.target.checked) {
      props.filters.sortBy.map(value => props.removeFilter(event.target.name, value))
      props.addFilter(event.target.name, event.target.value)
    } else {
      props.removeFilter(event.target.name, event.target.value)
    }
  })

  const handleSelectedChange = useCallback(async event => {
    if (event.target.value === 'None') {
      props.resetFilter(event.target.name)
    } else {
      props.addFilter(event.target.name, event.target.value)
    }
  })

  const handleClick = useCallback(event => {
    props.resetFilters()
  })

  const generateCheckboxGroup = useCallback((name, enumArray, filter) => {
    return (
      <Checkbox.Group vertical>
        {enumArray.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name={name}
              value={el}
              checked={filter.includes(el)}
              onChange={handleChange}
              pb="0em"
              mb="0em"
            >
              {
                <div className={`state ${styles['bridge-checkbox-label']}`}>
                  <label htmlFor={el}>{el}</label>
                </div>
              }
            </Checkbox>
          )
        })}
      </Checkbox.Group>
    )
  })

  const years = enumToArray(yearsEnum)
  const roles = enumToArray(rolesEnum)
  const statuses = enumToArray(statusEnum)
  const referrals = enumToArray(referralEnum)
  const gradDates = enumToArray(gradEnum)
  const sortBy = enumToArray(sortByEnum)
  const selectBy = enumToArray(selectByEnum)

  const hasMultipleWorkspaces = workspaces ? workspaces.length > 1 : false

  let statusFilter = [],
    referralFilter = [],
    rolesFilter = [],
    yearFilter = [],
    gradFilter = [],
    workspaceFilter = [],
    selectByFilter = [],
    sortByFilter = []
  if (props.filters) {
    statusFilter = props.filters.statuses
    referralFilter = props.filters.referrals
    rolesFilter = props.filters.roles
    yearFilter = props.filters.years
    gradFilter = props.filters.gradDates
    selectByFilter = props.filters.selectBy
    workspaceFilter = props.filters.workspaces
  }

  return (
    <Box className="filter-box">
      <h3>Query Panel</h3>
      <h5>Selects</h5>
      {generateCheckboxGroup('selectBy', selectBy, selectByFilter)}

      <h4>Filters</h4>
      {/* todo: #305 conditional rendering if user is director */}
      {hasMultipleWorkspaces && (
        <>
          <h5>Workspace</h5>

          <p>
            <select
              name="workspaces"
              onChange={handleSelectedChange}
              className="workspace-selector"
            >
              <option selected>None</option>
              {workspaces.map(workspace => (
                <option key={workspace.name}>{workspace.name}</option>
              ))}
            </select>
          </p>
        </>
      )}
      <h5>Status</h5>
      {generateCheckboxGroup('statuses', statuses, statusFilter)}

      <h5 className="mt-2">Referrals</h5>
      {generateCheckboxGroup('referrals', referrals, referralFilter)}

      <h5 className="mt-2">Year</h5>
      {generateCheckboxGroup('years', years, yearFilter)}

      <h5 className="mt-2">Roles</h5>
      {generateCheckboxGroup('roles', roles, rolesFilter)}

      <h5 className="mt-2">Graduation Date:</h5>
      {generateCheckboxGroup('gradDates', gradDates, gradFilter)}

      <h4 className="mt-2">Sorts</h4>
      {generateCheckboxGroup('sortBy', sortBy, sortByFilter)}

      <>
        <p> </p>
        <Button onClick={handleClick}>Reset Filters</Button>
      </>
    </Box>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent)
