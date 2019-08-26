import React, { Component } from 'react'
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

class FilterComponent extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      workspaces: [],
    }
  }

  async componentDidMount() {
    const workspaces = await getWorkspaces()
    this.setState({ workspaces: workspaces.result })
  }

  handleChange = event => {
    if (event.target.checked) {
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  handleSortChange = async event => {
    if (event.target.checked) {
      this.props.filters.sortBy.map(value => this.props.removeFilter(event.target.name, value))
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  handleSelectedChange = async event => {
    if (event.target.value === 'None') {
      this.props.resetFilter(event.target.name)
    } else {
      this.props.addFilter(event.target.name, event.target.value)
    }
  }

  handleClick = event => {
    this.props.resetFilters()
  }

  render() {
    const years = enumToArray(yearsEnum)
    const roles = enumToArray(rolesEnum)
    const statuses = enumToArray(statusEnum)
    const referrals = enumToArray(referralEnum)
    const gradDates = enumToArray(gradEnum)
    const sortBy = enumToArray(sortByEnum)
    const selectBy = enumToArray(selectByEnum)

    const hasMultipleWorkspaces = this.state.workspaces ? this.state.workspaces.length > 1 : false

    let statusFilter = [],
      referralFilter = [],
      rolesFilter = [],
      yearFilter = [],
      gradFilter = [],
      workspaceFilter = [],
      selectByFilter = []
    if (this.props.filters) {
      statusFilter = this.props.filters.statuses
      referralFilter = this.props.filters.referrals
      rolesFilter = this.props.filters.roles
      yearFilter = this.props.filters.years
      gradFilter = this.props.filters.gradDates
      selectByFilter = this.props.filters.selectBy
      workspaceFilter = this.props.filters.workspaces
    }

    return (
      <div className="filter-box">
        <h3>Query Panel</h3>
        <h5>Selects</h5>
        <>
          {selectBy.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="selectBy"
                    value={el}
                    checked={selectByFilter.includes(el)}
                    onChange={this.handleChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>
        <h4>Filters</h4>
        {/* todo: #305 conditional rendering if user is director */}
        {hasMultipleWorkspaces && (
          <>
            <h5>Workspace</h5>

            <p>
              <select
                name="workspaces"
                onChange={this.handleSelectedChange}
                className="workspace-selector"
              >
                <option selected>None</option>
                {this.state.workspaces.map(workspace => (
                  <option key={workspace.name}>{workspace.name}</option>
                ))}
              </select>
            </p>
          </>
        )}
        <h5>Status</h5>
        <>
          {statuses.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="statuses"
                    value={el}
                    checked={statusFilter.includes(el)}
                    onChange={this.handleChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>

        <h5 className="mt-2">Referrals</h5>
        <>
          {referrals.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="referrals"
                    value={el}
                    checked={referralFilter.includes(el)}
                    onChange={this.handleChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>
        <h5 className="mt-2">Year</h5>
        <>
          {years.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="years"
                    value={el}
                    checked={yearFilter.includes(el)}
                    onChange={this.handleChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>
        <h5 className="mt-2">Roles</h5>
        <>
          {roles.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="roles"
                    value={el}
                    checked={rolesFilter.includes(el)}
                    onChange={this.handleChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>
        <h5 className="mt-2">Graduation Date:</h5>
        <>
          {gradDates.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="gradDates"
                    value={el}
                    checked={gradFilter.includes(el)}
                    onChange={this.handleChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>
        <h4 className="mt-2">Sorts</h4>
        <>
          {sortBy.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="sortBy"
                    value={el}
                    // checked={sortByFilter.includes(el)}
                    onChange={this.handleSortChange}
                  />
                  <div className="state">
                    <label htmlFor={el}>{el}</label>
                  </div>
                </div>
              </div>
            )
          })}
        </>
        <>
          <p> </p>
          <Button onClick={this.handleClick}>Reset Filters</Button>
        </>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent)
