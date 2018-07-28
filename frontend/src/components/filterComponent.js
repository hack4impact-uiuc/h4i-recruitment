import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/appStore'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilters } from '../actions'
import { bindActionCreators } from 'redux'
import { yearsEnum, statusEnum, rolesEnum, gradEnum, enumToArray, sortByEnum } from '../utils/enums'
import { Button } from 'reactstrap'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter,
      resetFilters
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    filters: state.candidateListPage.filters,
    sort: state.candidateListPage.sort
  }
}

type Props = {
  filters: Object,
  sort: Object
}

class FilterComponent extends Component<props> {
  handleChange = event => {
    if (event.target.checked) {
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  handleClick = event => {
    this.props.resetFilters()
  }
  render() {
    const years = enumToArray(yearsEnum)
    const roles = enumToArray(rolesEnum)
    const statuses = enumToArray(statusEnum)
    const gradDates = enumToArray(gradEnum)
    const sortBy = enumToArray(sortByEnum)
    let statusFilter = [],
      roleFilter = [],
      yearFilter = [],
      gradFilter = [],
      sortByFilter = []
    if (this.props.filters) {
      statusFilter = this.props.filters.statuses
      roleFilter = this.props.filters.roles
      yearFilter = this.props.filters.years
      gradFilter = this.props.filters.gradDates
      sortByFilter = this.props.filters.sortBy
    }
    return (
      <div>
        <div>
          <h2>Filter By:</h2>
        </div>
        <Button onClick={this.handleClick}>Reset Filters</Button>
        <div>
          <h2>Status</h2>
        </div>
        <div>
          {statuses.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
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
            )
          })}
        </div>
        <div>
          <h2>Year</h2>
        </div>
        <div>
          {years.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
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
            )
          })}
        </div>
        <div>
          <h2>Role</h2>
        </div>
        <div>
          {roles.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="roles"
                  value={el}
                  checked={roleFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <div className="state">
                  <label htmlFor={el}>{el}</label>
                </div>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Graduation Date:</h2>
        </div>
        <div>
          {gradDates.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
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
            )
          })}
        </div>
        <div>
          <h2>Sort By:</h2>
        </div>
        <Button onClick={this.handleClick}>Reset Filters</Button>
        <div>
          <h2>Status</h2>
        </div>
        <div>
          {sortBy.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="statuses"
                  value={el}
                  checked={sortBy.includes(el)}
                  onChange={this.handleChange}
                />
                <div className="state">
                  <label htmlFor={el}>{el}</label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent)
