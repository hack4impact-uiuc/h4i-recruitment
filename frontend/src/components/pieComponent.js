import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter, resetFilters } from '../actions'
import { bindActionCreators } from 'redux'
import {
  yearsEnum,
  statusEnum,
  rolesEnum,
  gradEnum,
  sortByEnum,
  enumToArray,
  selectByEnum
} from '../utils/enums'
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
    filters: state.candidateListPage.filters
  }
}

type Props = {
  filters: Object
}

class PieComponent extends Component<Props> {
  handleChange = event => {
    if (event.target.checked) {
      this.props.addFilter(event.target.name, event.target.value)
    } else {
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  handleSortChange = async event => {
    console.log('SORT CHANGE')
    if (event.target.checked) {
      console.log("ADDING")
      console.log(event.target.name + " " + event.target.value)

      // this.props.filters.sortBy.map(value => this.props.removeFilter(event.target.name, value))
      // this.props.filters.sortBy.map(value => console.log(event.target.name + " " + value))


      // this.props.addFilter(event.target.name, event.target.value)
      
      this.props.removeFilter(event.target.name, event.target.value)
      this.props.removeFilter(event.target.name, event.target.value)

      // console.log("NEW LIST: " + this.props.filters.sortBy)
    } else {
      console.log("REMOVING")
      console.log(event.target.name + " " + event.target.value)
      this.props.removeFilter(event.target.name, event.target.value)
    }
  }

  handleClick = event => {
    this.props.resetFilters()
  }

  // handleSortClick = event => {
  //   this.props.resetFilters()
  // }

  render() {
    const years = enumToArray(yearsEnum)
    const roles = enumToArray(rolesEnum)
    const statuses = enumToArray(statusEnum)
    const gradDates = enumToArray(gradEnum)
    const sortBy = enumToArray(sortByEnum)
    const selectBy = enumToArray(selectByEnum)
    let statusFilter = [],
      roleFilter = [],
      yearFilter = [],
      gradFilter = [],
      // sortByFilter = [],
      selectByFilter = []
    if (this.props.filters) {
      statusFilter = this.props.filters.statuses
      roleFilter = this.props.filters.roles
      yearFilter = this.props.filters.years
      gradFilter = this.props.filters.gradDates
      // sortByFilter = this.props.filters.sortBy
      selectByFilter = this.props.filters.selectBy
    }

    return (
      <div className="filter-box">
        <div>
          <h3>Query Panel</h3>
        </div>
        <div>
          <h5>Selects</h5>
        </div>
        <div>
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
        </div>
        <div>
          <h4>Filters</h4>
        </div>
        <div>
          <h5>Status</h5>
        </div>
        <div>
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
        </div>
        <div>
          <h5>Year</h5>
        </div>
        <div>
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
        </div>
        <div>
          <h5>Role</h5>
        </div>
        <div>
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
        </div>
        <div>
          <h5>Graduation Date:</h5>
        </div>
        <div>
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
        </div>

        <div>
          <h4>Compare</h4>
        </div>
        <div>
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
        </div>
        <div>
          <p> </p>
          <Button onClick={this.handleClick}>Reset Filters</Button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PieComponent)
