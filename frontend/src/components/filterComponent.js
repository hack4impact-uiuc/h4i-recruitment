import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/appStore'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilters } from '../actions'
import { bindActionCreators } from 'redux'
import { yearsenum, statusenum, rolesenum, gradenum, enumToArray } from '../utils/enums'
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
    const years = enumToArray(yearsenum)
    const roles = enumToArray(rolesenum)
    const statuses = enumToArray(statusenum)
    const gradDates = enumToArray(gradenum)
    const statusFilter = this.props.filters.statuses
    const roleFilter = this.props.filters.roles
    const yearFilter = this.props.filters.years
    const gradFilter = this.props.filters.gradDates
    return (
      <div>
        <div>
          <h1>Filter By:</h1>
        </div>
        <Button onClick={this.handleClick}>Reset Filters</Button>
        <div>
          <h2>Status</h2>
        </div>
        <div>
          {statuses.map((el, idx) => {
            return (
              <p key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="statuses"
                  value={el}
                  checked={statusFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label htmlFor={el}>{el}</label>
              </p>
            )
          })}
        </div>
        <div>
          <h2>Year</h2>
        </div>
        <div>
          {years.map((el, idx) => {
            return (
              <p key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="years"
                  value={el}
                  checked={yearFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label htmlFor={el}>{el}</label>
              </p>
            )
          })}
        </div>
        <div>
          <h2>Role</h2>
        </div>
        <div>
          {roles.map((el, idx) => {
            return (
              <p key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="roles"
                  value={el}
                  checked={roleFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label htmlFor={el}>{el}</label>
              </p>
            )
          })}
        </div>
        <div>
          <h2>Graduation Date:</h2>
        </div>
        <div>
          {gradDates.map((el, idx) => {
            return (
              <p key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="gradDates"
                  value={el}
                  checked={gradFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <label htmlFor={el}>{el}</label>
              </p>
            )
          })}
        </div>
      </div>
    )
  }
}

const connectedFilterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent)

export default withRedux(configureStore)(connectedFilterComponent)
