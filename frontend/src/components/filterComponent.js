import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilters } from '../actions'
import { bindActionCreators } from 'redux'
// <<<<<<< sort-by-filters
import { yearsEnum, statusEnum, rolesEnum, gradEnum, sortByEnum, enumToArray } from '../utils/enums'
import { Button } from 'reactstrap'
// =======
// import { yearsEnum, statusEnum, rolesEnum, gradEnum, enumToArray } from '../utils/enums'
// import { Button, Row } from 'reactstrap'
// >>>>>>> master

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
    filters: state.candidateListPage.filters
  }
}

type Props = {
  filters: Object
}

class FilterComponent extends Component<Props> {
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
      <div className="filter-box">
        <div>
// <<<<<<< sort-by-filters
          <h1>Query Canidates</h1>
        </div>
        <div>
          <h3>Filters</h3>
        </div>
        <div>
          <h4>Status</h4>
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
// =======
//           <h4>Filter By:</h4>
//         </div>
//         <Button onClick={this.handleClick}>Reset Filters</Button>
//         <div className="filter-type-box">
//           <h5>Status</h5>
//           <div>
//             {statuses.map((el, idx) => {
//               return (
//                 <div className="pretty p-default" key={idx}>
//                   <input
//                     type="checkbox"
//                     id={el}
//                     name="statuses"
//                     value={el}
//                     checked={statusFilter.includes(el)}
//                     onChange={this.handleChange}
//                   />
//                   <div className="state">
//                     <label htmlFor={el}>{el}</label>
//                   </div>
// >>>>>>> master
                </div>
              )
            })}
          </div>
        </div>
// <<<<<<< sort-by-filters
        <div>
          <h4>Year</h4>
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
// =======
//         <div className="filter-type-box">
//           <div>
//             <h5>Year</h5>
//           </div>
//           <div>
//             {years.map((el, idx) => {
//               return (
//                 <div className="pretty p-default" key={idx}>
//                   <input
//                     type="checkbox"
//                     id={el}
//                     name="years"
//                     value={el}
//                     checked={yearFilter.includes(el)}
//                     onChange={this.handleChange}
//                   />
//                   <div className="state">
//                     <label htmlFor={el}>{el}</label>
//                   </div>
// >>>>>>> master
                </div>
              )
            })}
          </div>
        </div>
// <<<<<<< sort-by-filters
        <div>
          <h4>Role</h4>
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
// =======
//         <div className="filter-type-box">
//           <div>
//             <h5>Role</h5>
//           </div>
//           <div>
//             {roles.map((el, idx) => {
//               return (
//                 <div className="pretty p-default" key={idx}>
//                   <input
//                     type="checkbox"
//                     id={el}
//                     name="roles"
//                     value={el}
//                     checked={roleFilter.includes(el)}
//                     onChange={this.handleChange}
//                   />
//                   <div className="state">
//                     <label htmlFor={el}>{el}</label>
//                   </div>
// >>>>>>> master
                </div>
              )
            })}
          </div>
        </div>
// <<<<<<< sort-by-filters
        <div>
          <h4>Graduation Date:</h4>
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
// =======
//         <div className="filter-type-box">
//           <div>
//             <h5>Graduation Date:</h5>
//           </div>
//           <div>
//             {gradDates.map((el, idx) => {
//               return (
//                 <div className="pretty p-default" key={idx}>
//                   <input
//                     type="checkbox"
//                     id={el}
//                     name="gradDates"
//                     value={el}
//                     checked={gradFilter.includes(el)}
//                     onChange={this.handleChange}
//                   />
//                   <div className="state">
//                     <label htmlFor={el}>{el}</label>
//                   </div>
// >>>>>>> master
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h3>Sorts</h3>
        </div>
        <div>
          {sortBy.map((el, idx) => {
            return (
              <div className="pretty p-default" key={idx}>
                <input
                  type="checkbox"
                  id={el}
                  name="sortBy"
                  value={el}
                  checked={sortByFilter.includes(el)}
                  onChange={this.handleChange}
                />
                <div className="state">
                  <label htmlFor={el}>{el}</label>
                </div>
              </div>
            )
          })}
        </div>
        <Button onClick={this.handleClick}>Reset Filters</Button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent)
