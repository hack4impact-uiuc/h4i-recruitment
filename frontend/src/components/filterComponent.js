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
import { Checkbox } from '@hack4impact-uiuc/bridge'

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
    selectByFilter = []
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
    <div className="filter-box">
      <h3>Query Panel</h3>
      <h5>Selects</h5>
      <Checkbox.Group vertical pl="1px">
        {selectBy.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="selectBy"
              value={el}
              checked={selectByFilter.includes(el)}
              onChange={handleChange}
            >
              {
                <div className="state bridge-checkbox-label">
                  <label htmlFor={el}>{el}</label>
                </div>
              }
            </Checkbox>
          )
        })}
      </Checkbox.Group>
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
      <Checkbox.Group vertical>
        {statuses.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="statuses"
              value={el}
              checked={statusFilter.includes(el)}
              onChange={handleChange}
            >
              <div className="state bridge-checkbox-label">
                <label htmlFor={el}>{el}</label>
              </div>
            </Checkbox>
          )
        })}
      </Checkbox.Group>

      <h5 className="mt-2">Referrals</h5>
      <Checkbox.Group vertical>
        {referrals.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="referrals"
              value={el}
              checked={referralFilter.includes(el)}
              onChange={handleChange}
            >
              <div className="state  bridge-checkbox-label">
                <label htmlFor={el}>{el}</label>
              </div>
            </Checkbox>
          )
        })}
      </Checkbox.Group>
      <h5 className="mt-2">Year</h5>
      <Checkbox.Group vertical>
        {years.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="years"
              value={el}
              checked={yearFilter.includes(el)}
              onChange={handleChange}
            >
              <div className="state bridge-checkbox-label">
                <label htmlFor={el}>{el}</label>
              </div>
            </Checkbox>
          )
        })}
      </Checkbox.Group>
      <h5 className="mt-2">Roles</h5>
      <Checkbox.Group vertical>
        {roles.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="roles"
              value={el}
              checked={rolesFilter.includes(el)}
              onChange={handleChange}
            >
              <div className="state bridge-checkbox-label">
                <label htmlFor={el}>{el}</label>
              </div>
            </Checkbox>
          )
        })}
      </Checkbox.Group>
      <h5 className="mt-2">Graduation Date:</h5>
      <Checkbox.Group vertical>
        {gradDates.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="gradDates"
              value={el}
              checked={gradFilter.includes(el)}
              onChange={handleChange}
            >
              <div className="state bridge-checkbox-label">
                <label htmlFor={el}>{el}</label>
              </div>
            </Checkbox>
          )
        })}
      </Checkbox.Group>
      <h4 className="mt-2">Sorts</h4>
      <Checkbox.Group vertical>
        {sortBy.map((el, idx) => {
          return (
            <Checkbox
              id={el}
              name="sortBy"
              value={el}
              checked={sortByFilter.includes(el)}
              onChange={handleSortChange}
            >
              <div className="state">
                <label htmlFor={el}>{el}</label>
              </div>
            </Checkbox>
          )
        })}
      </Checkbox.Group>
      <>
        <p> </p>
        <Button onClick={handleClick}>Reset Filters</Button>
      </>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent)
