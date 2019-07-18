import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilters } from '../actions'
import { bindActionCreators } from 'redux'
import {
  yearsEnum,
  statusEnum,
  rolesEnum,
  gradEnum,
  compareByEnum,
  enumToArray,
} from '../utils/enums'
import { Button } from 'reactstrap'

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addFilter,
      removeFilter,
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

class PieComponent extends Component<Props> {
  handleChange = event => {
    if (event.target.checked) {
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  handleCompareChange = async event => {
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
    const compareBy = enumToArray(compareByEnum)
    let statusFilter = [],
      roleFilter = [],
      yearFilter = [],
      gradFilter = []
    if (this.props.filters) {
      statusFilter = this.props.filters.statuses
      roleFilter = this.props.filters.roles
      yearFilter = this.props.filters.years
      gradFilter = this.props.filters.gradDates
    }

    return (
      <div className="filter-box">
        <h3>Query Panel</h3>

        <h4>Filters</h4>
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
        <h5>Year</h5>
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
        <h5>Role</h5>
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
                    checked={roleFilter.includes(el)}
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
        <h5>Graduation Date:</h5>

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

        <h4>Compare</h4>

        <>
          {compareBy.map((el, idx) => {
            return (
              <div key={idx}>
                <div className="pretty p-default">
                  <input
                    type="checkbox"
                    id={el}
                    name="compareBy"
                    value={el}
                    // checked={compareByFilter.includes(el)}
                    onChange={this.handleCompareChange}
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
)(PieComponent)
